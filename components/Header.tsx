"use client";

import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/#metodo", label: "O método" },
  { href: "/#beneficios", label: "Benefícios" },
  { href: "/curso", label: "Curso" },
  { href: "/aprenda", label: "Aprenda grátis" },
  { href: "/#gratis", label: "Testar grátis" },
  { href: "/#planos", label: "Planos" },
  { href: "/#duvidas", label: "Dúvidas" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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

        <div className="flex items-center gap-2">
          <Link
            href="#planos"
            data-gtag-event="header_quero_comecar"
            className="btn-primary px-5 py-2.5 text-sm"
          >
            Quero começar
          </Link>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M4.3 4.3a1 1 0 011.4 0L10 8.6l4.3-4.3a1 1 0 111.4 1.4L11.4 10l4.3 4.3a1 1 0 01-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 01-1.4-1.4L8.6 10 4.3 5.7a1 1 0 010-1.4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 4a1 1 0 100 2h12a1 1 0 100-2H4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-navy-900/95 backdrop-blur md:hidden">
          <div className="container-px flex flex-col py-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/5 py-3 text-sm font-medium text-white/80 last:border-0 hover:text-accent-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
