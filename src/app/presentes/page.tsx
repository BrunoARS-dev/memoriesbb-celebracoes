import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { GiftList } from "@/components/gifts/gift-list";
import { EditorialPhoto } from "@/components/invitation/editorial-photo";
import { Container } from "@/components/ui/container";
import { celebration } from "@/content/celebration";
import { getThemeStyle } from "@/lib/theme-style";

export const metadata: Metadata = celebration.gifts
  ? {
      title: `${celebration.gifts.title} | ${celebration.names.join(" & ")}`,
      description: celebration.gifts.introduction,
    }
  : {};

export default function GiftsPage() {
  const gifts = celebration.gifts;

  if (!celebration.modules.gifts || !gifts || gifts.items.length === 0) notFound();

  return (
    <main className="gifts-page" style={getThemeStyle(celebration.theme)}>
      <header className="gifts-page-hero">
        <Container className="gifts-page-hero-layout">
          <div className="gifts-page-copy">
            <p className="brand-mark gifts-brand" aria-label={celebration.labels.brandName}>
              {celebration.labels.brandShort}
            </p>
            <p className="gifts-couple">{celebration.names.join(" & ")}</p>
            <h1>{gifts.title}</h1>
            <p className="gifts-introduction">{gifts.introduction}</p>
            {gifts.instructions ? <p className="gifts-instructions">{gifts.instructions}</p> : null}
          </div>
          {gifts.cover ? (
            <EditorialPhoto photo={gifts.cover} priority className="gifts-page-photo" />
          ) : (
            <div className="gifts-page-art" aria-hidden="true"><span /></div>
          )}
        </Container>
      </header>

      <GiftList gifts={gifts} />

      <footer className="site-footer">
        <Container><p>{celebration.labels.brandName}</p></Container>
      </footer>
    </main>
  );
}
