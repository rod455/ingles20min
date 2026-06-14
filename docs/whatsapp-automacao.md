# Automação de WhatsApp — Vocaboost

Este documento descreve a arquitetura dos **dois funis de WhatsApp** e como
colocá-los no ar com **n8n + Evolution API**.

## Visão geral

```
                          ┌──────────────────────────┐
   LP "Comece grátis" ───▶│  /api/free-signup         │──▶ Supabase (leads)
   (captura WhatsApp)      │  + N8N_FREE_WEBHOOK_URL    │──▶ n8n: Funil Grátis
                          └──────────────────────────┘
   Anúncio (link direto) ─────────────────────────────▶ Grupo Grátis (convite)

   Checkout pago ──▶ Mercado Pago ──▶ /api/webhooks/mercadopago
                                          │ N8N_WEBHOOK_URL
                                          ▼
                                   n8n: Grupo Premium ──▶ Evolution API
```

Temos **dois grupos reais** de WhatsApp:

| Grupo | Objetivo | Conteúdo |
| --- | --- | --- |
| **Vocaboost Grátis** | Converter leads para o plano pago | Ciclo semanal: 3 lições em 5 dias + mensagens de upsell para o checkout |
| **Vocaboost Premium** | Entregar o produto pago | 1 lição por dia (seg–sex), puxada do Google Drive, + upsell de aulas particulares |

> **Modelo de drip:** como são grupos reais e compartilhados, o envio é por
> **coorte** (todos recebem no mesmo horário). O funil grátis roda em um
> **ciclo semanal que se repete**, então quem entra a qualquer momento pega um
> ciclo completo de 3 lições em poucos dias.

---

## 1. Subir a Evolution API

A Evolution API é um gateway open-source que controla um número de WhatsApp e
expõe uma API HTTP (é isso que o n8n vai chamar para enviar mensagens).

### Opção recomendada: Docker (stack completo v2)

A Evolution API v2 precisa de **Postgres** e **Redis**. Salve como
`evolution/docker-compose.yml`:

```yaml
services:
  evolution-api:
    image: evoapicloud/evolution-api:v2.3.7
    ports:
      - "8080:8080"
    environment:
      - SERVER_URL=http://localhost:8080
      - AUTHENTICATION_API_KEY=COLOQUE_UMA_CHAVE_FORTE_AQUI
      - DEL_INSTANCE=false
      - DATABASE_ENABLED=true
      - DATABASE_PROVIDER=postgresql
      - DATABASE_CONNECTION_URI=postgresql://evolution:evolution@postgres:5432/evolution
      - DATABASE_SAVE_DATA_INSTANCE=true
      - DATABASE_SAVE_DATA_NEW_MESSAGE=false
      - DATABASE_SAVE_MESSAGE_UPDATE=false
      - DATABASE_SAVE_DATA_CONTACTS=true
      - DATABASE_SAVE_DATA_CHATS=true
      - CACHE_REDIS_ENABLED=true
      - CACHE_REDIS_URI=redis://redis:6379/6
      - CACHE_REDIS_PREFIX_KEY=evolution
      - CACHE_LOCAL_ENABLED=false
    depends_on:
      - postgres
      - redis
    volumes:
      - evolution_instances:/evolution/instances
    restart: always

  postgres:
    image: postgres:16
    environment:
      - POSTGRES_USER=evolution
      - POSTGRES_PASSWORD=evolution
      - POSTGRES_DB=evolution
    volumes:
      - evolution_pg:/var/lib/postgresql/data
    restart: always

  redis:
    image: redis:7
    volumes:
      - evolution_redis:/data
    restart: always

volumes:
  evolution_instances:
  evolution_pg:
  evolution_redis:
```

```bash
cd evolution && docker compose up -d
```

Confirme em `http://localhost:8080` (deve responder com a versão da API) e abra o
painel em `http://localhost:8080/manager`.

> **Produção:** numa VPS com domínio + HTTPS, troque `SERVER_URL` para
> `https://evo.seudominio.com` e exponha a porta atrás de um proxy (Caddy/Nginx).

### Como o n8n alcança a Evolution

O seu n8n também roda em Docker. No nó **Config** dos workflows, use:

- Mesma máquina, containers separados: `EVOLUTION_URL = http://host.docker.internal:8080`
- Se colocar n8n e Evolution na **mesma** rede Docker: `EVOLUTION_URL = http://evolution-api:8080`

(Não use `http://localhost:8080` dentro do n8n — para o container, `localhost` é
ele mesmo, não a Evolution.)

### Conectar o número

1. Crie uma instância (ou faça pelo painel `/manager`):
   ```bash
   curl -X POST http://localhost:8080/instance/create \
     -H "apikey: SUA_API_KEY" -H "Content-Type: application/json" \
     -d '{"instanceName":"vocaboost","integration":"WHATSAPP-BAILEYS"}'
   ```
2. Pegue o QR Code (`GET http://localhost:8080/instance/connect/vocaboost`, ou pelo
   painel) e escaneie com o WhatsApp do número que vai administrar os grupos.

### Descobrir o JID dos grupos

Crie os dois grupos no WhatsApp pelo número conectado e liste-os:

```bash
curl "http://localhost:8080/group/fetchAllGroups/vocaboost?getParticipants=false" \
  -H "apikey: SUA_API_KEY"
```

Anote os `id` (formato `XXXXXXXXXXXX@g.us`) dos grupos **Grátis** e **Premium**.
Eles vão nas variáveis `GROUP_JID_FREE` e `GROUP_JID_PREMIUM` do n8n.

### Teste rápido de envio

```bash
curl -X POST "http://localhost:8080/message/sendText/vocaboost" \
  -H "apikey: SUA_API_KEY" -H "Content-Type: application/json" \
  -d '{"number":"<GROUP_JID_OU_NUMERO>","text":"Teste do Vocaboost ✅"}'
```

### Endpoints usados pelos workflows

- **Texto:** `POST /message/sendText/{instance}` → `{ "number": "<JID>", "text": "..." }`
- **Mídia:** `POST /message/sendMedia/{instance}` → `{ "number": "<JID>", "mediatype": "image|video|document", "media": "<url>", "caption": "..." }`
- **Participantes:** `GET /group/participants/{instance}?groupJid=<JID>`
- **Remover:** `POST /group/updateParticipant/{instance}?groupJid=<JID>` → `{ "action": "remove", "participants": ["<num>@s.whatsapp.net"] }`
- Header em todas: `apikey: SUA_API_KEY`

### Solução de problemas (testado na prática)

**A instância fica presa em `connecting` e nunca gera o QR (`qrcode.count: 0`)**
- Causa: versão antiga da imagem (ex.: `atendai/evolution-api:v2.1.1`) tem um bug
  de geração de QR e/ou a versão do WhatsApp Web embutida está obsoleta. Nos logs
  aparece um loop a cada poucos segundos: `Browser... / Baileys version env... /
  Group Ignore`, sem nunca emitir o QR.
- Correção: use a imagem nova **`evoapicloud/evolution-api:v2.3.7`** (o repositório
  `atendai` foi descontinuado). A v2.3 já gerencia a versão do WhatsApp Web
  sozinha. Depois de trocar a imagem: `docker compose pull && docker compose up -d
  --force-recreate`, e confirme no log `v2.3.7` + `HTTP - ON: 8080`.
- Em versões 2.1.x, como paliativo dava para fixar
  `CONFIG_SESSION_PHONE_VERSION=2.3000.1020885143`, mas na v2.3.7 isso é
  desnecessário (e a variável é considerada *deprecated*).

**O QR aparece, mas o celular diz "Não é possível conectar novos dispositivos no
momento" / "não foi possível conectar mais dispositivos"**
- Não é problema da Evolution — é restrição do **WhatsApp**:
  - Limite de aparelhos vinculados (máx. ~4): remova os antigos em
    *WhatsApp → Aparelhos conectados*.
  - Bloqueio temporário anti-spam por muitas tentativas de vínculo em pouco tempo:
    pare de tentar, espere de 2h a 24h e escaneie **uma única vez**.
- Recomendação: use um **número/chip dedicado** ao negócio, nunca o pessoal.

**Puxar o QR pelo terminal (quando o painel não renderiza)** — PowerShell:
```powershell
$h = @{ apikey = "SUA_API_KEY" }
$r = Invoke-RestMethod -Uri "http://localhost:8080/instance/connect/vocaboost" -Headers $h
"<img src='$($r.base64)' style='width:340px'>" | Set-Content qr.html; Start-Process qr.html
```

> **Alternativa oficial:** dá para trocar a Evolution pela Cloud API da Meta ou
> Twilio. Nesse caso só muda o nó HTTP de envio nos workflows; o resto da
> arquitetura (Supabase + agendamentos) continua igual.

---

## 2. Importar os workflows no n8n

Os workflows estão em [`n8n/`](../n8n):

- `n8n/vocaboost-free-funnel.json` — Funil Grátis
- `n8n/vocaboost-premium-daily.json` — Grupo Premium
- `n8n/vocaboost-group-sentinel.json` — Sentinela (remove não pagantes do grupo)

No n8n: **Workflows → Import from File** e selecione cada JSON.

Cada workflow começa com um nó **"Config"** (tipo *Set*). Preencha lá:

| Variável | Valor |
| --- | --- |
| `EVOLUTION_URL` | ex.: `https://evo.seudominio.com` |
| `EVOLUTION_INSTANCE` | `vocaboost` |
| `EVOLUTION_APIKEY` | sua API key da Evolution |
| `GROUP_JID_FREE` | JID do grupo grátis (`...@g.us`) |
| `GROUP_JID_PREMIUM` | JID do grupo premium (`...@g.us`) |
| `CHECKOUT_URL` | `https://SEU_SITE/checkout?plan=monthly` |
| `PRIVATE_CLASS_URL` | link/WhatsApp para aulas particulares |
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_SERVICE_KEY` | service_role key (para gravar logs/estado) |

> Dica: em vez de digitar em cada workflow, dá para usar **Variáveis** do n8n
> (Settings → Variables) e referenciar com `{{$vars.EVOLUTION_URL}}`. O nó
> "Config" já deixa isso fácil de trocar.

### Webhooks do site → n8n

Depois de ativar os workflows, o n8n gera as URLs dos nós **Webhook**. Coloque-as
no `.env` do site (e no Vercel):

- `N8N_FREE_WEBHOOK_URL` → URL do webhook do workflow **Funil Grátis**
- `N8N_WEBHOOK_URL` → URL do webhook do workflow **Premium** (assinatura paga)
- `N8N_WEBHOOK_SECRET` → mesmo segredo configurado no nó de validação do n8n

---

## 3. Funil Grátis — ciclo semanal

O agendador roda todo dia útil (09:00 por padrão) e o nó **Compose** decide a
mensagem do dia:

| Dia | Mensagem |
| --- | --- |
| Segunda | 📘 Lição 1 |
| Terça | 💬 Upsell leve (benefício + link) |
| Quarta | 📗 Lição 2 |
| Quinta | 💬 Upsell (prova social + link) |
| Sexta | 📕 Lição 3 + oferta para assinar o Premium |
| Sáb/Dom | (nada) |

As lições e textos de upsell ficam **dentro do nó Compose** (Code) — edite lá o
conteúdo. O nó **Webhook (free_signup)** ainda manda, opcionalmente, uma
mensagem de boas-vindas individual com o convite do grupo.

## 4. Grupo Premium — lição diária do Google Drive

1. Crie no Drive uma pasta **"Vocaboost / Premium"** com as lições **numeradas**
   na ordem de envio (ex.: `01 - ...`, `02 - ...`). Coloque o ID da pasta em
   `DRIVE_FOLDER_ID`.
2. O agendador roda seg–sex (08:00). O workflow lê o ponteiro `drip_state` no
   Supabase, baixa a próxima lição da pasta, posta no grupo Premium e incrementa
   o ponteiro.
3. Um segundo agendador (quinzenal) posta o **upsell de aulas particulares**.

> Lições em **Google Docs** são exportadas como texto; arquivos de **áudio/vídeo/
> PDF** são enviados como mídia via `sendMedia` usando o link do Drive.

## 5. Sentinela — remover infiltrados do grupo pago

Como o checkout agora captura o **WhatsApp** do pagante (salvo em
`subscribers.whatsapp`), dá para garantir que só quem pagou fica no grupo Premium.

O workflow `vocaboost-group-sentinel.json` roda diariamente e:

1. Lê os participantes do grupo na Evolution (`GET /group/participants`).
2. Busca no Supabase os assinantes com `status = active` e seus telefones.
3. Compara pelos **últimos 11 dígitos** (tolera o `55` e o nono dígito).
4. Quem está no grupo mas **não** é pagante (nem admin) entra na lista de remoção
   (`POST /group/updateParticipant` com `action: remove`).

> ⚠️ **Segurança:** o nó *Config* vem com `DRY_RUN = true` — ele só **lista** os
> infiltrados, sem remover ninguém. Rode algumas vezes, confira o resultado no
> output do nó *Identificar infiltrados* e, quando confiar, mude `DRY_RUN` para
> `false`. Coloque os números de admin/professor em `ADMIN_WHATSAPPS` (separados
> por vírgula) para nunca removê-los.

---

## Variáveis de ambiente do site (resumo)

```
NEXT_PUBLIC_FREE_GROUP_URL=https://chat.whatsapp.com/XXXX   # convite do grupo grátis
N8N_FREE_WEBHOOK_URL=https://n8n.seudominio.com/webhook/free-signup
N8N_WEBHOOK_URL=https://n8n.seudominio.com/webhook/mp-active
N8N_WEBHOOK_SECRET=um-segredo-forte
```
