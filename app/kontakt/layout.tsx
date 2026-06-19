import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt — Webagentur CADA Galaxy anfragen",
  description: "Projekt anfragen bei CADA Galaxy — Webagentur in Dresden. Landingpages ab €1.000, Unternehmenswebsites ab €2.500. Antwort innerhalb von 24 Stunden.",
  alternates: { canonical: "https://cada-galaxy.de/kontakt" },
  openGraph: {
    title: "Kontakt — Webagentur CADA Galaxy anfragen",
    description: "Projekt anfragen bei CADA Galaxy — Webagentur in Dresden. Landingpages ab €1.000, Unternehmenswebsites ab €2.500. Antwort innerhalb von 24 Stunden.",
    url: "https://cada-galaxy.de/kontakt",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://cada-galaxy.de" },
    { "@type": "ListItem", "position": 2, "name": "Kontakt", "item": "https://cada-galaxy.de/kontakt" },
  ],
};

export default function KontaktLayout({ children }: { children: React.ReactNode }) {
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
