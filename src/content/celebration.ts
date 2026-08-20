export type CelebrationModule = "invitation" | "gifts" | "rsvp" | "gallery";

export type CelebrationConfig = {
  slug: string;
  names: [string, string];
  dateTime: {
    iso: string;
    displayDate: string;
    displayTime: string;
    timeZone: string;
  };
  venue: {
    name: string;
    address: string;
  };
  texts: {
    headline: string;
    description: string;
    invitation: string;
  };
  links: {
    map: string;
    calendar?: string;
    contact?: string;
  };
  photos: {
    hero: string;
    gallery: string[];
  };
  modules: Record<CelebrationModule, boolean>;
};

export const celebration = {
  slug: "ana-e-caio",
  names: ["Ana", "Caio"],
  dateTime: {
    iso: "2027-05-15T16:00:00-03:00",
    displayDate: "15 de maio de 2027",
    displayTime: "16h",
    timeZone: "America/Sao_Paulo",
  },
  venue: {
    name: "Casa das Oliveiras",
    address: "Alameda das Flores, 120 — São Paulo, SP",
  },
  texts: {
    headline: "Vamos celebrar juntos",
    description: "Um encontro especial para celebrar uma nova memória.",
    invitation: "Esperamos você para compartilhar este dia com a gente.",
  },
  links: {
    map: "https://maps.google.com/",
    contact: "mailto:celebracoes@memoriesbb.com.br",
  },
  photos: {
    hero: "/images/celebrations/ana-e-caio/hero.jpg",
    gallery: [],
  },
  modules: {
    invitation: true,
    gifts: false,
    rsvp: false,
    gallery: false,
  },
} satisfies CelebrationConfig;
