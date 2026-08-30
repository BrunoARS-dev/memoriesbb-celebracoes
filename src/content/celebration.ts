export type CelebrationModule = "invitation" | "gifts" | "rsvp" | "gallery";
export type InvitationBlock =
  | "cover"
  | "opening"
  | "countdown"
  | "details"
  | "timeline"
  | "location"
  | "dressCode"
  | "story"
  | "photoGallery"
  | "confirmation";

export type CelebrationPhoto = {
  src?: string;
  alt: string;
  tone?: "blush" | "olive" | "wine";
};

export type GiftItem = {
  name: string;
  description?: string;
  reference?: string;
  link?: string;
  availability?: string;
  image?: CelebrationPhoto;
};

export type GiftListConfig = {
  route: `/${string}`;
  invitationCtaLabel?: string;
  title: string;
  introduction: string;
  instructions?: string;
  actionLabel: string;
  cover?: CelebrationPhoto;
  items: GiftItem[];
};

export type RsvpConfig = {
  route: `/${string}`;
  invitationCtaLabel?: string;
  title: string;
  introduction: string;
  closingMessage: string;
  deadline?: string;
  fields: {
    fullName: true;
    attendance: true;
    companions: boolean;
    note: boolean;
  };
  buttons: {
    submit: string;
    edit: string;
  };
  returnToInvitation?: {
    href: "/";
    label: string;
  };
};

export type SharedGalleryConfig = {
  route: `/${string}`;
  publicUrl: string;
  invitationCtaLabel?: string;
  title: string;
  introduction: string;
  message?: string;
  empty: {
    title: string;
    message: string;
  };
  share: {
    title: string;
    description: string;
    actionLabel: string;
  };
  returnToInvitation?: {
    href: "/";
    label: string;
  };
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
  gifts?: GiftListConfig;
  rsvp?: RsvpConfig;
  gallery?: SharedGalleryConfig;
  theme?: Partial<{
    canvas: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    accentContrast: string;
    olive: string;
    blush: string;
    gold: string;
    line: string;
    footer: string;
  }>;
  blocks: Record<InvitationBlock, boolean>;
  labels: {
    brandShort: string;
    brandName: string;
    scrollAction: string;
    date: string;
    time: string;
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
  gifts: {
    route: "/presentes",
    invitationCtaLabel: "Ver lista de presentes",
    title: "Presentes com afeto",
    introduction:
      "Esta lista é inteiramente demonstrativa e representa possibilidades para celebrar uma nova fase.",
    instructions:
      "Os links abaixo são exemplos. Nenhuma compra, reserva ou confirmação é realizada neste site.",
    actionLabel: "Ver opção",
    cover: {
      alt: "Composição visual demonstrativa da Lista de presentes",
      tone: "olive",
    },
    items: [
      {
        name: "Uma nova memória",
        description: "Contribuição simbólica para uma experiência especial do casal.",
        reference: "Valor livre — demonstração",
        link: "https://example.com/contribuicao-demonstrativa",
        availability: "Disponível — demonstração",
        image: {
          alt: "Espaço reservado para a imagem demonstrativa do presente",
          tone: "blush",
        },
      },
      {
        name: "Jantar para celebrar",
        description: "Uma sugestão demonstrativa para um momento a dois.",
        reference: "Referência demonstrativa",
        availability: "Disponível — demonstração",
        image: {
          alt: "Espaço reservado para a imagem demonstrativa do presente",
          tone: "olive",
        },
      },
      {
        name: "Detalhe para o novo lar",
        description: "Item simbólico, sem marca ou produto real associado.",
        availability: "Indisponível — demonstração",
        image: {
          alt: "Espaço reservado para a imagem demonstrativa do presente",
          tone: "wine",
        },
      },
    ],
  },
  rsvp: {
    route: "/confirmacao",
    invitationCtaLabel: "Confirmar presença",
    title: "Esperamos por você",
    introduction:
      "Esta confirmação é demonstrativa. Conte para nós se poderá compartilhar este dia especial.",
    closingMessage:
      "Obrigada por responder. Nesta demonstração, sua confirmação fica somente neste navegador.",
    deadline: "Confirme até 20 de abril de 2027 — prazo demonstrativo.",
    fields: {
      fullName: true,
      attendance: true,
      companions: true,
      note: true,
    },
    buttons: {
      submit: "Enviar confirmação",
      edit: "Alterar resposta",
    },
    returnToInvitation: {
      href: "/",
      label: "Voltar ao Site-convite",
    },
  },
  gallery: {
    route: "/galeria",
    publicUrl: "https://example.com/galeria-demonstrativa",
    invitationCtaLabel: "Revisitar nossas memórias",
    title: "Memórias que ficam",
    introduction:
      "Uma galeria demonstrativa para reunir os olhares, os encontros e os pequenos instantes desta celebração.",
    message: "As novas fotografias aparecem aqui automaticamente para todos os convidados.",
    empty: {
      title: "As primeiras memórias chegarão em breve",
      message: "Quando as fotografias forem adicionadas, elas aparecerão aqui para todos revisitarem.",
    },
    share: {
      title: "Compartilhe suas fotos",
      description:
        "Registre este momento pela câmera ou escolha uma fotografia do seu celular para dividir com todos.",
      actionLabel: "Adicionar minha foto",
    },
    returnToInvitation: {
      href: "/",
      label: "Voltar ao Site-convite",
    },
  },
  theme: {
    canvas: "#f7f1e7",
    surface: "#fffaf2",
    ink: "#321f1d",
    muted: "#776a60",
    accent: "#5d1f2b",
    accentContrast: "#fffaf2",
    olive: "#68705a",
    blush: "#c98778",
    gold: "#b39758",
    line: "#d9c9b7",
    footer: "#242722",
  },
  blocks: {
    cover: true,
    opening: true,
    countdown: true,
    details: true,
    timeline: true,
    location: true,
    dressCode: true,
    story: true,
    photoGallery: true,
    confirmation: true,
  },
  labels: {
    brandShort: "MB",
    brandName: "MemoriesBB",
    scrollAction: "Ir para o convite",
    date: "Data",
    time: "Horário",
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
  modules: { invitation: true, gifts: true, rsvp: true, gallery: true },
} satisfies CelebrationConfig;
