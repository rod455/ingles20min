# Vocaboost — Copys do Funil Grátis (v2)

Cole na planilha **VocaboostCopy** (coluna `texto`), na linha correspondente
`funil=free` / `dia` / `horario`.

Placeholders preenchidos automaticamente pelo n8n: `{from}`=R$ 89,90 ·
`{to}`=R$ 49,90 · `{checkout}`=link Hotmart · `{convite}`=link do grupo.
Cupom e preço com desconto são fixos no texto (DESTRAVA20 → R$ 39,92).

> ⚠️ Regras importantes:
> - **Tarde = sempre enquete.** Formato: 1ª linha = pergunta; cada opção em uma
>   linha começando com `-`. (Mín. 2 opções, máx. 12.) Sem `*negrito*` nas
>   enquetes (o WhatsApp não formata em poll).
> - Manhã/noite continuam texto normal (pode usar *negrito*).

---

## DIA 1

### free | 1 | tarde  (ENQUETE)
```
Conseguiu fazer a aula de hoje?
- Já fiz, tô dentro! 💪
- Ainda não, mas faço hoje
- Tô com dificuldade, me ajuda
```

---

## DIA 2

### free | 2 | tarde  (ENQUETE)
```
Qual é o seu MAIOR travão no inglês hoje?
- Vocabulário (faltam palavras)
- Escuta (não pego quando falam rápido)
- Medo de falar / vergonha de errar
```

---

## DIA 3

### free | 3 | manha  (texto — corrigido professor → IA)
```
☀️ *Aula 3 de 3 — Destrave a fala em 20 min/dia*

A técnica chama *shadowing*: ouça uma frase curta e repita em voz alta IMITANDO o áudio (ritmo e entonação).

Faça hoje:
1. Pegue 1 frase de uma série/música.
2. Repita 5x junto com o áudio.
3. Grave você falando e compare.

Em 2 semanas seu cérebro começa a "pensar" em inglês.

⚠️ O pulo do gato: fazer isso *todo dia, com o material certo*. Sozinho dá pra começar — com um plano diário e uma *IA que tira sua dúvida na hora*, você avança 3x mais rápido. É o que o Vocaboost faz por você.

👀 Amanhã é dia de *resultados* — e tenho um *aviso importante* pra esse grupo. Fica de olho cedinho.
```

### free | 3 | tarde  (ENQUETE)
```
Como tá sendo seguir as aulas todo dia?
- Tô curtindo, dá pra manter
- Difícil, mas tô conseguindo
- Tô atrasado, preciso retomar
```

---

## DIA 4

### free | 4 | manha  (texto — corrigido professor → IA)
```
☀️ *Dia de resultados — recap das 3 aulas*

Em 3 dias você aprendeu:
✅ Aula 1 — saudações como nativo
✅ Aula 2 — o método dos *blocos prontos* (chunks)
✅ Aula 3 — *shadowing* pra destravar a fala

Se SÓ isso já ajudou... imagina uma aula nova dessas *todo dia*, com áudios e uma *IA pra tirar dúvida* sempre que travar.

Fica no grupo: hoje à noite vem o *aviso* que você esperava. 👀
```

### free | 4 | tarde  (ENQUETE)
```
Se tivesse uma aula nova dessas TODO dia, você ia querer?
- Com certeza, quero!
- Talvez, depende do preço
- Ainda tô só testando
```

### free | 4 | noite  (texto — corrigido professor → IA)
```
🔔 *É AMANHÃ.*

Por *48 horas*, quem está nesse grupo entra no *Vocaboost Premium* por um preço que NÃO vai se repetir:

De ~{from}~ por *{to}*.

Aula nova todo dia + áudios + *chat com IA* pra corrigir e tirar dúvidas na hora.

Amanhã cedo eu abro o link. Deixa o grupo no topo. 📌
```

---

## DIA 5 — gerar interesse no Premium

### free | 5 | manha  (texto — novo)
```
☀️ *Você não "tentou inglês" essa semana. Você ESTUDOU.*

Em 3 aulas você já:
✅ falou suas primeiras frases como nativo
✅ entendeu o método dos *blocos prontos*
✅ aprendeu a destravar a fala com *shadowing*

A maioria nunca passa do "vou começar segunda". Você apareceu todo dia. 👏

Agora imagina isso *todos os dias*: uma aula nova, áudios pra treinar e uma *IA que tira sua dúvida na hora* — quantas vezes precisar.

Isso é o *Vocaboost Premium*. E amanhã eu vou te dar um empurrão que só esse grupo vai ter. 👀
```

### free | 5 | tarde  (ENQUETE)
```
O que mais te faria entrar no Premium?
- O preço com desconto
- Ter a IA pra tirar dúvida na hora
- Aula nova guiada todo dia
- A comunidade pra praticar
```

### free | 5 | noite  (texto — novo, prepara o cupom)
```
🎁 *Amanhã é O dia.*

Só pra esse grupo, eu vou liberar um *cupom exclusivo* de desconto no Premium — válido por *24h*.

Você viu as 3 aulas. Sentiu que o método funciona. Amanhã eu tiro a última desculpa: o preço.

Deixa o grupo *fixado no topo* pra não perder a hora que abrir. ⏰
```

---

## DIA 6 — lançar o cupom DESTRAVA20

### free | 6 | manha  (texto — novo, lança cupom)
```
🚀 *TÁ NO AR: cupom DESTRAVA20 — só hoje*

O Premium custa *{from}*. Pra esse grupo já sai por *{to}*.
E hoje, com o cupom *DESTRAVA20*, você ainda tira *20% OFF*:

💰 *{to}* → *R$ 39,92/mês*

Aula nova todo dia + áudios + *chat com IA pra tirar dúvidas* + comunidade.

⚠️ O *DESTRAVA20* vale só *até hoje à noite*. Amanhã volta pra {from}.

👉 Garante agora: {checkout}
(é só aplicar DESTRAVA20 no checkout)
```

### free | 6 | tarde  (ENQUETE)
```
Bora destravar de vez? O que falta pra você?
- Nada, já vou garantir! 🚀
- Só o empurrão do desconto
- Ainda tô na dúvida
```

### free | 6 | noite  (texto — novo, fechamento)
```
🚨 *FECHANDO. O cupom DESTRAVA20 expira hoje.*

Depois de hoje:
❌ o preço volta pra *{from}*
❌ os 20% OFF acabam
❌ a próxima turma só no próximo ciclo

Você fez as 3 aulas. Já sabe que consegue. Ficar parado custa mais caro que *R$ 39,92*.

Entra agora, aplica *DESTRAVA20* e começa amanhã mesmo 👇
{checkout}

Te vejo lá dentro. 🚀
```
