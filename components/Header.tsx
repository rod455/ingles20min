import Link from "next/link";

const NAV = [
  { href: "#metodo", label: "O método" },
  { href: "#beneficios", label: "Benefícios" },
  { href: "#gratis", label: "Testar grátis" },
  { href: "#planos", label: "Planos" },
  { href: "#duvidas", label: "Dúvidas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-900/80 backdrop-blur">
      <div className="container-px flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="leading-none">
            <span className="display block text-xl font-extrabold text-white">
              VOCA<span className="text-brand-500">BOOST</span>
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">
              Rumo à fluência
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/70 transition hover:text-accent-400"
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
