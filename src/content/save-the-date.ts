import { celebration } from "./celebration";
import { weddingDate } from "./wedding-date";

export const saveTheDate = {
  names: celebration.names,
  ...weddingDate,
  title: "Save the date",
  invitation: "Reserve esse dia para celebrar com a gente.",
  travelMessage: "Se você vem de longe, já pode se organizar e planejar suas passagens. Queremos ter todos por perto para viver esse momento juntos!",
  closing: "Em breve, compartilharemos mais detalhes.",
  calendarAction: "Reservar na agenda",
} as const;
