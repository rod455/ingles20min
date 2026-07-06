// Conteúdo do hub /aprenda — páginas de tráfego orgânico (SEO + AEO).
// Estrutura data-driven: cada guia vira uma rota estática em /aprenda/[slug].

export interface VocabWord {
  en: string;
  pt: string;
  pron?: string;
}

export interface GuideSection {
  title: string;
  paragraphs?: string[];
  words?: VocabWord[];
  list?: string[];
}

export interface GuideFaq {
  q: string;
  a: string;
}

export interface Guide {
  slug: string;
  label: string;
  emoji: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /** Primeiro bloco: responde a busca diretamente (AEO). */
  intro: string[];
  sections: GuideSection[];
  tips?: string[];
  faq: GuideFaq[];
  related: string[];
}

/* ---------------- Números 1 a 100 (gerados) ---------------- */

const EN_ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight",
  "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
  "sixteen", "seventeen", "eighteen", "nineteen",
];
const EN_TENS = [
  "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy",
  "eighty", "ninety",
];
const PT_ONES = [
  "zero", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito",
  "nove", "dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis",
  "dezessete", "dezoito", "dezenove",
];
const PT_TENS = [
  "", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta",
  "oitenta", "noventa",
];

export function numberToEnglish(n: number): string {
  if (n < 20) return EN_ONES[n];
  if (n === 100) return "one hundred";
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? EN_TENS[t] : `${EN_TENS[t]}-${EN_ONES[o]}`;
}

export function numberToPt(n: number): string {
  if (n < 20) return PT_ONES[n];
  if (n === 100) return "cem";
  const t = Math.floor(n / 10);
  const o = n % 10;
  return o === 0 ? PT_TENS[t] : `${PT_TENS[t]} e ${PT_ONES[o]}`;
}

const NUM_PRON: Record<number, string> = {
  1: "uãn", 2: "tchú", 3: "thrí", 4: "fôr", 5: "fáiv", 6: "síks",
  7: "séven", 8: "êit", 9: "náin", 10: "tén", 11: "iléven", 12: "tuélv",
  13: "thârtin", 14: "fôrtin", 15: "fíftin", 16: "síkstin", 17: "séventin",
  18: "êitin", 19: "náintin", 20: "tuénti", 30: "thârti", 40: "fôrti",
  50: "fífti", 60: "síksti", 70: "séventi", 80: "êiti", 90: "náinti",
  100: "uãn rrândred",
};

export function numbersRange(from: number, to: number): VocabWord[] {
  const out: VocabWord[] = [];
  for (let n = from; n <= to; n++) {
    out.push({
      en: `${n} — ${numberToEnglish(n)}`,
      pt: numberToPt(n),
      pron: NUM_PRON[n],
    });
  }
  return out;
}

/* ---------------- Vocabulários ---------------- */

const COLORS: VocabWord[] = [
  { en: "red", pt: "vermelho", pron: "réd" },
  { en: "blue", pt: "azul", pron: "blú" },
  { en: "green", pt: "verde", pron: "grín" },
  { en: "yellow", pt: "amarelo", pron: "iélou" },
  { en: "orange", pt: "laranja", pron: "órindj" },
  { en: "purple", pt: "roxo", pron: "pârpol" },
  { en: "pink", pt: "rosa", pron: "pink" },
  { en: "brown", pt: "marrom", pron: "bráun" },
  { en: "black", pt: "preto", pron: "blék" },
  { en: "white", pt: "branco", pron: "uáit" },
  { en: "gray / grey", pt: "cinza", pron: "grêi" },
  { en: "beige", pt: "bege", pron: "bêij" },
];

const COLOR_SHADES: VocabWord[] = [
  { en: "light blue", pt: "azul-claro", pron: "láit blú" },
  { en: "dark blue", pt: "azul-escuro", pron: "dárk blú" },
  { en: "navy blue", pt: "azul-marinho", pron: "nêivi blú" },
  { en: "turquoise", pt: "turquesa", pron: "târcuoiz" },
  { en: "violet", pt: "violeta", pron: "váiolet" },
  { en: "lilac", pt: "lilás", pron: "láilac" },
  { en: "gold / golden", pt: "dourado", pron: "gôuld" },
  { en: "silver", pt: "prateado", pron: "sílver" },
  { en: "wine", pt: "vinho", pron: "uáin" },
  { en: "cream", pt: "creme", pron: "crím" },
];

const DAYS: VocabWord[] = [
  { en: "Monday", pt: "segunda-feira", pron: "mãndei" },
  { en: "Tuesday", pt: "terça-feira", pron: "tiúzdei" },
  { en: "Wednesday", pt: "quarta-feira", pron: "uénzdei" },
  { en: "Thursday", pt: "quinta-feira", pron: "thârzdei" },
  { en: "Friday", pt: "sexta-feira", pron: "fráidei" },
  { en: "Saturday", pt: "sábado", pron: "sáterdei" },
  { en: "Sunday", pt: "domingo", pron: "sãndei" },
];

const DAYS_RELATED: VocabWord[] = [
  { en: "day", pt: "dia", pron: "dei" },
  { en: "week", pt: "semana", pron: "uík" },
  { en: "weekend", pt: "fim de semana", pron: "uík-end" },
  { en: "weekday", pt: "dia útil", pron: "uík-dei" },
  { en: "today", pt: "hoje", pron: "tudêi" },
  { en: "tomorrow", pt: "amanhã", pron: "tumórou" },
  { en: "yesterday", pt: "ontem", pron: "iésterdei" },
  { en: "month", pt: "mês", pron: "mãnth" },
  { en: "year", pt: "ano", pron: "íer" },
  { en: "holiday", pt: "feriado", pron: "rólidei" },
];

const OBJECTS_TECH: VocabWord[] = [
  { en: "cell phone", pt: "celular" },
  { en: "computer", pt: "computador" },
  { en: "laptop", pt: "notebook" },
  { en: "keyboard", pt: "teclado" },
  { en: "mouse", pt: "mouse" },
  { en: "screen", pt: "tela" },
  { en: "charger", pt: "carregador" },
  { en: "headphones", pt: "fones de ouvido" },
  { en: "television / TV", pt: "televisão" },
  { en: "remote control", pt: "controle remoto" },
  { en: "camera", pt: "câmera" },
  { en: "battery", pt: "pilha / bateria" },
];

const OBJECTS_PERSONAL: VocabWord[] = [
  { en: "watch", pt: "relógio (de pulso)" },
  { en: "clock", pt: "relógio (de parede)" },
  { en: "glasses", pt: "óculos" },
  { en: "sunglasses", pt: "óculos de sol" },
  { en: "wallet", pt: "carteira" },
  { en: "purse", pt: "bolsa (feminina)" },
  { en: "bag", pt: "bolsa / sacola" },
  { en: "backpack", pt: "mochila" },
  { en: "umbrella", pt: "guarda-chuva" },
  { en: "toothbrush", pt: "escova de dentes" },
  { en: "toothpaste", pt: "pasta de dente" },
  { en: "comb", pt: "pente" },
  { en: "hairbrush", pt: "escova de cabelo" },
];

const OBJECTS_SCHOOL: VocabWord[] = [
  { en: "book", pt: "livro" },
  { en: "notebook", pt: "caderno" },
  { en: "pen", pt: "caneta" },
  { en: "pencil", pt: "lápis" },
  { en: "eraser", pt: "borracha" },
  { en: "ruler", pt: "régua" },
  { en: "scissors", pt: "tesoura" },
  { en: "paper", pt: "papel" },
  { en: "envelope", pt: "envelope" },
  { en: "box", pt: "caixa" },
];

const OBJECTS_KITCHEN: VocabWord[] = [
  { en: "bottle", pt: "garrafa" },
  { en: "cup", pt: "xícara" },
  { en: "glass", pt: "copo" },
  { en: "mug", pt: "caneca" },
  { en: "plate", pt: "prato" },
  { en: "bowl", pt: "tigela" },
  { en: "fork", pt: "garfo" },
  { en: "knife", pt: "faca" },
  { en: "spoon", pt: "colher" },
  { en: "napkin", pt: "guardanapo" },
  { en: "candle", pt: "vela" },
  { en: "flashlight", pt: "lanterna" },
  { en: "matches", pt: "fósforos" },
  { en: "rope", pt: "corda" },
  { en: "hammer", pt: "martelo" },
];

const THEME_CASA: VocabWord[] = [
  { en: "house", pt: "casa" },
  { en: "home", pt: "lar" },
  { en: "bedroom", pt: "quarto" },
  { en: "bathroom", pt: "banheiro" },
  { en: "kitchen", pt: "cozinha" },
  { en: "living room", pt: "sala de estar" },
  { en: "dining room", pt: "sala de jantar" },
  { en: "garage", pt: "garagem" },
  { en: "garden", pt: "jardim" },
  { en: "backyard", pt: "quintal" },
  { en: "roof", pt: "telhado" },
  { en: "wall", pt: "parede" },
  { en: "floor", pt: "chão / piso" },
  { en: "ceiling", pt: "teto" },
  { en: "door", pt: "porta" },
  { en: "window", pt: "janela" },
  { en: "stairs", pt: "escada" },
  { en: "furniture", pt: "móveis" },
  { en: "table", pt: "mesa" },
  { en: "chair", pt: "cadeira" },
  { en: "sofa / couch", pt: "sofá" },
  { en: "bed", pt: "cama" },
  { en: "pillow", pt: "travesseiro" },
  { en: "blanket", pt: "cobertor" },
  { en: "sheet", pt: "lençol" },
  { en: "wardrobe / closet", pt: "guarda-roupa / armário" },
  { en: "shelf", pt: "prateleira" },
  { en: "mirror", pt: "espelho" },
  { en: "lamp", pt: "luminária / abajur" },
  { en: "curtain", pt: "cortina" },
  { en: "rug / carpet", pt: "tapete / carpete" },
  { en: "fridge / refrigerator", pt: "geladeira" },
  { en: "stove", pt: "fogão" },
  { en: "oven", pt: "forno" },
  { en: "microwave", pt: "micro-ondas" },
  { en: "sink", pt: "pia" },
  { en: "faucet / tap", pt: "torneira" },
  { en: "shower", pt: "chuveiro" },
  { en: "toilet", pt: "vaso sanitário" },
  { en: "towel", pt: "toalha" },
  { en: "soap", pt: "sabonete" },
  { en: "washing machine", pt: "máquina de lavar" },
  { en: "iron", pt: "ferro de passar" },
  { en: "broom", pt: "vassoura" },
  { en: "trash can", pt: "lixeira" },
  { en: "key", pt: "chave" },
  { en: "lock", pt: "fechadura" },
  { en: "mailbox", pt: "caixa de correio" },
  { en: "fence", pt: "cerca" },
  { en: "attic", pt: "sótão" },
];

const THEME_VIAGEM: VocabWord[] = [
  { en: "trip", pt: "viagem" },
  { en: "to travel", pt: "viajar" },
  { en: "airport", pt: "aeroporto" },
  { en: "flight", pt: "voo" },
  { en: "plane", pt: "avião" },
  { en: "ticket", pt: "passagem / bilhete" },
  { en: "passport", pt: "passaporte" },
  { en: "visa", pt: "visto" },
  { en: "luggage / baggage", pt: "bagagem" },
  { en: "suitcase", pt: "mala" },
  { en: "backpack", pt: "mochila" },
  { en: "boarding pass", pt: "cartão de embarque" },
  { en: "gate", pt: "portão de embarque" },
  { en: "departure", pt: "partida / embarque" },
  { en: "arrival", pt: "chegada" },
  { en: "delay", pt: "atraso" },
  { en: "customs", pt: "alfândega" },
  { en: "hotel", pt: "hotel" },
  { en: "booking / reservation", pt: "reserva" },
  { en: "check-in", pt: "check-in (entrada)" },
  { en: "check-out", pt: "check-out (saída)" },
  { en: "room", pt: "quarto" },
  { en: "map", pt: "mapa" },
  { en: "tourist", pt: "turista" },
  { en: "tour", pt: "passeio / excursão" },
  { en: "tour guide", pt: "guia turístico" },
  { en: "sightseeing", pt: "turismo / visita a pontos turísticos" },
  { en: "beach", pt: "praia" },
  { en: "mountain", pt: "montanha" },
  { en: "museum", pt: "museu" },
  { en: "restaurant", pt: "restaurante" },
  { en: "menu", pt: "cardápio" },
  { en: "bill / check", pt: "conta" },
  { en: "tip", pt: "gorjeta" },
  { en: "taxi / cab", pt: "táxi" },
  { en: "bus", pt: "ônibus" },
  { en: "train", pt: "trem" },
  { en: "subway", pt: "metrô" },
  { en: "station", pt: "estação" },
  { en: "car rental", pt: "aluguel de carro" },
  { en: "driver's license", pt: "carteira de motorista" },
  { en: "road", pt: "estrada" },
  { en: "highway", pt: "rodovia" },
  { en: "gas station", pt: "posto de gasolina" },
  { en: "directions", pt: "direções / instruções de caminho" },
  { en: "left", pt: "esquerda" },
  { en: "right", pt: "direita" },
  { en: "straight ahead", pt: "em frente" },
  { en: "near", pt: "perto" },
  { en: "far", pt: "longe" },
];

const THEME_TRABALHO: VocabWord[] = [
  { en: "job", pt: "emprego" },
  { en: "work", pt: "trabalho" },
  { en: "office", pt: "escritório" },
  { en: "company", pt: "empresa" },
  { en: "boss", pt: "chefe" },
  { en: "manager", pt: "gerente" },
  { en: "employee", pt: "funcionário" },
  { en: "coworker / colleague", pt: "colega de trabalho" },
  { en: "team", pt: "equipe" },
  { en: "meeting", pt: "reunião" },
  { en: "schedule", pt: "agenda / cronograma" },
  { en: "deadline", pt: "prazo final" },
  { en: "task", pt: "tarefa" },
  { en: "project", pt: "projeto" },
  { en: "report", pt: "relatório" },
  { en: "presentation", pt: "apresentação" },
  { en: "email", pt: "e-mail" },
  { en: "phone call", pt: "ligação" },
  { en: "interview", pt: "entrevista" },
  { en: "resume / CV", pt: "currículo" },
  { en: "salary", pt: "salário" },
  { en: "wage", pt: "remuneração (por hora)" },
  { en: "raise", pt: "aumento" },
  { en: "promotion", pt: "promoção" },
  { en: "career", pt: "carreira" },
  { en: "skill", pt: "habilidade" },
  { en: "experience", pt: "experiência" },
  { en: "training", pt: "treinamento" },
  { en: "internship", pt: "estágio" },
  { en: "contract", pt: "contrato" },
  { en: "full-time", pt: "período integral" },
  { en: "part-time", pt: "meio período" },
  { en: "shift", pt: "turno" },
  { en: "break", pt: "pausa / intervalo" },
  { en: "overtime", pt: "hora extra" },
  { en: "vacation", pt: "férias" },
  { en: "day off", pt: "dia de folga" },
  { en: "sick leave", pt: "licença médica" },
  { en: "retirement", pt: "aposentadoria" },
  { en: "to hire", pt: "contratar" },
  { en: "to fire", pt: "demitir" },
  { en: "to quit", pt: "pedir demissão" },
  { en: "business", pt: "negócio" },
  { en: "client / customer", pt: "cliente" },
  { en: "supplier", pt: "fornecedor" },
  { en: "invoice", pt: "fatura / nota fiscal" },
  { en: "budget", pt: "orçamento" },
  { en: "profit", pt: "lucro" },
  { en: "goal", pt: "meta" },
  { en: "feedback", pt: "retorno / avaliação" },
];

const THEME_FAMILIA: VocabWord[] = [
  { en: "family", pt: "família" },
  { en: "father", pt: "pai" },
  { en: "mother", pt: "mãe" },
  { en: "dad", pt: "papai" },
  { en: "mom", pt: "mamãe" },
  { en: "parents", pt: "pais" },
  { en: "son", pt: "filho" },
  { en: "daughter", pt: "filha" },
  { en: "children / kids", pt: "filhos / crianças" },
  { en: "brother", pt: "irmão" },
  { en: "sister", pt: "irmã" },
  { en: "siblings", pt: "irmãos (em geral)" },
  { en: "grandfather", pt: "avô" },
  { en: "grandmother", pt: "avó" },
  { en: "grandparents", pt: "avós" },
  { en: "grandson", pt: "neto" },
  { en: "granddaughter", pt: "neta" },
  { en: "uncle", pt: "tio" },
  { en: "aunt", pt: "tia" },
  { en: "cousin", pt: "primo / prima" },
  { en: "nephew", pt: "sobrinho" },
  { en: "niece", pt: "sobrinha" },
  { en: "husband", pt: "marido" },
  { en: "wife", pt: "esposa" },
  { en: "spouse", pt: "cônjuge" },
  { en: "boyfriend", pt: "namorado" },
  { en: "girlfriend", pt: "namorada" },
  { en: "fiancé / fiancée", pt: "noivo / noiva" },
  { en: "partner", pt: "parceiro(a) / companheiro(a)" },
  { en: "in-laws", pt: "sogros / família do cônjuge" },
  { en: "father-in-law", pt: "sogro" },
  { en: "mother-in-law", pt: "sogra" },
  { en: "brother-in-law", pt: "cunhado" },
  { en: "sister-in-law", pt: "cunhada" },
  { en: "son-in-law", pt: "genro" },
  { en: "daughter-in-law", pt: "nora" },
  { en: "stepfather", pt: "padrasto" },
  { en: "stepmother", pt: "madrasta" },
  { en: "stepbrother", pt: "meio-irmão (por casamento)" },
  { en: "godfather", pt: "padrinho" },
  { en: "godmother", pt: "madrinha" },
  { en: "baby", pt: "bebê" },
  { en: "toddler", pt: "criança pequena (1–3 anos)" },
  { en: "teenager", pt: "adolescente" },
  { en: "adult", pt: "adulto" },
  { en: "relative", pt: "parente" },
  { en: "twins", pt: "gêmeos" },
  { en: "only child", pt: "filho único" },
  { en: "marriage", pt: "casamento (união)" },
  { en: "wedding", pt: "casamento (cerimônia)" },
];

const THEME_ANIMAIS: VocabWord[] = [
  { en: "dog", pt: "cachorro" },
  { en: "cat", pt: "gato" },
  { en: "bird", pt: "pássaro" },
  { en: "fish", pt: "peixe" },
  { en: "horse", pt: "cavalo" },
  { en: "cow", pt: "vaca" },
  { en: "ox", pt: "boi" },
  { en: "pig", pt: "porco" },
  { en: "sheep", pt: "ovelha" },
  { en: "goat", pt: "cabra" },
  { en: "chicken / hen", pt: "galinha" },
  { en: "rooster", pt: "galo" },
  { en: "duck", pt: "pato" },
  { en: "rabbit", pt: "coelho" },
  { en: "mouse", pt: "camundongo" },
  { en: "rat", pt: "rato" },
  { en: "hamster", pt: "hamster" },
  { en: "turtle", pt: "tartaruga" },
  { en: "snake", pt: "cobra" },
  { en: "lizard", pt: "lagarto" },
  { en: "frog", pt: "sapo / rã" },
  { en: "monkey", pt: "macaco" },
  { en: "lion", pt: "leão" },
  { en: "tiger", pt: "tigre" },
  { en: "elephant", pt: "elefante" },
  { en: "giraffe", pt: "girafa" },
  { en: "zebra", pt: "zebra" },
  { en: "bear", pt: "urso" },
  { en: "wolf", pt: "lobo" },
  { en: "fox", pt: "raposa" },
  { en: "deer", pt: "veado / cervo" },
  { en: "squirrel", pt: "esquilo" },
  { en: "bat", pt: "morcego" },
  { en: "whale", pt: "baleia" },
  { en: "dolphin", pt: "golfinho" },
  { en: "shark", pt: "tubarão" },
  { en: "octopus", pt: "polvo" },
  { en: "crab", pt: "caranguejo" },
  { en: "shrimp", pt: "camarão" },
  { en: "bee", pt: "abelha" },
  { en: "ant", pt: "formiga" },
  { en: "butterfly", pt: "borboleta" },
  { en: "spider", pt: "aranha" },
  { en: "fly", pt: "mosca" },
  { en: "mosquito", pt: "mosquito / pernilongo" },
  { en: "eagle", pt: "águia" },
  { en: "owl", pt: "coruja" },
  { en: "parrot", pt: "papagaio" },
  { en: "penguin", pt: "pinguim" },
  { en: "kangaroo", pt: "canguru" },
];

const THEME_DIA_A_DIA: VocabWord[] = [
  { en: "hello / hi", pt: "olá / oi" },
  { en: "goodbye / bye", pt: "tchau" },
  { en: "please", pt: "por favor" },
  { en: "thank you / thanks", pt: "obrigado(a)" },
  { en: "you're welcome", pt: "de nada" },
  { en: "sorry", pt: "desculpa" },
  { en: "excuse me", pt: "com licença" },
  { en: "yes", pt: "sim" },
  { en: "no", pt: "não" },
  { en: "maybe", pt: "talvez" },
  { en: "okay / OK", pt: "está bem" },
  { en: "today", pt: "hoje" },
  { en: "tomorrow", pt: "amanhã" },
  { en: "yesterday", pt: "ontem" },
  { en: "now", pt: "agora" },
  { en: "later", pt: "mais tarde" },
  { en: "always", pt: "sempre" },
  { en: "never", pt: "nunca" },
  { en: "sometimes", pt: "às vezes" },
  { en: "morning", pt: "manhã" },
  { en: "afternoon", pt: "tarde" },
  { en: "evening", pt: "início da noite" },
  { en: "night", pt: "noite" },
  { en: "breakfast", pt: "café da manhã" },
  { en: "lunch", pt: "almoço" },
  { en: "dinner", pt: "jantar" },
  { en: "water", pt: "água" },
  { en: "coffee", pt: "café" },
  { en: "food", pt: "comida" },
  { en: "money", pt: "dinheiro" },
  { en: "time", pt: "tempo / hora" },
  { en: "day", pt: "dia" },
  { en: "week", pt: "semana" },
  { en: "month", pt: "mês" },
  { en: "year", pt: "ano" },
  { en: "friend", pt: "amigo(a)" },
  { en: "people", pt: "pessoas" },
  { en: "good", pt: "bom" },
  { en: "bad", pt: "ruim" },
  { en: "big", pt: "grande" },
  { en: "small", pt: "pequeno" },
  { en: "new", pt: "novo" },
  { en: "old", pt: "velho" },
  { en: "happy", pt: "feliz" },
  { en: "sad", pt: "triste" },
  { en: "tired", pt: "cansado" },
  { en: "hungry", pt: "com fome" },
  { en: "thirsty", pt: "com sede" },
  { en: "hot", pt: "quente" },
  { en: "cold", pt: "frio" },
];

/* ---------------- Guias ---------------- */

const TIPS_PADRAO = [
  "Estude poucos itens por dia (5 a 10) e revise no dia seguinte — repetição espaçada vence maratona.",
  "Fale em voz alta: ler em silêncio não treina a boca. Pronuncie cada palavra 3 vezes.",
  "Crie frases suas com as palavras novas (\"My kitchen is small\") — contexto fixa 3x mais que lista solta.",
  "Estude no mesmo horário todo dia. Constância pequena ganha de esforço gigante e esporádico.",
];

export const GUIDES: Guide[] = [
  {
    slug: "numeros-em-ingles",
    label: "Números de 1 a 100",
    emoji: "🔢",
    metaTitle: "Números em inglês de 1 a 100 — lista completa com tradução",
    metaDescription:
      "Tabela completa dos números em inglês de 1 a 100 com tradução e pronúncia aproximada. Aprenda a regra dos números compostos e memorize rápido.",
    h1: "Números em inglês de 1 a 100 (lista completa)",
    intro: [
      "Os números em inglês de 1 a 100 seguem uma lógica simples: você só precisa memorizar os números de 1 a 20 e as dezenas (twenty, thirty, forty…). Todos os outros são combinações — por exemplo, 21 é twenty-one (vinte + um) e 99 é ninety-nine (noventa + nove).",
      "Abaixo você encontra a tabela completa de 1 a 100 com tradução, a pronúncia aproximada dos números-chave e a regra para formar qualquer número composto.",
    ],
    sections: [
      { title: "Números de 1 a 20 (os que você precisa decorar)", words: numbersRange(1, 20) },
      { title: "Dezenas: 20, 30, 40… até 100", words: [20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => ({ en: `${n} — ${numberToEnglish(n)}`, pt: numberToPt(n), pron: NUM_PRON[n] })) },
      {
        title: "Como formar os números compostos (regra)",
        paragraphs: [
          "Junte a dezena + o número de 1 a 9, com hífen: 21 = twenty-one, 35 = thirty-five, 47 = forty-seven, 68 = sixty-eight, 99 = ninety-nine. É a mesma lógica do português (\"vinte e um\"), só que sem o \"e\".",
          "Atenção aos 4 que mudam de escrita: 2 → twenty (não \"twoty\"), 3 → thirty, 4 → forty (sem u!), 5 → fifty.",
        ],
      },
      { title: "Tabela completa: 21 a 100", words: numbersRange(21, 100) },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Como se escreve 40 em inglês?", a: "Forty — sem a letra U. É o erro de escrita mais comum: \"fourty\" está errado, o correto é forty." },
      { q: "Qual a diferença entre fourteen e forty?", a: "Fourteen é 14 (termina em -teen, sílaba forte no fim: fôr-TIN). Forty é 40 (termina em -ty, sílaba forte no início: FÔR-ti). O mesmo vale para 13/30, 15/50, 16/60 etc." },
      { q: "Como falar números de telefone em inglês?", a: "Dígito por dígito: 9-8-2-4 = nine, eight, two, four. O zero é lido como \"oh\" (ou) ou \"zero\"." },
      { q: "Como se diz 100 em inglês?", a: "One hundred (ou apenas \"a hundred\" no dia a dia). 101 é one hundred and one." },
    ],
    related: ["cores-em-ingles", "dias-da-semana-em-ingles", "palavras-em-ingles-dia-a-dia"],
  },
  {
    slug: "cores-em-ingles",
    label: "Cores",
    emoji: "🎨",
    metaTitle: "Cores em inglês — lista com tradução e pronúncia",
    metaDescription:
      "Todas as cores em inglês com tradução e pronúncia aproximada: red, blue, green, yellow e mais 18 cores e tons. Com exemplos de frases prontas.",
    h1: "Cores em inglês: lista completa com tradução e pronúncia",
    intro: [
      "As cores em inglês mais usadas são: red (vermelho), blue (azul), green (verde), yellow (amarelo), orange (laranja), purple (roxo), pink (rosa), brown (marrom), black (preto), white (branco) e gray (cinza).",
      "Veja a lista completa com pronúncia aproximada, os tons mais comuns (claro, escuro, marinho…) e como usar as cores em frases — em inglês, a cor vem ANTES do substantivo: a red car (um carro vermelho).",
    ],
    sections: [
      { title: "As 12 cores essenciais", words: COLORS },
      { title: "Tons e variações", words: COLOR_SHADES },
      {
        title: "Como usar as cores em frases",
        paragraphs: [
          "Regra de ouro: em inglês o adjetivo vem antes do substantivo. Diga \"a blue shirt\" (uma camisa azul), nunca \"a shirt blue\".",
        ],
        list: [
          "What color is it? — Qual é a cor disso?",
          "My favorite color is green. — Minha cor favorita é verde.",
          "She has a red car. — Ela tem um carro vermelho.",
          "I need a black pen. — Preciso de uma caneta preta.",
          "The sky is light blue today. — O céu está azul-claro hoje.",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Qual a diferença entre gray e grey?", a: "Nenhuma no significado — gray é a grafia americana e grey a britânica. As duas estão corretas." },
      { q: "Como se diz roxo em inglês?", a: "Purple (pârpol). Violet existe, mas é um tom específico (violeta), assim como lilac (lilás)." },
      { q: "\"Colour\" está errado?", a: "Não — colour é a grafia britânica e color a americana. Use uma delas de forma consistente." },
    ],
    related: ["numeros-em-ingles", "objetos-em-ingles", "palavras-em-ingles-casa"],
  },
  {
    slug: "dias-da-semana-em-ingles",
    label: "Dias da semana",
    emoji: "📅",
    metaTitle: "Dias da semana em inglês — com pronúncia e macetes",
    metaDescription:
      "Os 7 dias da semana em inglês com tradução e pronúncia: Monday, Tuesday, Wednesday… Entenda por que começam com maiúscula e aprenda frases prontas.",
    h1: "Dias da semana em inglês (com pronúncia e macetes)",
    intro: [
      "Os dias da semana em inglês são: Monday (segunda), Tuesday (terça), Wednesday (quarta), Thursday (quinta), Friday (sexta), Saturday (sábado) e Sunday (domingo). Diferente do português, eles SEMPRE começam com letra maiúscula.",
      "Veja a pronúncia aproximada de cada um, o vocabulário relacionado (semana, fim de semana, hoje, amanhã) e as frases mais úteis do dia a dia.",
    ],
    sections: [
      { title: "Os 7 dias da semana", words: DAYS },
      { title: "Vocabulário relacionado", words: DAYS_RELATED },
      {
        title: "Frases prontas para usar",
        list: [
          "What day is it today? — Que dia é hoje?",
          "Today is Wednesday. — Hoje é quarta-feira.",
          "See you on Monday! — Te vejo na segunda!",
          "I work from Monday to Friday. — Trabalho de segunda a sexta.",
          "What are you doing this weekend? — O que você vai fazer neste fim de semana?",
        ],
      },
      {
        title: "Macetes de pronúncia",
        paragraphs: [
          "Wednesday é o mais traiçoeiro: o primeiro \"d\" é mudo — fala-se \"UÉNZ-dei\", não \"wed-nes-day\".",
          "Tuesday (terça) e Thursday (quinta) confundem os brasileiros. Grave assim: TUEsday tem som de \"TIÚ\" (como em \"tio\"), THURsday começa com o som de TH (língua entre os dentes) — \"THÂRZ-dei\".",
          "Use a preposição ON com dias da semana: on Monday, on Friday. Nunca \"in Monday\".",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Por que os dias da semana começam com maiúscula em inglês?", a: "É regra gramatical: dias da semana, meses e nacionalidades sempre levam inicial maiúscula em inglês — Monday, January, Brazilian." },
      { q: "Como se pronuncia Wednesday?", a: "\"UÉNZ-dei\" — o primeiro d não é pronunciado. É como se a palavra fosse \"Wensday\"." },
      { q: "Qual preposição usar com dias da semana?", a: "ON: on Monday (na segunda), on weekends (nos fins de semana). Para partes do dia, IN: in the morning. Para horas, AT: at 8 o'clock." },
    ],
    related: ["numeros-em-ingles", "palavras-em-ingles-dia-a-dia", "palavras-em-ingles-trabalho"],
  },
  {
    slug: "objetos-em-ingles",
    label: "Objetos",
    emoji: "🎒",
    metaTitle: "Objetos em inglês — 50 objetos do dia a dia com tradução",
    metaDescription:
      "Lista de 50 objetos em inglês com tradução, organizados por categoria: tecnologia, itens pessoais, escritório/escola e cozinha. Com frases de exemplo.",
    h1: "50 objetos em inglês que você usa todos os dias",
    intro: [
      "Os objetos em inglês mais úteis de aprender são os que você vê e usa todos os dias: cell phone (celular), wallet (carteira), keys (chaves), glasses (óculos), pen (caneta), cup (xícara). Nomear o que está à sua volta é uma das formas mais rápidas de expandir vocabulário.",
      "Separamos 50 objetos essenciais em 4 categorias. Dica: depois de ler, olhe ao redor e tente nomear em inglês 5 objetos perto de você — sem consultar a lista.",
    ],
    sections: [
      { title: "Tecnologia e eletrônicos", words: OBJECTS_TECH },
      { title: "Itens pessoais", words: OBJECTS_PERSONAL },
      { title: "Escritório e escola", words: OBJECTS_SCHOOL },
      { title: "Cozinha e utilidades", words: OBJECTS_KITCHEN },
      {
        title: "Frases para praticar",
        list: [
          "Where are my keys? — Onde estão minhas chaves?",
          "Can I borrow your pen? — Posso pegar sua caneta emprestada?",
          "My phone is charging. — Meu celular está carregando.",
          "I lost my wallet. — Perdi minha carteira.",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Qual a diferença entre watch e clock?", a: "Watch é o relógio de pulso; clock é o de parede ou mesa. \"What time is it?\" serve para perguntar as horas com qualquer um." },
      { q: "Como se diz 'celular' em inglês?", a: "Cell phone (EUA) ou mobile phone (Reino Unido). No dia a dia, quase sempre se fala só phone." },
      { q: "Óculos é singular ou plural em inglês?", a: "Sempre plural: glasses. Diga \"my glasses ARE new\" (não \"is\"). O mesmo vale para scissors (tesoura)." },
    ],
    related: ["palavras-em-ingles-casa", "cores-em-ingles", "palavras-em-ingles-trabalho"],
  },
  {
    slug: "como-aprender-ingles-rapido",
    label: "Como aprender rápido",
    emoji: "⚡",
    metaTitle: "Como aprender inglês rápido: método realista em 7 passos",
    metaDescription:
      "Como aprender inglês rápido de verdade: constância diária, blocos prontos (chunks), shadowing e imersão no celular. Guia prático com prazos realistas.",
    h1: "Como aprender inglês rápido (método realista, sem fórmula mágica)",
    intro: [
      "A forma mais rápida de aprender inglês é estudar POUCO TODO DIA (15–20 minutos), focando no idioma que você realmente vai usar: frases prontas do dia a dia, escuta ativa e prática de fala em voz alta. Velocidade em idioma não vem de estudar muito de uma vez — vem de nunca pular um dia.",
      "Quem estuda 20 minutos diários por 3 meses avança mais do que quem faz maratonas de 3 horas aos domingos. Abaixo, o método em 7 passos que usamos com mais de 400 alunos.",
    ],
    sections: [
      {
        title: "O método em 7 passos",
        list: [
          "1. Defina um horário fixo diário (ex: 7h, no café) — o cérebro automatiza o hábito em ~3 semanas.",
          "2. Aprenda em blocos prontos (chunks), não palavra solta: \"I'm gonna...\", \"Can I have...?\", \"How much is...?\" — frases inteiras saem no automático.",
          "3. Pratique shadowing: ouça uma frase curta de um nativo e repita em voz alta imitando ritmo e entonação, 5 vezes.",
          "4. Mude o idioma do celular para inglês — são centenas de microexposições por dia, de graça.",
          "5. Consuma conteúdo que você JÁ gosta em inglês (série, música, podcast) com legenda em inglês, não em português.",
          "6. Fale desde o primeiro dia, mesmo errando — se não tiver com quem, grave áudios de 30s contando seu dia.",
          "7. Revise em ciclos: o que aprendeu hoje, reveja amanhã e no fim da semana (repetição espaçada).",
        ],
      },
      {
        title: "Quanto tempo leva para aprender inglês?",
        paragraphs: [
          "Com 20 minutos diários e método: em 1 mês você monta frases básicas e se apresenta; em 3 meses sustenta conversas simples de rotina e viagem; em 6–12 meses conversa com confiança sobre a maioria dos assuntos do dia a dia. Fluência total é jornada de anos — mas a comunicação útil chega muito antes do que a maioria imagina.",
        ],
      },
      {
        title: "Os 3 erros que mais atrasam",
        list: [
          "Estudar só gramática: você aprende SOBRE o inglês, mas não aprende inglês. Gramática entra pelo uso.",
          "Depender de motivação: quem espera \"estar afim\" estuda 2x por mês. Sistema (horário fixo + lição pronta) vence motivação.",
          "Medo de errar: erro é dado de treino. Quem fala errado 100 vezes chega antes de quem esperou a frase perfeita.",
        ],
      },
    ],
    faq: [
      { q: "Dá para aprender inglês em 3 meses?", a: "Dá para destravar a comunicação básica em 3 meses com 15–20 min diários: apresentar-se, pedir comida, se virar em viagem e sustentar conversas simples. Fluência completa leva mais tempo, mas o inglês útil chega rápido." },
      { q: "Quantos minutos por dia devo estudar?", a: "15 a 20 minutos todos os dias batem 3 horas uma vez por semana. O cérebro consolida idioma com frequência, não com volume. O ideal: mesmo horário, todos os dias úteis." },
      { q: "Preciso de curso para aprender rápido?", a: "Precisa de MÉTODO e constância. Um bom curso acelera porque entrega a dose diária pronta (você não gasta energia decidindo o que estudar) — que é exatamente o que o Vocaboost faz no seu WhatsApp." },
      { q: "O que é shadowing?", a: "Técnica de repetir em voz alta o áudio de um nativo, imitando ritmo e entonação, quase simultaneamente. É um dos jeitos mais rápidos de destravar a fala e melhorar a pronúncia." },
    ],
    related: ["como-aprender-ingles-gratis", "palavras-em-ingles-dia-a-dia", "numeros-em-ingles"],
  },
  {
    slug: "como-aprender-ingles-gratis",
    label: "Como aprender grátis",
    emoji: "🆓",
    metaTitle: "Como aprender inglês grátis: 8 recursos que funcionam",
    metaDescription:
      "Guia para aprender inglês grátis e de verdade: grupo gratuito no WhatsApp com aulas diárias, YouTube, podcasts, apps e método de estudo com custo zero.",
    h1: "Como aprender inglês grátis (guia com o que funciona de verdade)",
    intro: [
      "Sim, dá para aprender inglês grátis: hoje existe conteúdo gratuito de sobra — aulas no YouTube, podcasts, apps e até grupos de WhatsApp com lições diárias (como o grupo grátis do Vocaboost, com 4 aulas práticas). O que separa quem aprende de quem desiste não é dinheiro: é ter um MÉTODO e estudar todo dia.",
      "Abaixo, os 8 recursos gratuitos que realmente funcionam e como montar sua rotina de estudos com custo zero.",
    ],
    sections: [
      {
        title: "8 recursos gratuitos que funcionam",
        list: [
          "1. Grupo grátis do Vocaboost no WhatsApp — 4 aulas práticas (vídeo + áudio + exercício) direto no app que você já usa. É o jeito mais fácil de começar hoje.",
          "2. YouTube — busque \"inglês para iniciantes\" e siga 1 ou 2 canais (não 10): consistência com o mesmo professor acelera.",
          "3. Podcasts para aprendizes (ex: nível \"beginner English\") — ouça no trânsito; 15 min/dia de escuta transformam sua compreensão.",
          "4. Apps gratuitos de vocabulário — bons para revisar palavras, desde que combinados com escuta e fala (sozinhos não destravam conversação).",
          "5. Mudar o idioma do celular para inglês — imersão passiva o dia inteiro, custo zero.",
          "6. Música com letra: ouça, leia a letra em inglês, cante junto (shadowing disfarçado de diversão).",
          "7. Séries com legenda em inglês — comece por episódios que você já viu dublados.",
          "8. Conversação gratuita: grave áudios seus, participe de comunidades e responda em inglês em grupos de estudo.",
        ],
      },
      {
        title: "A rotina grátis de 20 minutos por dia",
        list: [
          "5 min — revise o vocabulário de ontem (em voz alta).",
          "10 min — conteúdo novo: a lição do dia do grupo grátis, um vídeo curto ou 1 diálogo de podcast.",
          "5 min — produção: repita as frases em voz alta (shadowing) ou grave um áudio usando o que aprendeu.",
        ],
      },
      {
        title: "O limite do 100% grátis (honestidade)",
        paragraphs: [
          "O material gratuito resolve o CONTEÚDO, mas não resolve a CONSTÂNCIA — a causa nº 1 de desistência é não ter uma estrutura que chegue até você todo dia, nem alguém para tirar dúvidas na hora em que você trava.",
          "Por isso o caminho inteligente é começar grátis (teste o método, crie o hábito) e, se funcionar para você, investir pouco numa estrutura guiada — no Vocaboost, a assinatura com aula diária + IA para tirar dúvidas custa R$ 49,90/mês, menos que um lanche por semana.",
        ],
      },
    ],
    faq: [
      { q: "É possível ficar fluente só com recursos gratuitos?", a: "É possível, mas raro — não por falta de conteúdo, e sim de constância e correção. A maioria avança mais rápido combinando base gratuita com alguma estrutura guiada (mesmo que barata) que entregue a dose diária e tire dúvidas." },
      { q: "Qual o melhor jeito de começar inglês do zero grátis?", a: "Entre no grupo grátis do Vocaboost no WhatsApp: são 4 aulas práticas com vídeo e áudio, sem pagar nada e sem instalar app novo. Em paralelo, mude o idioma do celular para inglês." },
      { q: "Aplicativo gratuito ensina inglês de verdade?", a: "Apps são ótimos para vocabulário e revisão, mas fracos em conversação. Use como complemento de escuta ativa (podcast/vídeo) e prática de fala em voz alta." },
    ],
    related: ["como-aprender-ingles-rapido", "numeros-em-ingles", "cores-em-ingles"],
  },
  {
    slug: "palavras-em-ingles-casa",
    label: "Palavras: Casa",
    emoji: "🏠",
    metaTitle: "50 palavras em inglês sobre casa — lista com tradução",
    metaDescription:
      "Lista com 50 palavras em inglês sobre casa: cômodos, móveis, eletrodomésticos e objetos domésticos com tradução. Ideal para iniciantes.",
    h1: "50 palavras em inglês sobre casa (cômodos, móveis e objetos)",
    intro: [
      "As palavras em inglês sobre casa mais importantes são os cômodos — bedroom (quarto), kitchen (cozinha), bathroom (banheiro), living room (sala) — e os itens que você usa todo dia: bed (cama), table (mesa), fridge (geladeira), shower (chuveiro).",
      "Aqui estão as 50 palavras essenciais do tema. Dica prática: cole post-its com o nome em inglês nos objetos da sua casa por uma semana — funciona absurdamente bem.",
    ],
    sections: [
      { title: "As 50 palavras de casa", words: THEME_CASA },
      {
        title: "Frases para praticar",
        list: [
          "My bedroom is small but cozy. — Meu quarto é pequeno mas aconchegante.",
          "The keys are on the kitchen table. — As chaves estão na mesa da cozinha.",
          "Can you close the window? — Pode fechar a janela?",
          "The bathroom is upstairs. — O banheiro é lá em cima.",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Qual a diferença entre house e home?", a: "House é a construção física (a casa); home é o lar, o lugar onde você vive e pertence. Por isso se diz \"I'm going home\" (sem o to)." },
      { q: "Como se diz 'quarto' em inglês?", a: "Bedroom (quarto de dormir). Room sozinho é qualquer cômodo/sala. Em hotel, usa-se room: \"a double room\"." },
    ],
    related: ["objetos-em-ingles", "palavras-em-ingles-familia", "palavras-em-ingles-dia-a-dia"],
  },
  {
    slug: "palavras-em-ingles-viagem",
    label: "Palavras: Viagem",
    emoji: "✈️",
    metaTitle: "50 palavras em inglês para viagem — lista com tradução",
    metaDescription:
      "50 palavras em inglês essenciais para viagem: aeroporto, hotel, transporte e direções, com tradução. Prepare seu inglês antes de embarcar.",
    h1: "50 palavras em inglês para viagem (aeroporto, hotel e transporte)",
    intro: [
      "Para se virar numa viagem, as palavras em inglês essenciais são as do aeroporto — flight (voo), gate (portão), boarding pass (cartão de embarque) —, do hotel — booking (reserva), check-in — e de locomoção — left (esquerda), right (direita), straight ahead (em frente).",
      "Esta lista de 50 palavras cobre a jornada completa: embarque, hospedagem, restaurante e como pedir direções sem passar aperto.",
    ],
    sections: [
      { title: "As 50 palavras de viagem", words: THEME_VIAGEM },
      {
        title: "Frases que salvam a viagem",
        list: [
          "Where is the gate? — Onde fica o portão de embarque?",
          "I have a reservation. — Tenho uma reserva.",
          "How much is it? — Quanto custa?",
          "Can I see the menu, please? — Posso ver o cardápio, por favor?",
          "How do I get to the museum? — Como chego ao museu?",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Qual a diferença entre trip e travel?", a: "Travel é o verbo/conceito de viajar; trip é a viagem em si (substantivo contável): \"I love to travel\" / \"The trip was amazing\". \"Have a nice trip!\" = boa viagem!" },
      { q: "O que significa layover?", a: "Escala/conexão entre voos. \"I have a 3-hour layover in Panama\" = tenho 3 horas de conexão no Panamá." },
    ],
    related: ["numeros-em-ingles", "palavras-em-ingles-dia-a-dia", "como-aprender-ingles-rapido"],
  },
  {
    slug: "palavras-em-ingles-trabalho",
    label: "Palavras: Trabalho",
    emoji: "💼",
    metaTitle: "50 palavras em inglês sobre trabalho — lista com tradução",
    metaDescription:
      "50 palavras em inglês sobre trabalho e carreira: reunião, prazo, salário, entrevista e mais, com tradução. Turbine seu inglês profissional.",
    h1: "50 palavras em inglês sobre trabalho e carreira",
    intro: [
      "No inglês profissional, as palavras mais usadas no dia a dia são meeting (reunião), deadline (prazo final), task (tarefa), report (relatório), salary (salário) e coworker (colega de trabalho). É o vocabulário que aparece em e-mails, reuniões e entrevistas.",
      "Esta lista de 50 palavras cobre escritório, contratação, carreira e rotina de trabalho — o kit de sobrevivência do inglês corporativo.",
    ],
    sections: [
      { title: "As 50 palavras do trabalho", words: THEME_TRABALHO },
      {
        title: "Frases úteis no trabalho",
        list: [
          "I have a meeting at 2 PM. — Tenho uma reunião às 14h.",
          "The deadline is Friday. — O prazo final é sexta-feira.",
          "Can we schedule a call? — Podemos agendar uma ligação?",
          "I'll send you the report today. — Te envio o relatório hoje.",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Qual a diferença entre job e work?", a: "Job é o emprego específico (contável): \"I got a new job\". Work é o trabalho em geral (incontável): \"I have a lot of work\". Nunca diga \"a work\"." },
      { q: "Como se diz 'fazer hora extra' em inglês?", a: "To work overtime: \"I worked overtime yesterday\" (fiz hora extra ontem)." },
    ],
    related: ["dias-da-semana-em-ingles", "numeros-em-ingles", "como-aprender-ingles-rapido"],
  },
  {
    slug: "palavras-em-ingles-familia",
    label: "Palavras: Família",
    emoji: "👨‍👩‍👧‍👦",
    metaTitle: "50 palavras em inglês sobre família — lista com tradução",
    metaDescription:
      "50 palavras em inglês sobre família: pai, mãe, irmãos, avós, sogros, primos e mais, com tradução. Aprenda a falar da sua família em inglês.",
    h1: "50 palavras em inglês sobre família (com tradução)",
    intro: [
      "As palavras em inglês sobre família começam pelo núcleo — father (pai), mother (mãe), brother (irmão), sister (irmã), son (filho), daughter (filha) — e se expandem para avós (grandparents), tios (uncle/aunt), primos (cousin) e a família do cônjuge (in-laws).",
      "Falar da própria família é um dos primeiros assuntos de qualquer conversa em inglês. Com estas 50 palavras, você descreve a sua inteira.",
    ],
    sections: [
      { title: "As 50 palavras da família", words: THEME_FAMILIA },
      {
        title: "Frases para praticar",
        list: [
          "I have two brothers and one sister. — Tenho dois irmãos e uma irmã.",
          "My parents live in Belo Horizonte. — Meus pais moram em BH.",
          "This is my wife. — Esta é minha esposa.",
          "Do you have kids? — Você tem filhos?",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Como se diz 'parente' em inglês?", a: "Relative. Cuidado com o falso cognato: parents significa PAIS (pai e mãe), não parentes." },
      { q: "O que significa siblings?", a: "Irmãos em geral (sem especificar gênero): \"Do you have any siblings?\" = Você tem irmãos?" },
      { q: "Como falar de primos: cousin muda no feminino?", a: "Não — cousin serve para primo e prima. O contexto (ou \"my cousin Ana\") indica o gênero." },
    ],
    related: ["palavras-em-ingles-casa", "palavras-em-ingles-dia-a-dia", "cores-em-ingles"],
  },
  {
    slug: "palavras-em-ingles-animais",
    label: "Palavras: Animais",
    emoji: "🐾",
    metaTitle: "50 animais em inglês — lista com tradução",
    metaDescription:
      "50 animais em inglês com tradução: domésticos, da fazenda, selvagens, marinhos e insetos. Lista completa para ampliar seu vocabulário.",
    h1: "50 animais em inglês (lista completa com tradução)",
    intro: [
      "Os animais em inglês mais comuns são: dog (cachorro), cat (gato), bird (pássaro), fish (peixe), horse (cavalo), cow (vaca), lion (leão) e monkey (macaco). Vocabulário de animais aparece o tempo todo em conversas, filmes e expressões idiomáticas.",
      "Esta lista traz 50 animais organizados do doméstico ao selvagem — dos pets aos animais marinhos e insetos.",
    ],
    sections: [
      { title: "Os 50 animais", words: THEME_ANIMAIS },
      {
        title: "Expressões com animais que os nativos amam",
        list: [
          "It's raining cats and dogs. — Está chovendo canivete (muito).",
          "I'm a night owl. — Sou uma pessoa noturna (coruja).",
          "Hold your horses! — Calma! / Segura a onda!",
          "A little bird told me… — Um passarinho me contou…",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Qual a diferença entre mouse e rat?", a: "Mouse é o camundongo (pequeno); rat é o rato grande (de esgoto). O plural de mouse é mice." },
      { q: "Como se diz 'filhote' em inglês?", a: "Depende do animal: puppy (cachorro), kitten (gato), cub (leão/urso). Genericamente: baby animal." },
    ],
    related: ["cores-em-ingles", "palavras-em-ingles-casa", "numeros-em-ingles"],
  },
  {
    slug: "palavras-em-ingles-dia-a-dia",
    label: "Palavras: Dia a dia",
    emoji: "💬",
    metaTitle: "50 palavras em inglês do dia a dia — as mais usadas",
    metaDescription:
      "As 50 palavras em inglês mais usadas no dia a dia: cumprimentos, tempo, refeições e adjetivos essenciais, com tradução. Comece por aqui.",
    h1: "As 50 palavras em inglês mais usadas no dia a dia",
    intro: [
      "Se você está começando, as palavras em inglês do dia a dia mais importantes são os cumprimentos e a educação básica: hello (olá), please (por favor), thank you (obrigado), sorry (desculpa), excuse me (com licença) — mais tempo (today, tomorrow), refeições e os adjetivos que descrevem quase tudo (good, bad, big, small).",
      "Estas 50 palavras cobrem uma fatia enorme das conversas cotidianas. Domine esta lista antes de qualquer outra.",
    ],
    sections: [
      { title: "As 50 palavras essenciais", words: THEME_DIA_A_DIA },
      {
        title: "Combinações que já saem prontas",
        list: [
          "Thank you so much! — Muito obrigado!",
          "See you tomorrow. — Até amanhã.",
          "I'm hungry. Let's have lunch. — Estou com fome. Vamos almoçar.",
          "Good morning! How are you? — Bom dia! Como vai?",
        ],
      },
    ],
    tips: TIPS_PADRAO,
    faq: [
      { q: "Quantas palavras preciso saber para me comunicar em inglês?", a: "Com ~300 palavras bem escolhidas você já sustenta conversas básicas; com 1.000 cobre cerca de 85% do inglês falado no dia a dia. Por isso vale começar pelas listas de alta frequência como esta." },
      { q: "Qual a diferença entre evening e night?", a: "Evening é o início da noite (±18h–21h, quando ainda há atividade): \"good evening\" ao chegar. Night é a noite fechada/hora de dormir: \"good night\" ao se despedir." },
    ],
    related: ["como-aprender-ingles-rapido", "numeros-em-ingles", "dias-da-semana-em-ingles"],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
