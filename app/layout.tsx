import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import Script from "next/script";
import GtagClicks from "@/components/GtagClicks";
import JsonLd from "@/components/JsonLd";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vocaboost.com.br";

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
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Vocaboost",
  url: siteUrl,
  description:
    "Plataforma para aprender inglês com lições diárias no WhatsApp. Método focado em constância: vocabulário, gramática, listening e conversação, todos os dias.",
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Vocaboost",
  url: siteUrl,
  inLanguage: "pt-BR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${archivo.variable}`}>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18261023654"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18261023654');
          `}
        </Script>
        <GtagClicks />
        <JsonLd data={orgJsonLd} />
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  );
}
