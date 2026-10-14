# Loja de Convites Animados

Loja virtual de convites animados com identidade **preta e rosa**, responsiva (mobile first) e com foco em **SEO**.

Stack: Next.js (App Router) · React · TypeScript · CSS Modules.

## Rodando

```bash
npm install
cp .env.example .env.local   
npm run dev                  # http://localhost:3000
npm run build && npm start   # produção
```

## SEO

- Páginas de catálogo, categorias e modelos são **Server Components** (HTML completo para os buscadores).
- `generateMetadata` por modelo e categoria, com `title`, `description`, canonical e Open Graph.
- JSON-LD `Product` nos modelos e `WebSite` na home.
- `sitemap.xml` e `robots.txt` gerados; `/admin`, `/checkout`, `/evento` e `/personalizar` ficam fora do índice.
- Um único `<h1>` por página, trilha de navegação, `lang="pt-BR"`.

## O que é demonstração e o que falta para produção

Esta versão mostra o **fluxo completo**, mas os pedidos ficam no `localStorage` do navegador.

| Funcionalidade | Estado atual | Para produção |
|---|---|---|
| Catálogo, categorias, SEO | Pronto | — |
| Personalização + prévia | Pronto | — |
| Pagamento Pix/cartão | Simulado (código Pix fictício) | Integrar gateway (Mercado Pago, Asaas, Stripe...) com webhook |
| Confirmação antes da liberação | Simulada no painel | Webhook do gateway marca o pedido como pago |
| Vídeo MP4 | Etapa manual no painel | Renderização automática (ex.: Remotion/FFmpeg) em servidor |
| Página do evento + RSVP | Funciona no mesmo navegador | Banco de dados (ex.: Postgres/Supabase) |
| Entrega por WhatsApp/e-mail | Link `wa.me` pronto | E-mail transacional e/ou API oficial do WhatsApp |
| Painel administrativo | Sem login | Autenticação + cadastro/edição de modelos |

## Site feito para fins de construção de portfólio

- [Site](https://loja-convites.vercel.app/)
- [LinkedIn](https://www.linkedin.com/in/leonardo-pacheco-vitorino-01b0052a2/?isSelfProfile=true)
- [99freelas](https://www.99freelas.com.br/user/LeoVit)
