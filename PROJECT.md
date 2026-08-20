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

`invitation` é o único módulo implementado. `gifts`, `rsvp` e `gallery` estão reservados para lista de presentes, confirmação de presença e galeria compartilhada; devem permanecer desativados até serem implementados. O bloco `confirmation` do convite é apenas um link externo configurável, e `photoGallery` é uma galeria estática.
