import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ingles20min.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vocaboost — Rumo à fluência: +300 palavras em inglês em 21 dias",
  description:
    "A maneira mais inteligente de construir disciplina e expandir seu vocabulário em inglês. Lições diárias no WhatsApp, método de 21 dias e uma comunidade que te mantém no ritmo.",
  keywords: [
    "aprender inglês",
    "vocabulário em inglês",
    "inglês em 21 dias",
    "inglês no whatsapp",
    "fluência em inglês",
    "vocaboost",
  ],
  openGraph: {
    title: "Vocaboost — Rumo à fluência",
    description:
      "Construa disciplina e expanda seu vocabulário em inglês com lições diárias no WhatsApp. Método de 21 dias.",
    url: siteUrl,
    siteName: "Vocaboost",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vocaboost — Rumo à fluência",
    description:
      "Construa disciplina e expanda seu vocabulário em inglês com lições diárias no WhatsApp.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${archivo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
