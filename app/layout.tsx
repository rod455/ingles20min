import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import Script from "next/script";
import GtagClicks from "@/components/GtagClicks";
import PageViewTracker from "@/components/PageViewTracker";
import ExperimentsInit from "@/components/ExperimentsInit";
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
  title: "Vocaboost — Inglês no WhatsApp: 10 minutos por dia, de segunda a sexta",
  description:
    "Aprenda inglês com uma lição prática por dia útil, direto no WhatsApp. O mesmo método dos poliglotas — frases reais, chunks e shadowing — com áudios, conversação e chat com IA pra tirar dúvidas.",
  keywords: [
    "aprender inglês",
    "vocabulário em inglês",
    "inglês em 21 dias",
    "inglês no whatsapp",
    "fluência em inglês",
    "método de poliglotas",
    "vocaboost",
  ],
  openGraph: {
    title: "Vocaboost — Inglês no WhatsApp, 10 min por dia",
    description:
      "Uma lição prática por dia útil no WhatsApp, com o método dos poliglotas: frases reais, chunks e shadowing — mais áudios, conversação e chat com IA.",
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
  verification: {
    google: "1hzRRmoDvPWZbvYwOokRxD_OXrg-bjjs2nSBwqH9at8",
  },
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
  // Meta Pixel do Vocaboost (ID público, criado na conta de anúncios Triplyze).
  // Env var permite trocar sem deploy; o padrão mantém o pixel ativo.
  const metaPixelId =
    process.env.NEXT_PUBLIC_META_PIXEL_ID || "1041422381678530";
  return (
    <html lang="pt-BR" className={`${inter.variable} ${archivo.variable}`}>
      <head>
        {/* Acelera o 1º beacon/gtag: abre a conexão antes de precisar dela. */}
        <link rel="preconnect" href="https://n8n.vocaboost.com.br" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        {metaPixelId && (
          <link rel="preconnect" href="https://connect.facebook.net" />
        )}
      </head>
      <body>
        {/*
          page_view "cedo": dispara ANTES da hidratação do React, direto no
          carregamento. Assim um clique de anúncio que sai rápido no mobile
          ainda é contado (o PageViewTracker só roda depois de hidratar e
          perdia esses bounces — principal causa da perda clique→pageview).
          Captura gclid/utm para atribuição de tráfego pago.
        */}
        <Script id="pv-early" strategy="beforeInteractive">
          {`(function(){try{var p=new URLSearchParams(location.search),m={};var s=p.get('utm_source');if(s)m.utm_source=s;var c=p.get('utm_campaign');if(c)m.utm_campaign=c;if(p.get('gclid'))m.gclid=true;if(document.referrer){try{var r=new URL(document.referrer);if(r.host!==location.host)m.referrer=r.host;}catch(e){}}var b=JSON.stringify({event:'page_view',path:location.pathname,meta:m});var u='https://n8n.vocaboost.com.br/webhook/site-track';if(navigator.sendBeacon){navigator.sendBeacon(u,b);}else{fetch(u,{method:'POST',body:b,keepalive:true}).catch(function(){});}window.__vbPvSent=location.pathname;}catch(e){}})();`}
        </Script>
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
            gtag('config', 'G-P103ZNJR58');
          `}
        </Script>
        {metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
        <GtagClicks />
        <PageViewTracker />
        <ExperimentsInit />
        <JsonLd data={orgJsonLd} />
        <JsonLd data={siteJsonLd} />
        {children}
      </body>
    </html>
  );
}
