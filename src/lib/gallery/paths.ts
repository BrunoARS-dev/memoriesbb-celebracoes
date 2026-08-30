import { mkdirSync } from "node:fs";
import path from "node:path";

function resolveConfiguredPath(value: string | undefined, fallback: string) {
  return path.resolve(/* turbopackIgnore: true */ process.cwd(), value?.trim() || fallback);
}

export const galleryDataDir = resolveConfiguredPath(process.env.GALLERY_DATA_DIR, ".data/gallery");
export const galleryDatabasePath = resolveConfiguredPath(
  process.env.GALLERY_DATABASE_PATH,
  path.join(galleryDataDir, "gallery.sqlite"),
);
export const galleryUploadDir = resolveConfiguredPath(
  process.env.GALLERY_UPLOAD_DIR,
  path.join(galleryDataDir, "uploads"),
);

export function ensureGalleryDirectories() {
  mkdirSync(path.dirname(galleryDatabasePath), { recursive: true });
  mkdirSync(galleryUploadDir, { recursive: true });
}

export function resolveUploadFile(filename: string) {
  if (!/^[a-f0-9-]+-(?:grid|full)\.webp$/.test(filename)) {
    throw new Error("Nome de arquivo inválido.");
  }

  const resolved = path.resolve(/* turbopackIgnore: true */ galleryUploadDir, filename);
  if (path.dirname(resolved) !== galleryUploadDir) throw new Error("Caminho de arquivo inválido.");
  return resolved;
}
