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

Cada serviço é uma experiência e uma página independente, vendida isoladamente ou conectada às demais. O Site-convite usa `/`; Lista de presentes, RSVP e Galeria compartilhada usam as rotas definidas em suas configurações. Os CTAs no convite são opcionais e só aparecem quando seus módulos estão ativos e seus rótulos configurados. O RSVP terá uma segunda etapa para persistir respostas e permitir consulta pela MemoriesBB.

## Galeria compartilhada

A página pública usa `celebration.gallery.route`; o QR Code administrativo usa a URL explícita em `celebration.gallery.publicUrl`. Para cada instalação, convidados enviam JPEG, PNG ou WebP de até 10 MB; o servidor valida, redimensiona e publica versões WebP na galeria. SQLite e uploads ficam em caminhos persistentes configurados por ambiente. A gestão não linkada em `/gestao/galeria` exige `GALLERY_ADMIN_PASSWORD` e permite baixar o QR Code e excluir fotos. Este MVP atende um único evento por instalação e não inclui nuvem, moderação prévia ou login de convidados.

Para executar localmente, copie `.env.example` para `.env.local`, defina uma senha com pelo menos 12 caracteres e rode `npm install` seguido de `npm run dev`. Variáveis disponíveis: `GALLERY_DATA_DIR`, `GALLERY_DATABASE_PATH`, `GALLERY_UPLOAD_DIR` e `GALLERY_ADMIN_PASSWORD`.

## Produção com Docker e Caddy

Copie `.env.example` para `.env`, defina `GALLERY_ADMIN_PASSWORD` e execute `docker compose up -d --build`. O container sempre inicia com `next start` em `0.0.0.0:3000`; o Compose publica a porta somente em `127.0.0.1:${APP_PORT:-3000}`, para ser acessada pelo Caddy instalado no servidor. Configure o proxy com `reverse_proxy 127.0.0.1:3000` (ou a porta escolhida em `APP_PORT`) e use HTTPS no domínio real da celebração.

O volume nomeado `memoriesbb-celebracoes-data` é montado em `/data`. Ele preserva `gallery.sqlite`, seus arquivos auxiliares WAL/SHM e a pasta `/data/uploads` entre atualizações e recriações do container. Não remova esse volume durante deploys. Para backup, pare brevemente a aplicação ou use uma rotina compatível com SQLite e copie todo o conteúdo do volume. Cada celebração deve ter sua própria implantação, senha, URL pública em `celebration.gallery.publicUrl` e volume persistente.
