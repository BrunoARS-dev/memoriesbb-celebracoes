import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";
import { alMare as content } from "@/content/al-mare";
import { Arrow, Navigation, PresenceForm, WeddingCountdown } from "@/components/al-mare/interactive";
import styles from "./al-mare.module.css";

const editorial = localFont({ src: "./fonts/CormorantGaramond.ttf", variable: "--al-editorial", display: "swap" });
const sans = localFont({ src: "./fonts/DMSans.ttf", variable: "--al-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Al Mare | Memories BB",
  description: "Um verão mediterrâneo com alma baiana. Um convite para celebrar à beira-mar.",
  robots: { index: false, follow: false },
};

function Monogram({ className = "" }: { className?: string }) {
  return <Image className={`${styles.monogram} ${className}`} src="/al-mare/monogram.png" width={80} height={120} alt="Monograma BB" />;
}

function Wave({ className = "" }: { className?: string }) {
  return <svg className={`${styles.wave} ${className}`} viewBox="0 0 1440 90" preserveAspectRatio="none" aria-hidden="true"><path d="M0 50C160 120 340-20 540 40S850 100 1050 40 1290 0 1440 48V90H0Z" fill="currentColor" /></svg>;
}

export default function AlMarePage() {
  return <main className={`${styles.page} ${editorial.variable} ${sans.variable}`} id="inicio">
    <a href="#historia" className={styles.skipLink}>Ir para o conteúdo</a>
    <header className={styles.header}>
      <a href="#inicio" className={styles.brand} aria-label="BB — início do convite"><Monogram /></a>
      <Navigation />
    </header>

    <section className={styles.hero} aria-labelledby="couple-names">
      <Image src="/al-mare/invitation-background.webp" alt="" fill priority sizes="100vw" className={styles.heroBackground} />
      <div className={styles.invitation}>
        <Monogram className={styles.heroMonogram} />
        <h1 id="couple-names"><span>{content.names[0]}</span><i>&amp;</i><span>{content.names[1]}</span></h1>
        <p className={styles.heroDate}>{content.date}<span aria-hidden="true"> · </span><span>{content.city}</span></p>
        <p className={styles.heroMessage}>{content.invitation}</p>
        <a className={styles.button} href="#historia">Abra o convite <Arrow /></a>
      </div>
    </section>

    <section id="historia" className={`${styles.story} ${styles.section}`} aria-labelledby="story-heading">
      <div className={styles.storyPhoto}>
        <figure>{content.couplePhoto ? <Image src={content.couplePhoto} alt={content.couplePhotoAlt} fill sizes="(max-width: 760px) 90vw, 45vw" /> : <div className={styles.photoPlaceholder}><span>[Fotografia do casal]</span></div>}</figure>
        <span className={styles.seal} aria-hidden="true"><Monogram /></span>
      </div>
      <div className={styles.storyCopy}><p className={styles.sectionLabel}>01 / Nossa história</p><h2 id="story-heading">Os nossos<br /><em>caminhos</em></h2><p>{content.story}</p><p>{content.memory}</p></div>
    </section>

    <section id="dia" className={styles.day} aria-labelledby="day-heading">
      <Wave className={styles.dayWave} />
      <div className={`${styles.dayGrid} ${styles.section}`}>
        <div><p className={styles.sectionLabel}>02 / O casamento</p><h2 id="day-heading">O grande<br /><em>dia</em></h2><p className={styles.dayMessage}>{content.dayMessage}</p><WeddingCountdown target={content.dateISO} /></div>
        <div className={styles.dayPaper}><h3>Cerimônia</h3><p>{content.date}</p><p>{content.time}</p><p>{content.venue}</p><address>{content.address}</address><hr /><h3>Celebração</h3><p>{content.reception}</p>{content.mapURL ? <a className={styles.textLink} href={content.mapURL} target="_blank" rel="noreferrer">Como chegar <Arrow /></a> : <p className={styles.locationPending}>Localização a definir</p>}<Wave /></div>
      </div>
    </section>

    <section id="traje" className={`${styles.attire} ${styles.section}`} aria-labelledby="attire-heading">
      <figure className={styles.atmosphere}><Image src="/al-mare/tablescape.webp" alt="Imagem ilustrativa de flores pink e laranja, linho e mesa de celebração à beira-mar" fill sizes="(max-width: 760px) 90vw, 45vw" /><figcaption>Imagem de atmosfera · Al Mare</figcaption></figure>
      <div><p className={styles.sectionLabel}>03 / Dress code</p><h2 id="attire-heading">Cores para<br /><em>celebrar</em></h2><p className={styles.attireTitle}>{content.attire}</p><p>{content.attireDescription}</p><ul className={styles.palette} aria-label="Paleta da celebração">{[["Laranja", "#E38034"], ["Pink", "#C82C56"], ["Amarelo", "#E9A83E"], ["Oliva", "#575818"]].map(([label, color]) => <li key={label}><span style={{ backgroundColor: color }} /><small>{label}</small></li>)}</ul><p className={styles.paletteNote}>Paleta da celebração. Orientações de traje a definir.</p></div>
    </section>

    <section id="salvador" className={styles.travel} aria-labelledby="travel-heading">
      <div className={`${styles.travelInner} ${styles.section}`}>
        <div><p className={styles.sectionLabel}>04 / Guia de viagem</p><h2 id="travel-heading">Salvador,<br /><em>Bahia</em></h2><p>{content.travelIntroduction}</p><div className={styles.travelList}>{content.travel.map((item, index) => <details key={item.title} open={index === 0}><summary><span className={styles.travelIndex}>0{index + 1}</span><span>{item.title}</span><span className={styles.plus} aria-hidden="true" /></summary><div><p>{item.text}</p><p>{item.detail}</p></div></details>)}</div></div>
        <figure className={styles.travelPhoto}><Image src="/al-mare/coast.webp" alt="Imagem ilustrativa do litoral tropical, com mar e coqueiros" fill sizes="(max-width: 760px) 90vw, 36vw" /><figcaption>Imagem de atmosfera · litoral tropical</figcaption></figure>
      </div>
    </section>

    <section id="rsvp" className={styles.rsvp} aria-labelledby="rsvp-heading"><Wave className={styles.rsvpWave} /><div className={`${styles.rsvpInner} ${styles.section}`}><div><p className={styles.sectionLabel}>05 / RSVP</p><h2 id="rsvp-heading">Vamos<br /><em>celebrar?</em></h2><p>{content.rsvpMessage}</p></div><PresenceForm /></div></section>

    <section className={styles.closing} aria-labelledby="closing-heading"><Image src="/al-mare/floral-paper.webp" alt="" fill sizes="100vw" /><div className={styles.closingCopy}><Monogram /><h2 id="closing-heading">{content.closingMessage}</h2><p className={styles.closingNames}>{content.names.join(" & ")}</p><p>{content.city}</p></div></section>
    <footer className={styles.footer}><span>Memories BB</span><a href="#inicio">Voltar ao início <Arrow up /></a></footer>
  </main>;
}
