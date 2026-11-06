"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "@/app/al-mare/al-mare.module.css";

export function Arrow({ up = false }: { up?: boolean }) {
  return <svg viewBox="0 0 32 20" width="32" height="20" aria-hidden="true" style={up ? { transform: "rotate(-90deg)" } : undefined}><path d="M1 10h28m-8-8 8 8-8 8" fill="none" stroke="currentColor" strokeWidth="1.2" /></svg>;
}

const links = [["#historia", "Nossa história"], ["#dia", "O grande dia"], ["#salvador", "Guia de Salvador"]] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <>
    <button className={styles.menuButton} type="button" aria-controls="al-mare-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Fechar" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button>
    <nav id="al-mare-navigation" className={`${styles.navigation} ${open ? styles.navigationOpen : ""}`} aria-label="Navegação do convite" onKeyDown={(event) => { if (event.key === "Escape") setOpen(false); }}>
      {links.map(([href, label]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}
      <a href="#rsvp" className={styles.navRsvp} onClick={() => setOpen(false)}>RSVP</a>
    </nav>
  </>;
}

export function WeddingCountdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  const timestamp = Date.parse(target);
  const configured = Number.isFinite(timestamp);
  useEffect(() => {
    if (!configured) return;
    const tick = () => setNow(Date.now());
    const initial = window.setTimeout(tick, 0);
    const timer = window.setInterval(tick, 1000);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); };
  }, [configured]);
  const remaining = configured && now !== null ? Math.max(0, Math.floor((timestamp - now) / 1000)) : null;
  const units = remaining === null ? [null, null, null, null] : [Math.floor(remaining / 86400), Math.floor(remaining / 3600) % 24, Math.floor(remaining / 60) % 60, remaining % 60];
  return <div className={styles.countdown} aria-label="Contagem regressiva para o casamento">
    <div className={styles.countdownNumbers}>{["dias", "horas", "minutos", "segundos"].map((label, index) => <div key={label}><strong>{units[index] === null ? "—" : String(units[index]).padStart(2, "0")}</strong><span>{label}</span></div>)}</div>
    <p>{!configured ? "Data a definir" : remaining === 0 ? "O grande dia chegou." : "Para o grande dia"}</p>
  </div>;
}

export function PresenceForm() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");
  const [review, setReview] = useState(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);

  useEffect(() => { if (review) reviewHeading.current?.focus(); }, [review]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim()) {
      nameInput.current?.setCustomValidity("Informe seu nome completo.");
      nameInput.current?.reportValidity();
      return;
    }
    setReview(true);
  }

  return <div className={styles.formPaper}>
    {review ? <div className={styles.review}>
      <h3 ref={reviewHeading} tabIndex={-1}>Revise sua resposta</h3>
      <dl><div><dt>Nome completo</dt><dd>{name.trim()}</dd></div><div><dt>Presença</dt><dd>{attendance === "yes" ? "Sim, estarei presente" : "Não poderei comparecer"}</dd></div>{message.trim() ? <div><dt>Mensagem</dt><dd>{message}</dd></div> : null}</dl>
      <p role="status">Esta é uma prévia. Nenhuma resposta foi enviada aos noivos ou armazenada.</p>
      <button className={styles.button} type="button" onClick={() => setReview(false)}>Editar resposta <Arrow /></button>
    </div> : <form onSubmit={submit} className={styles.form}>
      <h3>Sua presença</h3>
      <label htmlFor="al-mare-name">Nome completo <span aria-hidden="true">*</span></label>
      <input ref={nameInput} id="al-mare-name" name="name" autoComplete="name" required maxLength={160} value={name} onChange={(event) => { event.currentTarget.setCustomValidity(""); setName(event.target.value); }} />
      <label htmlFor="al-mare-attendance">Você estará presente? <span aria-hidden="true">*</span></label>
      <select id="al-mare-attendance" name="attendance" value={attendance} onChange={(event) => setAttendance(event.target.value)} required><option value="" disabled>Selecione uma opção</option><option value="yes">Sim, estarei presente</option><option value="no">Não poderei comparecer</option></select>
      <label htmlFor="al-mare-message">Mensagem <span>(opcional)</span></label>
      <textarea id="al-mare-message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} rows={3} maxLength={2000} />
      <button className={styles.button} type="submit">Revisar resposta <Arrow /></button>
      <p className={styles.previewNote}>Prévia: sua resposta ainda não será enviada.</p>
    </form>}
  </div>;
}
