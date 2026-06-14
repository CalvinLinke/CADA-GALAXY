import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns — Webagentur CADA Galaxy aus Dresden",
  description: "CADA Galaxy ist eine Webagentur aus Dresden, spezialisiert auf 3D-Weberlebnisse, Next.js-Entwicklung und maximale Performance. Für Unternehmen in Deutschland.",
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "Über CADA Galaxy",
  "url": "https://cada-galaxy.de/ueber-uns",
  "description": "CADA Galaxy ist eine Webagentur aus Dresden, spezialisiert auf 3D-Weberlebnisse, Next.js-Entwicklung und maximale Performance.",
  "about": { "@id": "https://cada-galaxy.de/#organization" },
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://cada-galaxy.de" },
      { "@type": "ListItem", "position": 2, "name": "Über uns", "item": "https://cada-galaxy.de/ueber-uns" },
    ],
  },
};

export default function UeberUnsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      {children}
    </>
  );
}
