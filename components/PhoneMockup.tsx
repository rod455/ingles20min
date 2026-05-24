const MESSAGES = [
  {
    title: "📚 Lição de hoje · Dia 2",
    body: "Vocabulário: “to pull someone's leg” = brincar / zoar alguém.",
    time: "08:00",
  },
  {
    title: "🎧 Áudio do dia",
    body: "Ouça a pronúncia e repita em voz alta 3x.",
    time: "08:01",
  },
  {
    body: "Stop pulling my leg! 😂",
    time: "08:14",
    mine: true,
  },
];

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] animate-float">
      <div className="absolute -inset-8 -z-10 rounded-[3rem] bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-6 -left-6 -z-10 h-40 w-40 rounded-full bg-accent-400/20 blur-2xl" />
      <div className="rounded-[2.5rem] border-[10px] border-navy-700 bg-navy-950 shadow-2xl">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#0a1322]">
          {/* WhatsApp-style header */}
          <div className="flex items-center gap-3 bg-navy-800 px-4 py-3 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand-500 text-sm font-extrabold">
              VB
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Vocaboost · Inglês diário</p>
              <p className="text-[11px] text-accent-400">412 membros online</p>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3 px-3 py-4">
            {MESSAGES.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] shadow-sm ${
                    m.mine
                      ? "rounded-br-sm bg-brand-500 text-white"
                      : "rounded-bl-sm bg-navy-700 text-white"
                  }`}
                >
                  {m.title && (
                    <p className="mb-0.5 font-bold text-accent-400">{m.title}</p>
                  )}
                  <p>{m.body}</p>
                  <p className="mt-1 text-right text-[10px] text-white/40">
                    {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
