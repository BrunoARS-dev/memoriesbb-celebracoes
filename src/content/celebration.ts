export type CelebrationModule = "invitation" | "gifts" | "rsvp" | "gallery";

export type CelebrationPhoto = {
  src?: string;
  alt: string;
  tone?: "blush" | "olive" | "wine";
};

export type CelebrationConfig = {
  slug: string;
  names: [string, string];
  dateTime: {
    iso: string;
    displayDate: string;
    displayTime: string;
    timeZone: string;
  };
  venue?: { name: string; address: string };
  texts: {
    headline: string;
    description: string;
    invitation: string;
    details?: string;
    timeline?: string;
    dressCode?: string;
    story?: string;
    rsvp?: string;
  };
  links: {
    map?: string;
    calendar?: string;
    contact?: string;
    rsvp?: string;
  };
  photos: { hero?: CelebrationPhoto; gallery: CelebrationPhoto[] };
  schedule: Array<{ time: string; title: string; description?: string }>;
  dressCode?: { title: string; colors?: string[] };
  labels: {
    countdown: string;
    details: string;
    timeline: string;
    location: string;
    mapAction: string;
    dressCode: string;
    story: string;
    gallery: string;
    rsvp: string;
    rsvpAction: string;
  };
  modules: Record<CelebrationModule, boolean>;
};

// Conteúdo inteiramente demonstrativo. Substitua este objeto para cada celebração.
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
    name: "Espaço de celebração — exemplo",
    address: "Endereço demonstrativo — Cidade, UF",
  },
  texts: {
    headline: "Vamos celebrar juntos",
    description: "Um encontro especial para celebrar uma nova memória.",
    invitation: "Esperamos você para compartilhar este dia com a gente.",
    details: "Preparamos este encontro com carinho para estarmos perto de quem faz parte da nossa história.",
    timeline: "Cada momento foi pensado para vivermos o dia com calma, afeto e muitas boas memórias.",
    dressCode: "Traje social. A paleta abaixo é apenas uma inspiração; queremos que você se sinta à vontade.",
    story: "Este é um texto demonstrativo sobre encontros, escolhas e os pequenos momentos que fizeram dois caminhos seguirem lado a lado.",
    rsvp: "Sua presença torna este dia ainda mais especial.",
  },
  links: {
    map: "https://example.com/mapa-demonstrativo",
    contact: "mailto:exemplo@memoriesbb.com.br",
    rsvp: "https://example.com/confirmacao-demonstrativa",
  },
  photos: {
    hero: { alt: "Espaço reservado para a foto principal da celebração", tone: "blush" },
    gallery: [
      { alt: "Espaço reservado para uma memória do casal", tone: "blush" },
      { alt: "Espaço reservado para uma memória do casal", tone: "wine" },
      { alt: "Espaço reservado para uma memória do casal", tone: "olive" },
    ],
  },
  schedule: [
    { time: "16h", title: "Chegada", description: "Boas-vindas e encontro dos convidados." },
    { time: "16h30", title: "Celebração", description: "O momento principal do nosso dia." },
    { time: "18h", title: "Brinde", description: "Um instante para celebrar juntos." },
    { time: "19h", title: "Recepção", description: "Comida, conversa e boas memórias." },
  ],
  dressCode: {
    title: "Traje social",
    colors: ["#5d1f2b", "#bf7d70", "#dfb7a8", "#68705a", "#ddd0bd"],
  },
  labels: {
    countdown: "Falta pouco",
    details: "A celebração",
    timeline: "O dia",
    location: "Como chegar",
    mapAction: "Ver no mapa",
    dressCode: "Para celebrar",
    story: "Nossa história",
    gallery: "Memórias",
    rsvp: "Confirme sua presença",
    rsvpAction: "Confirmar presença",
  },
  modules: { invitation: true, gifts: false, rsvp: true, gallery: true },
} satisfies CelebrationConfig;
