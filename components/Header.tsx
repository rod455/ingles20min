import Link from "next/link";

const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100/70 bg-white/80 backdrop-blur">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-ink-900">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">
            V
          </span>
          <span className="text-lg tracking-tight">
            Voca<span className="text-brand-600">boost</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-800/70 transition hover:text-brand-600"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link href="#planos" className="btn-primary px-5 py-2.5 text-sm">
          Quero começar
        </Link>
      </div>
    </header>
  );
}
