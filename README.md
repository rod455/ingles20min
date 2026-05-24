# Vocaboost

Landing page + checkout de assinaturas para o **Vocaboost** — aprenda inglês com
lições diárias (de segunda a sexta) num grupo de WhatsApp, em um modelo contínuo,
com acesso a um professor para tirar dúvidas.

Construído com **Next.js (App Router) + Tailwind CSS**, pronto para deploy no **Vercel**.

## O que já está pronto

- 🎯 **Landing page** completa e responsiva (hero, benefícios, como funciona,
  depoimentos, planos, FAQ e CTAs).
- 💳 **Checkout de assinaturas via Mercado Pago** (`/checkout?plan=monthly|yearly`)
  usando a API de _preapproval_ (Pix, cartão e boleto). Planos:
  - Mensal — **R$ 49,90/mês**
  - Anual — **R$ 299,90/ano** (~R$ 24,99/mês, ~50% de economia)
- 🗄️ **Persistência no Supabase**: cada lead é salvo no checkout (tabela
  `subscribers`) e marcado como `active` quando o pagamento é confirmado.
- 🔔 **Webhook do Mercado Pago** (`/api/webhooks/mercadopago`) que confirma o
  status e está preparado para acionar a automação do WhatsApp.

## Estrutura

```
app/
  page.tsx                       Landing page
  checkout/page.tsx              Captura de e-mail + plano
  sucesso/page.tsx              Página pós-pagamento
  api/checkout/route.ts          Cria a assinatura no Mercado Pago
  api/webhooks/mercadopago/route.ts  Recebe notificações de pagamento
components/                      Seções da LP e formulário de checkout
lib/
  plans.ts                       Planos e preços (fonte única da verdade)
  mercadopago.ts                 Integração com a API do Mercado Pago
  supabase.ts                    Cliente server-side (service role)
```

## Como rodar localmente

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev
```

Acesse http://localhost:3000.

> A LP funciona sem nenhuma credencial. O checkout captura o lead no Supabase
> (se configurado) e só redireciona para o pagamento quando `MP_ACCESS_TOKEN`
> estiver definido.

## Variáveis de ambiente

Veja `.env.example`. As principais:

| Variável | Para quê |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio do site (back_urls do Mercado Pago) |
| `MP_ACCESS_TOKEN` | Access Token do Mercado Pago (teste ou produção) |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Chave service_role (secreta, só no servidor) |
| `N8N_WEBHOOK_URL` | (futuro) Webhook do N8N para automação do WhatsApp |

## Deploy no Vercel

1. Suba o repositório para o GitHub (branch `claude/cool-mayer-0PJm6`).
2. No Vercel, **Add New Project** → importe o repositório.
3. Em **Environment Variables**, adicione as variáveis do `.env.example`.
4. Deploy. O Vercel detecta o Next.js automaticamente.
5. Defina `NEXT_PUBLIC_SITE_URL` com o domínio final e configure o webhook no
   painel do Mercado Pago apontando para `https://SEU_DOMINIO/api/webhooks/mercadopago`.

## Próximos passos (automação WhatsApp)

O webhook já entrega o evento `subscription_active` para `N8N_WEBHOOK_URL`. O
fluxo planejado:

```
Mercado Pago → /api/webhooks/mercadopago → N8N → Evolution API → adiciona ao grupo
```

No N8N, crie um workflow com um nó **Webhook** (recebe o payload), e um nó
**HTTP Request** chamando a Evolution API para adicionar o número/contato ao
grupo do WhatsApp. O payload enviado contém: `event`, `subscriptionId`,
`email`, `externalReference` e `amount`.
```
