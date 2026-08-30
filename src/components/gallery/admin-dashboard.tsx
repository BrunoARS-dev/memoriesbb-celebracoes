"use client";

import Image from "next/image";
import { useState } from "react";

import type { GalleryPhoto } from "@/lib/gallery/types";

export function AdminDashboard({
  initialPhotos,
  publicUrl,
  qrCode,
}: {
  initialPhotos: GalleryPhoto[];
  publicUrl: string;
  qrCode: string;
}) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  async function deletePhoto(id: string) {
    if (!window.confirm("Excluir esta foto permanentemente?")) return;
    setDeleting(id);
    setError("");
    try {
      const response = await fetch(`/api/gallery/admin/photos/${id}`, { method: "DELETE" });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "Não foi possível excluir a foto.");
      setPhotos((current) => current.filter((photo) => photo.id !== id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Não foi possível excluir a foto.");
    } finally {
      setDeleting(null);
    }
  }

  async function logout() {
    await fetch("/api/gallery/admin/session", { method: "DELETE" });
    window.location.reload();
  }

  return (
    <main className="gallery-admin-page">
      <header className="gallery-admin-header">
        <div><p>MemoriesBB</p><h1>Gestão da galeria</h1></div>
        <button type="button" onClick={logout}>Sair</button>
      </header>
      <section className="gallery-admin-summary">
        <div className="gallery-admin-qr">
          <Image src={qrCode} alt="QR Code para acessar a galeria pública" width={320} height={320} unoptimized />
          <a href={qrCode} download="qr-code-galeria.png">Baixar QR Code</a>
          <p>{publicUrl}</p>
        </div>
        <div className="gallery-admin-count"><strong>{photos.length}</strong><span>{photos.length === 1 ? "foto publicada" : "fotos publicadas"}</span></div>
      </section>
      <section className="gallery-admin-list" aria-labelledby="admin-photo-list-title">
        <h2 id="admin-photo-list-title">Fotos enviadas</h2>
        {error ? <p className="gallery-admin-error" role="alert">{error}</p> : null}
        {photos.length === 0 ? <p className="gallery-admin-empty">Nenhuma foto foi enviada ainda.</p> : (
          <ul>
            {photos.map((photo) => (
              <li key={photo.id}>
                <div><Image src={photo.gridUrl} alt="Foto enviada à galeria" fill sizes="8rem" unoptimized /></div>
                <p>{new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(photo.createdAt))}</p>
                <button type="button" disabled={deleting === photo.id} onClick={() => deletePhoto(photo.id)}>{deleting === photo.id ? "Excluindo…" : "Excluir"}</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
