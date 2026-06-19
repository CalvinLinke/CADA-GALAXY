import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referenzen — Webprojekte der Webagentur CADA Galaxy",
  description: "Ausgewählte Webprojekte von CADA Galaxy: Immobilien, B2B-Telekommunikation, Redesign — auf Spitzen-Performance optimiert und mit ∅ 3 Wochen Projektdauer.",
  alternates: { canonical: "https://cada-galaxy.de/referenzen" },
  openGraph: {
    title: "Referenzen — Webprojekte der Webagentur CADA Galaxy",
    description: "Ausgewählte Webprojekte von CADA Galaxy: Immobilien, B2B-Telekommunikation, Redesign — auf Spitzen-Performance optimiert und mit ∅ 3 Wochen Projektdauer.",
    url: "https://cada-galaxy.de/referenzen",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://cada-galaxy.de" },
    { "@type": "ListItem", "position": 2, "name": "Referenzen", "item": "https://cada-galaxy.de/referenzen" },
  ],
};

export default function ReferenzenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
