# MemoriesBB Celebrações

Base reutilizável em Next.js, TypeScript, App Router e Tailwind para experiências digitais de celebração.

## Arquitetura

- `src/app`: rotas, layout global e estilos/tokens.
- `src/components/ui`: componentes-base neutros e reutilizáveis.
- `src/content/celebration.ts`: conteúdo e recursos ativos da celebração.
- `public/images/celebrations/<slug>`: fotos de cada celebração (quando adicionadas).

## Módulos

1. `invitation`: site-convite com história, data e local.
2. `gifts`: lista de presentes.
3. `rsvp`: confirmação de presença.
4. `gallery`: galeria compartilhada.

## Reutilização

Cada nova celebração deve ser criada principalmente pela troca do arquivo de configuração tipado. Componentes não devem conter nomes, datas, links ou caminhos de fotos fixos. Módulos devem respeitar as flags de `modules`, e novas exceções visuais devem primeiro virar tokens ou variantes reutilizáveis.
