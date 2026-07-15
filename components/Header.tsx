"use client";

import Link from "next/link";
import { useState } from "react";
import { FREE_GROUP_URL } from "@/lib/links";

type NavLink = { href: string; label: string; desc?: string };
type NavGroup = { label: string; children: NavLink[] };
type NavItem = NavLink | NavGroup;

const NAV: NavItem[] = [
  { href: "/#metodo", label: "O método" },
  { href: "/#beneficios", label: "Benefícios" },
  { href: "/curso", label: "Curso" },
  {
    label: "Conteúdo",
    children: [
      {
        href: "/aprenda",
        label: "Guias grátis",
        desc: "Vocabulário, números, cores e listas prontas",
      },
      {
        href: "/blog",
        label: "Blog",
        desc: "Artigos e dicas de inglês toda semana",
      },
    ],
  },
  { href: FREE_GROUP_URL, label: "Testar grátis" },
  { href: "/#planos", label: "Planos" },
  { href: "/#duvidas", label: "Dúvidas" },
];

function isGroup(item: NavItem): item is NavGroup {
  return "children" in item;
}

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
          {NAV.map((item) =>
            isGroup(item) ? (
              <div key={item.label} className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-1 text-sm font-medium text-white/70 transition group-hover:text-accent-400"
                >
                  {item.label}
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3 w-3 transition group-hover:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a1 1 0 011.41 0L10 10.59l3.36-3.38a1 1 0 111.42 1.4l-4.07 4.09a1 1 0 01-1.42 0L5.23 8.61a1 1 0 010-1.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="w-72 rounded-2xl border border-white/10 bg-navy-900/95 p-2 shadow-xl backdrop-blur">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-xl px-3 py-2.5 transition hover:bg-white/5"
                      >
                        <span className="block text-sm font-semibold text-white">
                          {child.label}
                        </span>
                        {child.desc && (
                          <span className="mt-0.5 block text-xs text-white/60">
                            {child.desc}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-white/70 transition hover:text-accent-400"
              >
                {item.label}
              </a>
            )
          )}
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
            {NAV.map((item) =>
              isGroup(item) ? (
                <div
                  key={item.label}
                  className="border-b border-white/5 py-2 last:border-0"
                >
                  <span className="block py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                    {item.label}
                  </span>
                  {item.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 pl-3 text-sm font-medium text-white/80 hover:text-accent-400"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/5 py-3 text-sm font-medium text-white/80 last:border-0 hover:text-accent-400"
                >
                  {item.label}
                </a>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
