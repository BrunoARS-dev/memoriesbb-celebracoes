"use client";

import { useState, type FormEvent } from "react";

import { LinkButton } from "@/components/ui/link-button";
import type { RsvpConfig } from "@/content/celebration";

type Attendance = "yes" | "no" | "";

export function RsvpForm({
  config,
  invitationAvailable,
}: {
  config: RsvpConfig;
  invitationAvailable: boolean;
}) {
  const [attendance, setAttendance] = useState<Attendance>("");
  const [companions, setCompanions] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Demonstração local: a persistência das respostas será implementada em uma etapa futura.
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <section className="rsvp-success" aria-live="polite" aria-labelledby="rsvp-success-title">
        <div className="rsvp-success-mark" aria-hidden="true">
          <svg viewBox="0 0 32 32"><path d="m8 16.5 5 5L24.5 10" /></svg>
        </div>
        <h2 id="rsvp-success-title">Resposta recebida</h2>
        <p>{config.closingMessage}</p>
        <div className="rsvp-success-actions">
          <button type="button" className="rsvp-secondary-button" onClick={() => setSubmitted(false)}>
            {config.buttons.edit}
          </button>
          {invitationAvailable && config.returnToInvitation ? (
            <LinkButton href={config.returnToInvitation.href}>{config.returnToInvitation.label}</LinkButton>
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <form className="rsvp-form" onSubmit={handleSubmit}>
      <div className="rsvp-field">
        <label htmlFor="full-name">Nome completo</label>
        <input id="full-name" name="fullName" type="text" autoComplete="name" required />
      </div>

      <fieldset className="rsvp-fieldset">
        <legend>Você estará presente?</legend>
        <div className="rsvp-options">
          <label className="rsvp-option">
            <input type="radio" name="attendance" value="yes" checked={attendance === "yes"} onChange={() => setAttendance("yes")} required />
            <span>Sim, estarei presente</span>
          </label>
          <label className="rsvp-option">
            <input type="radio" name="attendance" value="no" checked={attendance === "no"} onChange={() => { setAttendance("no"); setCompanions(0); }} required />
            <span>Não poderei comparecer</span>
          </label>
        </div>
      </fieldset>

      {config.fields.companions && attendance === "yes" ? (
        <div className="rsvp-companions">
          <div className="rsvp-field">
            <label htmlFor="companions">Quantidade de acompanhantes</label>
            <input id="companions" name="companions" type="number" min="0" max="10" inputMode="numeric" value={companions} onChange={(event) => setCompanions(Number(event.target.value))} required />
          </div>
          {companions > 0 ? (
            <div className="rsvp-field">
              <label htmlFor="companion-names">Nome dos acompanhantes</label>
              <textarea id="companion-names" name="companionNames" rows={3} placeholder="Informe um nome por linha" required />
            </div>
          ) : null}
        </div>
      ) : null}

      {config.fields.note ? (
        <div className="rsvp-field">
          <label htmlFor="note">Observação <span>(opcional)</span></label>
          <textarea id="note" name="note" rows={4} />
        </div>
      ) : null}

      <button className="rsvp-submit" type="submit">{config.buttons.submit}</button>
    </form>
  );
}
