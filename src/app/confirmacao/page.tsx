import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { RsvpForm } from "@/components/rsvp/rsvp-form";
import { Container } from "@/components/ui/container";
import { celebration } from "@/content/celebration";
import { getThemeStyle } from "@/lib/theme-style";

export const metadata: Metadata = celebration.rsvp
  ? {
      title: `${celebration.rsvp.title} | ${celebration.names.join(" & ")}`,
      description: celebration.rsvp.introduction,
    }
  : {};

export default function RsvpPage() {
  const rsvp = celebration.rsvp;

  if (!celebration.modules.rsvp || !rsvp) notFound();

  return (
    <main className="rsvp-page" style={getThemeStyle(celebration.theme)}>
      <Container className="rsvp-page-layout">
        <header className="rsvp-page-intro">
          <p className="brand-mark rsvp-brand" aria-label={celebration.labels.brandName}>
            {celebration.labels.brandShort}
          </p>
          <div>
            <p className="rsvp-couple">{celebration.names.join(" & ")}</p>
            <h1>{rsvp.title}</h1>
            <p className="rsvp-introduction">{rsvp.introduction}</p>
            {rsvp.deadline ? <p className="rsvp-deadline">{rsvp.deadline}</p> : null}
          </div>
          <div className="rsvp-event-signature" aria-label="Informações da celebração">
            <span>{celebration.dateTime.displayDate}</span>
            {celebration.venue ? <span>{celebration.venue.name}</span> : null}
          </div>
        </header>

        <div className="rsvp-form-panel">
          <RsvpForm config={rsvp} invitationAvailable={celebration.modules.invitation} />
        </div>
      </Container>
    </main>
  );
}
