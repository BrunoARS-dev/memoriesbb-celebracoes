import type { Metadata } from "next";
import Image, { getImageProps } from "next/image";
import localFont from "next/font/local";
import { saveTheDate as content } from "@/content/save-the-date";
import { WeddingCountdown } from "@/components/al-mare/interactive";
import styles from "./save-the-date.module.css";

const editorial = localFont({ src: "../al-mare/fonts/CormorantGaramond.ttf", variable: "--save-editorial", display: "swap" });
const sans = localFont({ src: "../al-mare/fonts/DMSans.ttf", variable: "--save-sans", display: "swap" });

export const metadata: Metadata = {
  title: `${content.names.join(" & ")} | Save the date`,
  description: `${content.displayDate} · ${content.location}. ${content.invitation}`,
  robots: { index: false, follow: false },
};

export default function SaveTheDatePage() {
  const { props: desktop } = getImageProps({ src: "/al-mare/invitation-background.webp", alt: "", width: 1536, height: 1024, sizes: "100vw", loading: "eager", fetchPriority: "high" });
  return <main className={`${styles.page} ${editorial.variable} ${sans.variable}`}>
    <picture className={styles.background}>
      <source media="(max-width: 760px)" srcSet="/al-mare/save-the-date-mobile-v2.webp" />
      {/* getImageProps preserves Next image optimization with art-directed sources. */}
      <img {...desktop} alt="" />
    </picture>
    <article className={styles.invitation} aria-labelledby="save-the-date-title">
      <Image src="/al-mare/monogram.png" width={64} height={96} alt="Monograma BB" className={styles.monogram} priority />
      <h1 id="save-the-date-title">{content.title}</h1>
      <p className={styles.names}>{content.names[0]} <em>&amp;</em> {content.names[1]}</p>
      <div className={styles.event}>
        <time dateTime={content.date}>{content.displayDate}</time>
        <p>{content.location}</p>
      </div>
      <div className={styles.message}><p>{content.invitation}</p><p>{content.travelMessage}</p></div>
      <div className={styles.countdown}><WeddingCountdown target={content.countdownTarget} /></div>
      <a href="/save-the-date/calendario" target="_blank" rel="noopener noreferrer" className={styles.calendar}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><rect x="4" y="5" width="16" height="16" rx="1" /><path d="M8 2v6m8-6v6M4 11h16m-12 5 3 3 5-5" /></svg>
        {content.calendarAction}
      </a>
      <p className={styles.closing}>{content.closing}</p>
    </article>
  </main>;
}
