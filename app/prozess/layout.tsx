import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prozess — 4 Phasen vom Briefing bis Launch",
  description: "Vom Briefing bis zum Launch in ∅ 14 Tagen: der transparente 4-Phasen-Prozess der Webagentur CADA Galaxy — mit klaren Rollen, zwei Feedback-Runden und 30 Tagen Nachbetreuung.",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://cada-galaxy.de" },
    { "@type": "ListItem", "position": 2, "name": "Prozess", "item": "https://cada-galaxy.de/prozess" },
  ],
};

export default function ProzessLayout({ children }: { children: React.ReactNode }) {
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
