import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { celebration } from "@/content/celebration";

export default function Home() {
  return (
    <main>
      <Section className="min-h-screen">
        <Container className="flex min-h-[calc(100vh-8rem)] items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-muted uppercase">
              MemoriesBB Celebrações
            </p>
            <h1 className="font-display text-5xl leading-tight sm:text-7xl">
              Fundação pronta para {celebration.names.join(" & ")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              A experiência completa será construída a partir da configuração tipada da celebração.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
