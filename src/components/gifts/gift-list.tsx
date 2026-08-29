import { EditorialPhoto } from "@/components/invitation/editorial-photo";
import { Container } from "@/components/ui/container";
import { LinkButton } from "@/components/ui/link-button";
import type { GiftListConfig } from "@/content/celebration";

export function GiftList({ gifts }: { gifts: GiftListConfig }) {
  if (gifts.items.length === 0) return null;

  return (
    <section className="gift-list-section" id="presentes" aria-label={gifts.title}>
      <Container>
        <ol className="gift-grid">
          {gifts.items.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              <article className="gift-item">
                {item.image ? (
                  <EditorialPhoto photo={item.image} className="gift-item-image" />
                ) : (
                  <div className="gift-item-image gift-item-empty" aria-hidden="true">
                    <span />
                  </div>
                )}
                <div className="gift-item-content">
                  <p className="gift-item-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{item.name}</h3>
                  {item.description ? <p className="gift-item-description">{item.description}</p> : null}
                  {item.reference ? <p className="gift-item-reference">{item.reference}</p> : null}
                  {item.availability ? (
                    <p className="gift-item-availability">
                      <span aria-hidden="true" />
                      {item.availability}
                    </p>
                  ) : null}
                  {item.link ? (
                    <LinkButton href={item.link} target="_blank" rel="noreferrer">
                      {gifts.actionLabel}
                    </LinkButton>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
