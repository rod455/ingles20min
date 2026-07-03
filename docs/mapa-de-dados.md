# Vocaboost — Mapa da Operação de Dados

Fontes para plugar no fluxo **Analista Diário (Growth)** do n8n.
Para cada uma: o que entrega, o que o Rodrigo precisa trazer, e prioridade.

Estado atual: ✅ = já conectado · 🔑 = falta credencial/config do Rodrigo

---

## ✅ JÁ CONECTADAS (Fase 1)

### 1. Supabase (banco próprio)
- **Entrega:** leads por dia e origem (form da LP × entrada no grupo), total de leads,
  quem entrou no grupo, cupons DESTRAVA20 entregues, mensagens do funil enviadas,
  dia do ciclo, snapshots diários (deltas dia a dia).
- **Status:** ✅ rodando no report das 21h.

### 2. Evolution API (WhatsApp)
- **Entrega:** nº de membros do grupo grátis e Premium (crescimento diário),
  entradas no grupo em tempo real (captura de leads).
- **Status:** ✅ rodando.
- **Upgrade possível (eu faço, sem credencial):** registrar **saídas** do grupo
  (churn do grátis) e **votos das enquetes** (engajamento) — hoje só registramos entradas.

---

## 🔴 PRIORIDADE 0 — sem isso o report não vê dinheiro nem tráfego

### 3. Hotmart (receita, assinaturas, churn) — A MAIS IMPORTANTE
- **Entrega:** vendas do dia, receita, MRR, assinaturas ativas, cancelamentos,
  reembolsos, taxa de conversão real do funil (lead → venda).
- **O que trazer (2 coisas):**
  1. **Webhook (grátis, 5 min):** painel Hotmart → Ferramentas → Webhook (Postback) →
     cadastrar a URL `https://n8n.vocaboost.com.br/webhook/mp-active`
     marcando eventos de **compra aprovada, cancelamento, reembolso, chargeback**.
     *Isso também destrava a entrada automática do comprador no grupo Premium, que já está pronta esperando.*
  2. **API (para o report diário):** painel Hotmart → Ferramentas → **Credenciais de API (Developers)** →
     criar credencial e me mandar **Client ID + Client Secret + Basic Token**.
- **O que eu faço com isso:** nó "Hotmart: vendas do dia" no coletor + métricas de
  receita/churn no report + agente de Receita.

### 4. Google Analytics 4 (tráfego da LP)
- **Entrega:** visitas/dia, origem (Google, Insta, direto...), páginas vistas,
  taxa de conversão visita→lead, dispositivos, cidades.
- **O que trazer:**
  1. Criar propriedade GA4 em analytics.google.com → me mandar o **ID `G-XXXXXXX`**
     (eu instalo na LP no mesmo dia).
  2. No n8n: autorizar a credencial **Google Analytics OAuth** (2 cliques, igual fez
     com Sheets/Drive) — eu te aviso quando o nó estiver criado pedindo autorização.
- **O que eu faço:** tag na LP + nó GA4 no coletor → o agente MKT passa a ver
  visita→lead (a taxa mais importante do topo do funil).

---

## 🟠 PRIORIDADE 1 — custo de mídia e visão rápida

### 5. Google Ads (custo, CPC, CPA das campanhas)
- **Entrega:** gasto/dia por campanha, custo por lead, custo por venda (ROAS
  quando cruzado com Hotmart).
- **O que trazer — escolha o caminho:**
  - **Fácil (recomendo):** vincular Ads ↔ GA4 (Analytics → Administrador →
    Vinculações de produto → Google Ads). Custo e campanha entram via GA4, sem API extra.
  - **Completo:** Google Ads API (developer token em nível básico + OAuth) —
    burocrático, só vale se quiser gestão de lance/orçamento automatizada depois.

### 6. Vercel Analytics (visitas sem cookies)
- **Entrega:** pageviews, países, dispositivos, páginas — visão rápida e à prova de adblock.
- **O que trazer:** painel Vercel → projeto `ingles20min` → aba **Analytics** → **Enable**.
  Me avisa que eu instalo o pacote no site (5 min).

### 7. Microsoft Clarity (comportamento na página — grátis)
- **Entrega:** mapas de calor, gravações de sessão, raiva-clicks, % de scroll —
  ouro pro agente de Copy ("as pessoas nem chegam na seção de planos").
- **O que trazer:** criar projeto em clarity.microsoft.com → me mandar o **Project ID**
  (eu instalo o script na LP). A API de export é opcional depois.

---

## 🟡 PRIORIDADE 2 — quando a operação crescer

### 8. Meta Ads (se anunciar no Instagram/Facebook)
- **O que trazer:** token da Marketing API (Business Manager → apps) — me avisa se/quando começar a anunciar lá.

### 9. Google Search Console (SEO)
- **Entrega:** impressões e cliques no Google, palavras que trazem gente.
- **O que trazer:** verificar o domínio no Search Console + autorizar credencial Google no n8n (mesmo fluxo do GA4).

### 10. Redes sociais orgânicas (YouTube/Instagram/TikTok)
- **Entrega:** alcance de conteúdo → correlação com picos de leads.
- **O que trazer:** só quando fizer sentido — cada uma tem sua API (YouTube Data API é a mais simples).

---

## Como cada fonte entra no fluxo

```
┌─ Supabase ──────────┐
├─ Evolution/WhatsApp ┤
├─ Hotmart 🔑 ────────┤      ┌─ Agente MKT (aquisição + custo)
├─ GA4 🔑 ────────────┼──►  Coletor 21h ──► ├─ Agente Copy (BeSci + Clarity)
├─ Google Ads 🔑 ─────┤      ├─ Agente Jornada (funil ponta a ponta)
├─ Vercel 🔑 ─────────┤      └─ Agente Receita (Hotmart/MRR) [novo]
└─ Clarity 🔑 ────────┘              │
                              Head de Growth ──► 📱 Report WhatsApp 21h
```

## Ordem sugerida de conexão
1. **Hotmart webhook** (5 min, destrava Premium automático + é pré-requisito de receita)
2. **Hotmart API** (report vê dinheiro)
3. **GA4** (report vê tráfego)
4. **Vincular Ads↔GA4** (report vê custo)
5. **Vercel Analytics + Clarity** (visão de comportamento)
6. O resto conforme a operação pedir
