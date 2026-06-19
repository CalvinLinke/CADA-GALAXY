import type { Metadata } from "next";
import { Saira_Condensed, Barlow, Space_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import { CookieBanner } from "@/components/CookieBanner";
import "./globals.css";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cada-galaxy.de"),
  title: {
    default: "CADA Galaxy — Webagentur Dresden | 3D Web & Performance",
    template: "%s — CADA Galaxy",
  },
  description: "Webagentur in Dresden: 3D Web, auf Spitzen-Performance optimiert, ∅ 3 Wochen bis zur Fertigstellung. Digitale Erlebnisse die im Gedächtnis bleiben — für Unternehmen in Deutschland.",
  openGraph: {
    siteName: "CADA Galaxy",
    locale: "de_DE",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://cada-galaxy.de",
    languages: {
      "de": "https://cada-galaxy.de",
      "x-default": "https://cada-galaxy.de",
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": "https://cada-galaxy.de/#organization",
      "name": "CADA Galaxy",
      "alternateName": "CADA Invest GmbH",
      "url": "https://cada-galaxy.de",
      "logo": {
        "@type": "ImageObject",
        "url": "https://cada-galaxy.de/logo.png",
      },
      "image": "https://cada-galaxy.de/logo.png",
      "description": "CADA Galaxy ist eine Webagentur aus Dresden, spezialisiert auf 3D-Weberlebnisse, maximale Performance und kurze Projektlaufzeiten (∅ 3 Wochen). Für Unternehmen in Deutschland.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Glashütter Str. 53",
        "postalCode": "01309",
        "addressLocality": "Dresden",
        "addressRegion": "Sachsen",
        "addressCountry": "DE",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 51.0479,
        "longitude": 13.7833,
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "09:00",
          "closes": "14:00",
        },
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+49-162-176-68-80",
        "email": "info@cada-galaxy.de",
        "contactType": "customer service",
        "availableLanguage": ["German", "English"],
      },
      "email": "info@cada-galaxy.de",
      "telephone": "+49-162-176-68-80",
      "areaServed": [
        { "@type": "Country", "name": "Deutschland" },
        { "@type": "City", "name": "Dresden" },
        { "@type": "State", "name": "Sachsen" },
      ],
      "serviceType": [
        "Webdesign",
        "Webentwicklung",
        "3D Webdesign",
        "Frontend-Entwicklung",
        "Interface Design",
        "Brand & Corporate Identity",
        "Redesign",
        "Next.js Entwicklung",
      ],
      "priceRange": "€€",
      "foundingLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Dresden",
          "addressCountry": "DE",
        },
      },
      "sameAs": [
        "https://cada-invest.de",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://cada-galaxy.de/#website",
      "url": "https://cada-galaxy.de",
      "name": "CADA Galaxy",
      "description": "Webagentur in Dresden — 3D Web, Spitzen-Performance, ∅ 3 Wochen",
      "publisher": { "@id": "https://cada-galaxy.de/#organization" },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://cada-galaxy.de/faq?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${saira.variable} ${barlow.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
