import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-px flex flex-col items-center justify-between gap-4 py-10 text-sm text-white/60 sm:flex-row">
        <div className="leading-none">
          <span className="display block text-lg font-extrabold text-white">
            VOCA<span className="text-brand-500">BOOST</span>
          </span>
          <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-accent-400">
            Rumo à fluência
          </span>
        </div>
        <p>© {new Date().getFullYear()} Vocaboost. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <Link href="/aprenda" className="hover:text-accent-400">
            Aprenda grátis
          </Link>
          <Link href="/curso" className="hover:text-accent-400">
            Curso
          </Link>
          <Link href="/#planos" className="hover:text-accent-400">
            Planos
          </Link>
        </div>
      </div>
    </footer>
  );
}
