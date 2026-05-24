const MESSAGES = [
  {
    from: "Vocaboost",
    title: "📚 Lição de hoje",
    body: "“To pull someone's leg” = brincar / zoar alguém.",
    time: "08:00",
  },
  {
    from: "Vocaboost",
    title: "🎧 Áudio do dia",
    body: "Ouça a pronúncia e repita em voz alta 3x.",
    time: "08:01",
  },
  {
    from: "Você",
    body: "Stop pulling my leg! 😂",
    time: "08:14",
    mine: true,
  },
];

export default function PhoneMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[300px] animate-float">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-brand-400/20 blur-2xl" />
      <div className="rounded-[2.5rem] border-[10px] border-ink-900 bg-ink-900 shadow-2xl">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#e6ddd4]">
          {/* WhatsApp-style header */}
          <div className="flex items-center gap-3 bg-brand-600 px-4 py-3 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-sm font-bold">
              VB
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Vocaboost · Inglês diário</p>
              <p className="text-[11px] text-white/70">1.248 membros online</p>
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
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-[13px] shadow-sm ${
                    m.mine
                      ? "rounded-br-sm bg-brand-100 text-ink-900"
                      : "rounded-bl-sm bg-white text-ink-900"
                  }`}
                >
                  {m.title && (
                    <p className="mb-0.5 font-semibold text-brand-700">
                      {m.title}
                    </p>
                  )}
                  <p>{m.body}</p>
                  <p className="mt-1 text-right text-[10px] text-ink-800/40">
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
