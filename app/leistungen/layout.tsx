import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leistungen — Webdesign & Entwicklung",
  description: "Webdesign, UX, Next.js-Entwicklung, 3D-Web, Brand & CI — alle Leistungen der Webagentur CADA Galaxy. Ab €1.000 für Landingpages, ab €2.500 für Unternehmenswebsites.",
  alternates: { canonical: "https://cada-galaxy.de/leistungen" },
  openGraph: {
    title: "Leistungen — Webdesign & Entwicklung — CADA Galaxy",
    description: "Webdesign, UX, Next.js-Entwicklung, 3D-Web, Brand & CI — alle Leistungen der Webagentur CADA Galaxy. Ab €1.000 für Landingpages, ab €2.500 für Unternehmenswebsites.",
    url: "https://cada-galaxy.de/leistungen",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Leistungen — CADA Galaxy Webagentur",
  "description": "Digitale Leistungen der Webagentur CADA Galaxy: Webdesign, Frontend-Entwicklung, 3D Web, Brand & CI, Redesign.",
  "provider": {
    "@id": "https://cada-galaxy.de/#organization",
  },
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "Service",
        "name": "Strategie & Positionierung",
        "description": "Marken- & Zielgruppenanalyse, Positionierungsworkshop, digitale Roadmap und Kommunikationsstrategie — bevor die erste Linie gezeichnet wird.",
        "provider": { "@id": "https://cada-galaxy.de/#organization" },
        "areaServed": { "@type": "Country", "name": "Deutschland" },
        "serviceType": "Markenstrategie und digitale Positionierung",
      },
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "Service",
        "name": "Interface Design",
        "description": "UX-Konzept, Wireframes, Visual Design & Styleguide, Responsive Layouts und interaktiver Prototyp. Visuell stark, auf jedem Viewport in Balance.",
        "provider": { "@id": "https://cada-galaxy.de/#organization" },
        "areaServed": { "@type": "Country", "name": "Deutschland" },
        "serviceType": "UI/UX Design und Interface Design",
      },
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "Service",
        "name": "Frontend-Entwicklung",
        "description": "Next.js & React, 3D mit Three.js / React Three Fiber, Motion & Animationen, Performance-Optimierung. Auf Spitzen-Performance optimiert.",
        "provider": { "@id": "https://cada-galaxy.de/#organization" },
        "areaServed": { "@type": "Country", "name": "Deutschland" },
        "serviceType": "Frontend-Entwicklung mit Next.js und 3D Web",
        "offers": {
          "@type": "Offer",
          "priceSpecification": {
            "@type": "PriceSpecification",
            "minPrice": "1000",
            "priceCurrency": "EUR",
            "description": "Landingpages ab €1.000, Unternehmenswebsites ab €2.500",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      "position": 4,
      "item": {
        "@type": "Service",
        "name": "Brand & CI",
        "description": "Logo & Markenidentität, Designsystem & Tokens, Briefing-Unterlagen, Templates & Assets. Corporate Identity die kohärent und unverwechselbar macht.",
        "provider": { "@id": "https://cada-galaxy.de/#organization" },
        "areaServed": { "@type": "Country", "name": "Deutschland" },
        "serviceType": "Corporate Identity und Brand Design",
      },
    },
    {
      "@type": "ListItem",
      "position": 5,
      "item": {
        "@type": "Service",
        "name": "Redesign & Modernisierung",
        "description": "Bestandsaufnahme & Audit, optische Modernisierung, inhaltliche Überarbeitung, SEO-Fundament. Bestehende Websites auf Orbit-Standard bringen — ohne Neustart.",
        "provider": { "@id": "https://cada-galaxy.de/#organization" },
        "areaServed": { "@type": "Country", "name": "Deutschland" },
        "serviceType": "Website Redesign und Modernisierung",
      },
    },
  ],
};

export default function LeistungenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
