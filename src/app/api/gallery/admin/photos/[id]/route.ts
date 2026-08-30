import { unlink } from "node:fs/promises";

import { NextRequest, NextResponse } from "next/server";

import { deleteGalleryPhotoRecord } from "@/lib/gallery/database";
import { galleryAdminCookie, verifyAdminSession } from "@/lib/gallery/admin-auth";
import { resolveUploadFile } from "@/lib/gallery/paths";

export const runtime = "nodejs";

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get(galleryAdminCookie)?.value;
  if (!verifyAdminSession(token)) {
    return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
  }

  const { id } = await context.params;
  if (!/^[a-f0-9-]{36}$/.test(id)) return NextResponse.json({ error: "Foto inválida." }, { status: 400 });
  const record = deleteGalleryPhotoRecord(id);
  if (!record) return NextResponse.json({ error: "Foto não encontrada." }, { status: 404 });
  await Promise.allSettled([
    unlink(resolveUploadFile(record.grid_filename)),
    unlink(resolveUploadFile(record.full_filename)),
  ]);
  return NextResponse.json({ deleted: true });
}
