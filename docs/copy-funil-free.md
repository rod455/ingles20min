# Modelo de copy — Funil Grátis (com gatilhos de Behavioral Science)

Modelo para preencher a planilha **VocaboostCopy** (aba lida pelo n8n).
Colunas: `funil` (= `free`), `dia` (`boasvindas`, `1`…`6`), `horario` (`manha`,
`tarde`, `noite`), `texto`.

## Como o funil envia (importante)
- **Manhã, dias 1–4:** envia a **lição em mídia** (vídeo/áudio/PDF do Drive). O
  texto da planilha nesses slots é ignorado — o conteúdo é o arquivo.
- **Tarde e noite (todos os dias) + manhã dias 5–6:** envia **texto** da planilha.
- A cada volta o ciclo reinicia (dia 6 → dia 1), então as mensagens devem
  funcionar "evergreen" (sem data fixa no texto — use o placeholder de prazo).

## Placeholders disponíveis
`{nome}` · `{convite}` (link do grupo) · `{checkout}` (link de pagamento) ·
`{from}` (= R$ 89,90) · `{to}` (= R$ 49,90)

---

## O arco (de degustação a decisão)

| Dia | Gatilho BeSci | Objetivo da comunicação |
|-----|---------------|--------------------------|
| **boasvindas** | Endowed progress + Implementation intention | "Você já começou (passo 1/5)" + pedir o horário de estudo |
| **1** | Early win | Primeira vitória rápida: "hoje você já fala X" |
| **2** | Social proof | Mostrar a comunidade / um comentário de aluno |
| **3** | Goal-gradient | "Você já está na metade" — manter a sequência |
| **4** | Consistency + abertura da oferta | Lembrar a promessa do dia 1 e abrir a condição |
| **5** | Scarcity + Loss aversion | Prazo real da condição (último dia) |
| **6** | Fresh start | "Novo ciclo recomeça" + reforço final da oferta |

---

## Textos sugeridos (cole na planilha)

> Dica: mantenha *negrito do WhatsApp* (com `*asterisco*`) só no que importa.

### Dia 1
- **tarde** — *(reforço da lição da manhã, micro-commitment)*
  `Conseguiu fazer a lição de hoje? 💪 Responde aqui com um ✅ — marcar presença ajuda o hábito a colar. Amanhã tem mais.`
- **noite** — *(identidade + antecipação)*
  `Mais um dia em que você escolheu evoluir. 👏 Quem aparece todo dia é quem destrava o inglês. Amanhã, 1 expressão nova que brasileiro adora errar 👀`

### Dia 2
- **tarde** — *(social proof)*
  `A galera do grupo tá mandando bem 🔥 Solta aqui no grupo: qual palavra nova você já usou hoje? Ver os outros ajuda (e te puxa pra frente).`
- **noite** — *(consistency)*
  `2 dias seguidos? Você já está construindo o hábito que 90% desiste de tentar. Bora pro dia 3 amanhã. 🚀`

### Dia 3
- **tarde** — *(goal-gradient)*
  `Você já passou da metade da primeira semana 📈 Sente como fica mais fácil quando é pouco, mas todo dia? Segura o ritmo.`
- **noite** — *(prova + teaser da oferta)*
  `Quem segue firme começa a pensar: "e se eu fosse mais fundo?" 😏 Amanhã eu te conto uma condição que só existe pra quem está aqui no grupo.`

### Dia 4 — abre a oferta
- **tarde** — *(consistency + ancoragem)*
  `Promessa do começo: quem está no grupo grátis tem uma condição especial pra ir além. 🎁\nO Premium (lição diária *com correção de professor* + comunidade) sai de ~{from}~ por *{to}/mês*.`
- **noite** — *(loss aversion leve + CTA)*
  `Cada semana sem praticar é vocabulário que não entra. Se quiser destravar de vez com acompanhamento: {checkout}\nQualquer dúvida, é só me chamar. 🙌`

### Dia 5 — último dia da condição
- **tarde** — *(scarcity real — ajuste o prazo)*
  `⚠️ A condição de *{to}/mês* (em vez de {from}) vai até *hoje à noite* pra quem está no grupo grátis. Garante a sua: {checkout}`
- **noite** — *(loss aversion + risk reversal)*
  `Última chamada de hoje ⏳ Você não perde nada por testar — cancela quando quiser. O que perde é mais uma semana no mesmo lugar. {checkout}`

### Dia 6 — recomeço
- **manha** — *(fresh start)*
  `Novo ciclo começando 🔁 Bom momento pra decidir: mais uma semana só de degustação, ou ir pro Premium e ter correção de verdade? {checkout}`
- **tarde** — *(social proof de fechamento)*
  `Quem entrou no Premium tá recebendo lição com feedback do professor todo dia. Se quiser entrar nessa: {checkout}`
- **noite** — *(reforço suave)*
  `Seja no grátis ou no Premium, o importante é não parar. 👊 Te vejo amanhã com mais inglês. (E a condição de {to} segue valendo pra quem decidir: {checkout})`

---

## Princípios para qualquer mensagem nova
1. **Uma ação por mensagem** (responder, clicar, fazer a lição). Nunca duas.
2. **Termine com pergunta/CTA de 1 toque** — resposta = engajamento = melhor entrega no WhatsApp.
3. **Identidade > esforço**: "você é alguém que estuda todo dia", não "estude mais".
4. **Prova concreta > genérica**: número/horário/nome real convence mais.
5. **Prazo real**: só use escassez verdadeira (a condição precisa mesmo acabar).
