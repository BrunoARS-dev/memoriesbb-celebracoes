import { readFile } from "node:fs/promises";

import { NextResponse } from "next/server";

import { celebration } from "@/content/celebration";
import { findGalleryPhotoRecord } from "@/lib/gallery/database";
import { resolveUploadFile } from "@/lib/gallery/paths";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string; variant: string }> }) {
  if (!celebration.modules.gallery) return new NextResponse(null, { status: 404 });
  const { id, variant } = await context.params;
  if (!/^[a-f0-9-]{36}$/.test(id) || (variant !== "grid" && variant !== "full")) {
    return new NextResponse(null, { status: 404 });
  }
  const photo = findGalleryPhotoRecord(id);
  if (!photo) return new NextResponse(null, { status: 404 });
  const filename = variant === "grid" ? photo.grid_filename : photo.full_filename;
  try {
    const file = await readFile(resolveUploadFile(filename));
    return new NextResponse(file, {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
