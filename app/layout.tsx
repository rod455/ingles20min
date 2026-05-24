import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vocaboost.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Vocaboost — Inglês em 20 minutos por dia, direto no seu WhatsApp",
  description:
    "Receba lições diárias de inglês no seu WhatsApp e aprenda de verdade em 20 minutos por dia. Vocabulário, áudios e expressões reais com uma comunidade que te mantém no ritmo.",
  keywords: [
    "aprender inglês",
    "inglês no whatsapp",
    "inglês diário",
    "vocabulário em inglês",
    "curso de inglês online",
  ],
  openGraph: {
    title: "Vocaboost — Inglês em 20 minutos por dia",
    description:
      "Lições diárias de inglês no seu WhatsApp. Aprenda de verdade, no seu ritmo, com a ajuda de uma comunidade.",
    url: siteUrl,
    siteName: "Vocaboost",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vocaboost — Inglês em 20 minutos por dia",
    description:
      "Lições diárias de inglês no seu WhatsApp. Aprenda de verdade, no seu ritmo.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
