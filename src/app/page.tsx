import { Countdown } from "@/components/invitation/countdown";
import { EditorialPhoto } from "@/components/invitation/editorial-photo";
import { SectionTitle } from "@/components/invitation/section-title";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import { celebration } from "@/content/celebration";

export default function Home() {
  if (!celebration.modules.invitation) return null;
  const [firstName, secondName] = celebration.names;

  return (
    <main>
      <header className="hero">
        <div className="hero-copy">
          <p className="brand-mark" aria-label="MemoriesBB">MB</p>
          <h1><span>{firstName}</span><i aria-hidden="true">&amp;</i><span>{secondName}</span></h1>
          <p className="hero-date">{celebration.dateTime.displayDate}</p>
        </div>
        {celebration.photos.hero ? <EditorialPhoto photo={celebration.photos.hero} priority className="hero-photo" /> : null}
        <a className="scroll-cue" href="#convite" aria-label="Ir para o convite">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v15M6.5 13.5 12 19l5.5-5.5" /></svg>
        </a>
      </header>

      <section className="opening" id="convite">
        <Container className="opening-inner">
          <p className="section-script">{celebration.texts.headline}</p>
          <p className="opening-message">{celebration.texts.invitation}</p>
          <p className="opening-description">{celebration.texts.description}</p>
          <Countdown target={celebration.dateTime.iso} label={celebration.labels.countdown} />
        </Container>
      </section>

      {celebration.texts.details || celebration.venue ? (
        <section className="details-section">
          <Container className="details-grid">
            {celebration.texts.details ? <div><SectionTitle>{celebration.labels.details}</SectionTitle><p className="body-copy">{celebration.texts.details}</p></div> : null}
            <dl className="date-panel">
              <div><dt>Data</dt><dd>{celebration.dateTime.displayDate}</dd></div>
              <div><dt>Horário</dt><dd>{celebration.dateTime.displayTime}</dd></div>
            </dl>
          </Container>
        </section>
      ) : null}

      {celebration.schedule.length > 0 ? (
        <section className="timeline-section">
          <Container className="timeline-layout">
            <div className="timeline-intro"><SectionTitle light>{celebration.labels.timeline}</SectionTitle>{celebration.texts.timeline ? <p>{celebration.texts.timeline}</p> : null}</div>
            <ol className="timeline-list">
              {celebration.schedule.map((item) => (
                <li key={`${item.time}-${item.title}`}><time>{item.time}</time><div><h3>{item.title}</h3>{item.description ? <p>{item.description}</p> : null}</div></li>
              ))}
            </ol>
          </Container>
        </section>
      ) : null}

      {celebration.venue ? (
        <section className="location-section">
          <Container className="location-layout">
            <div>
              <SectionTitle>{celebration.labels.location}</SectionTitle>
              <p className="venue-name">{celebration.venue.name}</p><address>{celebration.venue.address}</address>
              {celebration.links.map ? <LinkButton href={celebration.links.map} target="_blank" rel="noreferrer">{celebration.labels.mapAction}</LinkButton> : null}
            </div>
            <div className="map-art" aria-hidden="true"><span>{firstName.charAt(0)} · {secondName.charAt(0)}</span></div>
          </Container>
        </section>
      ) : null}

      {celebration.dressCode ? (
        <section className="dress-section">
          <Container className="dress-layout">
            <div>
              <SectionTitle>{celebration.labels.dressCode}</SectionTitle><p className="dress-name">{celebration.dressCode.title}</p>
              {celebration.texts.dressCode ? <p className="body-copy">{celebration.texts.dressCode}</p> : null}
              {celebration.dressCode.colors?.length ? <ul className="color-palette" aria-label="Paleta de cores sugerida">
                {celebration.dressCode.colors.map((color) => <li key={color} style={{ backgroundColor: color }}><span className="sr-only">Cor {color}</span></li>)}
              </ul> : null}
            </div>
            <div className="paint-art" aria-hidden="true" />
          </Container>
        </section>
      ) : null}

      {celebration.texts.story ? (
        <section className="story-section"><Container className="story-layout"><div className="story-art" aria-hidden="true"><span /></div><div><SectionTitle>{celebration.labels.story}</SectionTitle><p className="body-copy">{celebration.texts.story}</p></div></Container></section>
      ) : null}

      {celebration.modules.gallery && celebration.photos.gallery.length > 0 ? (
        <section className="gallery-section"><Container><SectionTitle>{celebration.labels.gallery}</SectionTitle><div className="gallery-grid">
          {celebration.photos.gallery.map((photo, index) => <EditorialPhoto photo={photo} key={`${photo.alt}-${index}`} />)}
        </div></Container></section>
      ) : null}

      {celebration.modules.rsvp && celebration.links.rsvp ? (
        <section className="rsvp-section" id="confirmacao"><Container className="rsvp-inner"><SectionTitle light>{celebration.labels.rsvp}</SectionTitle>{celebration.texts.rsvp ? <p>{celebration.texts.rsvp}</p> : null}<LinkButton href={celebration.links.rsvp} target="_blank" rel="noreferrer" variant="secondary">{celebration.labels.rsvpAction}</LinkButton></Container></section>
      ) : null}

      <footer className="site-footer"><Container><p>MemoriesBB</p></Container></footer>
    </main>
  );
}
