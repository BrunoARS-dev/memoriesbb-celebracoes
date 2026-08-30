import Database from "better-sqlite3";

import { ensureGalleryDirectories, galleryDatabasePath } from "@/lib/gallery/paths";
import type { GalleryPhoto, GalleryPhotoRecord } from "@/lib/gallery/types";

const globalForGallery = globalThis as typeof globalThis & { memoriesGalleryDb?: Database.Database };

function createDatabase() {
  ensureGalleryDirectories();
  const database = new Database(galleryDatabasePath);
  database.pragma("journal_mode = WAL");
  database.pragma("foreign_keys = ON");
  database.pragma("busy_timeout = 5000");
  database.exec(`
    CREATE TABLE IF NOT EXISTS gallery_photos (
      id TEXT PRIMARY KEY,
      grid_filename TEXT NOT NULL,
      full_filename TEXT NOT NULL,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      created_at INTEGER NOT NULL
    )
  `);
  return database;
}

export function getGalleryDatabase() {
  globalForGallery.memoriesGalleryDb ??= createDatabase();
  return globalForGallery.memoriesGalleryDb;
}

function toGalleryPhoto(record: GalleryPhotoRecord): GalleryPhoto {
  return {
    id: record.id,
    gridUrl: `/api/gallery/photos/${record.id}/grid`,
    fullUrl: `/api/gallery/photos/${record.id}/full`,
    width: record.width,
    height: record.height,
    createdAt: new Date(record.created_at).toISOString(),
  };
}

export function listGalleryPhotos() {
  const records = getGalleryDatabase()
    .prepare("SELECT id, grid_filename, full_filename, width, height, created_at FROM gallery_photos ORDER BY created_at DESC")
    .all() as GalleryPhotoRecord[];
  return records.map(toGalleryPhoto);
}

export function findGalleryPhotoRecord(id: string) {
  return getGalleryDatabase()
    .prepare("SELECT id, grid_filename, full_filename, width, height, created_at FROM gallery_photos WHERE id = ?")
    .get(id) as GalleryPhotoRecord | undefined;
}

export function insertGalleryPhoto(record: GalleryPhotoRecord) {
  getGalleryDatabase().prepare(`
    INSERT INTO gallery_photos (id, grid_filename, full_filename, width, height, created_at)
    VALUES (@id, @grid_filename, @full_filename, @width, @height, @created_at)
  `).run(record);
  return toGalleryPhoto(record);
}

export function deleteGalleryPhotoRecord(id: string) {
  const record = findGalleryPhotoRecord(id);
  if (!record) return undefined;
  getGalleryDatabase().prepare("DELETE FROM gallery_photos WHERE id = ?").run(id);
  return record;
}
