import { saveTheDate } from "@/content/save-the-date";

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

// RFC 5545: fold lines by UTF-8 octets, without splitting accented characters.
function foldLine(line: string) {
  let result = "";
  let length = 0;
  for (const character of line) {
    const bytes = Buffer.byteLength(character, "utf8");
    if (length + bytes > 75) { result += "\r\n "; length = 1; }
    result += character;
    length += bytes;
  }
  return result;
}

export function GET(request: Request) {
  const date = saveTheDate.date.replaceAll("-", "");
  const start = new Date(saveTheDate.countdownTarget).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  const title = `${saveTheDate.names.join(" & ")} — Save the date`;
  const description = `${saveTheDate.invitation}\n${saveTheDate.travelMessage}\n${saveTheDate.closing}`;
  // Preserve the iOS calendar flow; desktop and Android open the event editor.
  // An explicit format still allows downloading an ICS on any platform.
  const downloadICS = new URL(request.url).searchParams.get("format") === "ics";
  const ios = /iPhone|iPad|iPod/i.test(request.headers.get("user-agent") ?? "");
  const responseHeaders = { "Cache-Control": "private, no-store", Vary: "User-Agent" };
  if (!ios && !downloadICS) {
    // Android's Calendar app can open /r/eventedit without the event draft.
    // The template endpoint preserves the prefilled fields in the app handoff.
    const url = new URL("https://calendar.google.com/calendar/render");
    url.search = new URLSearchParams({
      action: "TEMPLATE",
      text: title,
      // No end time has been announced; do not invent an event duration.
      dates: `${start}/${start}`,
      ctz: saveTheDate.timeZone,
      location: saveTheDate.location,
      details: description,
    }).toString();
    return new Response(null, { status: 302, headers: { ...responseHeaders, Location: url.toString() } });
  }
  const calendar = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Memories BB//Save the Date//PT-BR", "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT", `UID:save-the-date-${date}@memoriesbb`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z")}`,
    `DTSTART:${start}`,
    `SUMMARY:${escapeText(title)}`,
    `LOCATION:${escapeText(saveTheDate.location)}`,
    `DESCRIPTION:${escapeText(description)}`,
    "TRANSP:TRANSPARENT", "END:VEVENT", "END:VCALENDAR",
  ].map(foldLine).join("\r\n") + "\r\n";
  return new Response(calendar, { headers: { ...responseHeaders, "Content-Type": "text/calendar; charset=utf-8", "Content-Disposition": 'attachment; filename="bia-e-bruno-save-the-date.ics"' } });
}
