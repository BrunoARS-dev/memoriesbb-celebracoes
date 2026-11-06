import { celebration } from "./celebration";
import { weddingDate } from "./wedding-date";

// Fonte principal: Al_Mare_Brand_Book_Conceito_e_Linha_Editorial.docx.
// Campos entre colchetes são intencionalmente editáveis; não representam dados reais.
export const alMare = {
  names: celebration.names,
  date: weddingDate.displayDate,
  dateISO: weddingDate.countdownTarget,
  city: weddingDate.location,
  invitation: "[Mensagem do casal]",
  story: "[A história do casal]",
  memory: "[Uma memória para compartilhar]",
  couplePhoto: "",
  couplePhotoAlt: "Fotografia do casal",
  dayMessage: "[Mensagem sobre a celebração]",
  time: "[Horário]",
  venue: "[Local da cerimônia]",
  address: "[Endereço]",
  mapURL: "",
  reception: "[Informações da recepção]",
  attire: "[Traje a definir]",
  attireDescription: "[Orientações de vestuário]",
  travelIntroduction: "[Mensagem de boas-vindas à cidade]",
  travel: [
    { title: "Hospedagem", text: "[Sugestões de hospedagem]", detail: "[Informações de reservas]" },
    { title: "Como chegar", text: "[Informações de transporte e traslado]", detail: "[Orientações de chegada ao local]" },
    { title: "Para explorar", text: "[Sugestões de passeios e gastronomia]", detail: "[Recomendações do casal]" },
  ],
  rsvpMessage: "[Mensagem para os convidados]",
  closingMessage: "[Mensagem de agradecimento]",
} as const;
