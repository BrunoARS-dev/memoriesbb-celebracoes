export function SectionTitle({ children, light = false }: { children: string; light?: boolean }) {
  return <h2 className={`section-title ${light ? "section-title-light" : ""}`}>{children}</h2>;
}
