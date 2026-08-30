"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import type { SharedGalleryConfig } from "@/content/celebration";
import type { GalleryPhoto } from "@/lib/gallery/types";

const maxUploadBytes = 10 * 1024 * 1024;

export function SharedGallery({ config, initialPhotos }: { config: SharedGalleryConfig; initialPhotos: GalleryPhoto[] }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const refreshPhotos = useCallback(async () => {
    try {
      const response = await fetch("/api/gallery/photos", { cache: "no-store" });
      if (!response.ok) return;
      const result = await response.json() as { photos: GalleryPhoto[] };
      setPhotos(result.photos);
    } catch {
      // O polling é silencioso; o convidado continua vendo o último estado válido.
    }
  }, []);

  useEffect(() => {
    const interval = window.setInterval(refreshPhotos, 12_000);
    return () => window.clearInterval(interval);
  }, [refreshPhotos]);

  useEffect(() => () => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
  }, []);

  const activeIndex = activeId ? photos.findIndex((photo) => photo.id === activeId) : -1;
  const activePhoto = activeIndex >= 0 ? photos[activeIndex] : null;
  const isOpen = Boolean(activePhoto);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function move(offset: number) {
      setActiveId((currentId) => {
        const currentIndex = photos.findIndex((photo) => photo.id === currentId);
        if (currentIndex < 0) return null;
        return photos[(currentIndex + offset + photos.length) % photos.length]?.id ?? null;
      });
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveId(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen, photos]);

  function selectFile(file: File | undefined) {
    setUploadState("idle");
    setMessage("");
    if (!file) return setSelectedFile(null);
    if (file.size > maxUploadBytes) {
      setSelectedFile(null);
      setUploadState("error");
      return setMessage("A imagem deve ter no máximo 10 MB.");
    }
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = URL.createObjectURL(file);
    setPreviewUrl(previewUrlRef.current);
    setSelectedFile(file);
  }

  function uploadPhoto() {
    if (!selectedFile || uploadState === "uploading") return;
    setUploadState("uploading");
    setUploadProgress(0);
    setMessage("Enviando e preparando sua fotografia…");
    const form = new FormData();
    form.append("photo", selectedFile);
    const request = new XMLHttpRequest();
    request.open("POST", "/api/gallery/photos");
    request.responseType = "json";
    request.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) setUploadProgress(Math.round((event.loaded / event.total) * 100));
    });
    request.addEventListener("load", () => {
      const result = request.response as { photo?: GalleryPhoto; error?: string } | null;
      if (request.status >= 200 && request.status < 300 && result?.photo) {
        setPhotos((current) => [result.photo!, ...current.filter((photo) => photo.id !== result.photo!.id)]);
        setSelectedFile(null);
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
        previewUrlRef.current = "";
        setPreviewUrl("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setUploadState("success");
        setUploadProgress(100);
        setMessage("Foto publicada. Ela já está disponível para todos os convidados.");
      } else {
        setUploadState("error");
        setMessage(result?.error || "Não foi possível enviar a foto. Tente novamente.");
      }
    });
    request.addEventListener("error", () => {
      setUploadState("error");
      setMessage("A conexão foi interrompida. Verifique sua internet e tente novamente.");
    });
    request.send(form);
  }

  function moveLightbox(offset: number) {
    if (activeIndex < 0) return;
    setActiveId(photos[(activeIndex + offset + photos.length) % photos.length]?.id ?? null);
  }

  return (
    <>
      <section className="shared-gallery-share" id="adicionar-foto" aria-labelledby="gallery-share-title">
        <Container className="shared-gallery-share-layout">
          <div className="shared-gallery-share-art" aria-hidden="true"><span /><i /></div>
          <div>
            <h2 id="gallery-share-title">{config.share.title}</h2>
            <p>{config.share.description}</p>
            <div className="gallery-upload-controls">
              <input ref={fileInputRef} id="gallery-photo" type="file" name="photo" accept="image/jpeg,image/png,image/webp" capture="environment" onClick={(event) => { event.currentTarget.value = ""; }} onChange={(event) => selectFile(event.target.files?.[0])} />
              <label htmlFor="gallery-photo">{config.share.actionLabel}</label>
              {selectedFile && previewUrl ? <div className="gallery-selected-preview"><Image src={previewUrl} alt="Prévia da fotografia selecionada" fill sizes="20rem" unoptimized /></div> : null}
              {selectedFile ? <p className="gallery-selected-file">{selectedFile.name} · {(selectedFile.size / 1024 / 1024).toFixed(1)} MB</p> : null}
              {selectedFile ? <button type="button" onClick={uploadPhoto} disabled={uploadState === "uploading"}>{uploadState === "uploading" ? "Enviando…" : "Publicar foto"}</button> : null}
              {uploadState === "uploading" ? <progress max="100" value={uploadProgress} aria-label={`Envio ${uploadProgress}% concluído`}>{uploadProgress}%</progress> : null}
              {message ? <p className={`gallery-upload-message gallery-upload-${uploadState}`} role="status" aria-live="polite">{message}</p> : null}
              <p className="gallery-upload-help">JPEG, PNG ou WebP · máximo de 10 MB</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="shared-gallery-collection" aria-labelledby="gallery-collection-title">
        <Container>
          <div className="gallery-collection-heading">
            <h2 id="gallery-collection-title">Galeria compartilhada</h2>
            <button type="button" onClick={refreshPhotos}>Atualizar fotos</button>
          </div>
          {photos.length === 0 ? (
            <section className="shared-gallery-empty" aria-labelledby="gallery-empty-title">
              <div className="shared-gallery-empty-art" aria-hidden="true"><span /></div>
              <div><h3 id="gallery-empty-title">{config.empty.title}</h3><p>{config.empty.message}</p><a href="#adicionar-foto">Adicionar a primeira foto</a></div>
            </section>
          ) : (
            <ol className="shared-gallery-grid" aria-label="Fotografias enviadas pelos convidados">
              {photos.map((photo, index) => (
                <li key={photo.id} className={`shared-gallery-item shared-gallery-item-${(index % 5) + 1}`}>
                  <article>
                    <div className="shared-gallery-photo"><Image src={photo.gridUrl} alt="Fotografia compartilhada por um convidado" fill sizes="(max-width: 767px) 90vw, 55vw" unoptimized /></div>
                    <button type="button" className="shared-gallery-open" aria-haspopup="dialog" aria-label={`Ampliar fotografia ${index + 1}`} onClick={(event) => { triggerRef.current = event.currentTarget; setActiveId(photo.id); }} />
                  </article>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </section>

      {activePhoto ? (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-caption">
          <button ref={closeButtonRef} type="button" className="gallery-lightbox-close" aria-label="Fechar fotografia ampliada" onClick={() => setActiveId(null)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
          <button type="button" className="gallery-lightbox-nav gallery-lightbox-prev" aria-label="Fotografia anterior" onClick={() => moveLightbox(-1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 5-7 7 7 7" /></svg></button>
          <div className="gallery-lightbox-content">
            <div className="gallery-lightbox-photo"><Image src={activePhoto.fullUrl} alt="Fotografia compartilhada ampliada" fill sizes="90vw" unoptimized /></div>
            <div className="gallery-lightbox-meta"><p>{String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</p><p id="gallery-lightbox-caption">Fotografia compartilhada na celebração</p></div>
          </div>
          <button type="button" className="gallery-lightbox-nav gallery-lightbox-next" aria-label="Próxima fotografia" onClick={() => moveLightbox(1)}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg></button>
        </div>
      ) : null}
    </>
  );
}
