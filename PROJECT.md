# MemoriesBB Celebrações

Base reutilizável em Next.js, TypeScript, App Router e Tailwind para experiências digitais de celebração.

## Arquitetura

- `src/content/celebration.ts`: única fonte de conteúdo, fotos, links, paleta e blocos ativos.
- `src/app`: composição da página, metadados e tokens visuais.
- `src/components`: componentes neutros, sem dados fixos de uma celebração.
- `public/images/celebrations/<slug>`: arquivos locais de cada celebração.

## Criar uma celebração

Duplique e edite somente o objeto `celebration` em `src/content/celebration.ts`: troque nomes, data, local, textos, links e fotos; ajuste `theme` se quiser outra paleta; ative ou desative seções em `blocks`. Dados opcionais ausentes não são renderizados. Não coloque conteúdo específico dentro dos componentes.

## Produtos

Cada serviço é uma experiência e uma página independente, vendida isoladamente ou conectada às demais. O Site-convite usa `/`; a Lista de presentes usa a rota definida em `celebration.gifts.route` (exemplo: `/presentes`). Para ativá-la, preencha `gifts.items` e defina `modules.gifts` como `true`. O convite só mostra seu CTA quando `gifts.invitationCtaLabel` também estiver configurado. `rsvp` e `gallery` continuam reservados e desativados.
