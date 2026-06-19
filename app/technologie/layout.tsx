import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech-Stack — Next.js, Three.js & TypeScript",
  description: "Der Tech-Stack der Webagentur CADA Galaxy: Next.js, Three.js, TypeScript, Tailwind CSS, Framer Motion, Vercel — auf Spitzen-Performance optimiert.",
  alternates: { canonical: "https://cada-galaxy.de/technologie" },
  openGraph: {
    title: "Tech-Stack — Next.js, Three.js & TypeScript — CADA Galaxy",
    description: "Der Tech-Stack der Webagentur CADA Galaxy: Next.js, Three.js, TypeScript, Tailwind CSS, Framer Motion, Vercel — auf Spitzen-Performance optimiert.",
    url: "https://cada-galaxy.de/technologie",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://cada-galaxy.de" },
    { "@type": "ListItem", "position": 2, "name": "Technologie", "item": "https://cada-galaxy.de/technologie" },
  ],
};

export default function TechnologieLayout({ children }: { children: React.ReactNode }) {
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
