import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SharedGallery } from "@/components/gallery/shared-gallery";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { celebration } from "@/content/celebration";
import { listGalleryPhotos } from "@/lib/gallery/database";
import { getThemeStyle } from "@/lib/theme-style";

export const metadata: Metadata = celebration.gallery
  ? {
      title: `${celebration.gallery.title} | ${celebration.names.join(" & ")}`,
      description: celebration.gallery.introduction,
    }
  : {};

export const dynamic = "force-dynamic";

export default function GalleryPage() {
  const gallery = celebration.gallery;

  if (!celebration.modules.gallery || !gallery) notFound();

  return (
    <main className="shared-gallery-page" style={getThemeStyle(celebration.theme)}>
      <header className="shared-gallery-hero">
        <Container>
          <div className="shared-gallery-hero-top">
            <p className="brand-mark shared-gallery-brand" aria-label={celebration.labels.brandName}>{celebration.labels.brandShort}</p>
            <p>{celebration.names.join(" & ")}</p>
          </div>
          <div className="shared-gallery-hero-copy">
            <h1>{gallery.title}</h1>
            <div>
              <p>{gallery.introduction}</p>
              {gallery.message ? <p className="shared-gallery-message">{gallery.message}</p> : null}
            </div>
          </div>
          <a className="gallery-primary-cta" href="#adicionar-foto">{gallery.share.actionLabel}</a>
        </Container>
      </header>

      <SharedGallery config={gallery} initialPhotos={listGalleryPhotos()} />

      <footer className="site-footer">
        <Container className="shared-gallery-footer">
          <p>{celebration.labels.brandName}</p>
          {celebration.modules.invitation && gallery.returnToInvitation ? (
            <LinkButton href={gallery.returnToInvitation.href} variant="secondary">{gallery.returnToInvitation.label}</LinkButton>
          ) : null}
        </Container>
      </footer>
    </main>
  );
}
