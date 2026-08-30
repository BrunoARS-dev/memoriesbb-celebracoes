import { randomUUID } from "node:crypto";
import { rename, unlink, writeFile } from "node:fs/promises";

import { NextResponse } from "next/server";
import sharp, { type Metadata } from "sharp";

import { celebration } from "@/content/celebration";
import { insertGalleryPhoto, listGalleryPhotos } from "@/lib/gallery/database";
import { ensureGalleryDirectories, resolveUploadFile } from "@/lib/gallery/paths";
import { consumeRateLimit, getClientAddress } from "@/lib/gallery/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const maxUploadBytes = 10 * 1024 * 1024;
const acceptedFormats = new Set(["jpeg", "png", "webp"]);

export function GET() {
  if (!celebration.modules.gallery) return NextResponse.json({ error: "Galeria indisponível." }, { status: 404 });
  return NextResponse.json({ photos: listGalleryPhotos() }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!celebration.modules.gallery) return NextResponse.json({ error: "Galeria indisponível." }, { status: 404 });

  const rateLimit = consumeRateLimit(`upload:${getClientAddress(request)}`, 8, 10 * 60 * 1000);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Muitos envios em pouco tempo. Aguarde alguns minutos e tente novamente." },
      { status: 429, headers: { "Retry-After": String(rateLimit.retryAfter) } },
    );
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxUploadBytes + 512 * 1024) {
    return NextResponse.json({ error: "A imagem deve ter no máximo 10 MB." }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Não foi possível ler o arquivo enviado." }, { status: 400 });
  }

  const uploaded = formData.get("photo");
  if (!(uploaded instanceof File) || uploaded.size === 0) {
    return NextResponse.json({ error: "Escolha uma imagem para enviar." }, { status: 400 });
  }
  if (uploaded.size > maxUploadBytes) {
    return NextResponse.json({ error: "A imagem deve ter no máximo 10 MB." }, { status: 413 });
  }

  const input = Buffer.from(await uploaded.arrayBuffer());
  let metadata: Metadata;
  try {
    metadata = await sharp(input, { failOn: "error", limitInputPixels: 40_000_000 }).metadata();
  } catch {
    return NextResponse.json({ error: "O arquivo não é uma imagem válida." }, { status: 415 });
  }
  if (!metadata.format || !acceptedFormats.has(metadata.format)) {
    return NextResponse.json({ error: "Formato não aceito. Envie JPEG, PNG ou WebP." }, { status: 415 });
  }

  const id = randomUUID();
  const gridFilename = `${id}-grid.webp`;
  const fullFilename = `${id}-full.webp`;
  const gridPath = resolveUploadFile(gridFilename);
  const fullPath = resolveUploadFile(fullFilename);
  const gridTemporary = `${gridPath}.tmp`;
  const fullTemporary = `${fullPath}.tmp`;

  try {
    ensureGalleryDirectories();
    const base = sharp(input, { failOn: "error", limitInputPixels: 40_000_000 }).rotate();
    const [grid, full] = await Promise.all([
      base.clone().resize({ width: 720, height: 720, fit: "inside", withoutEnlargement: true }).webp({ quality: 76 }).toBuffer({ resolveWithObject: true }),
      base.clone().resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true }).webp({ quality: 84 }).toBuffer({ resolveWithObject: true }),
    ]);
    await Promise.all([writeFile(gridTemporary, grid.data), writeFile(fullTemporary, full.data)]);
    await Promise.all([rename(gridTemporary, gridPath), rename(fullTemporary, fullPath)]);
    const photo = insertGalleryPhoto({
      id,
      grid_filename: gridFilename,
      full_filename: fullFilename,
      width: full.info.width,
      height: full.info.height,
      created_at: Date.now(),
    });
    return NextResponse.json({ photo }, { status: 201 });
  } catch {
    await Promise.allSettled([unlink(gridTemporary), unlink(fullTemporary), unlink(gridPath), unlink(fullPath)]);
    return NextResponse.json({ error: "Não foi possível processar a imagem. Tente outra foto." }, { status: 500 });
  }
}
