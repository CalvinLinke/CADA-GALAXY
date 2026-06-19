import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Kosten, Ablauf & Technologie",
  description: "Was kostet eine Website? Wie läuft ein Projekt ab? Alle Fragen zur Webagentur CADA Galaxy in Dresden — mit klaren Antworten zu Preisen, Technologie und Ablauf.",
  alternates: { canonical: "https://cada-galaxy.de/faq" },
  openGraph: {
    title: "FAQ — Kosten, Ablauf & Technologie — CADA Galaxy",
    description: "Was kostet eine Website? Wie läuft ein Projekt ab? Alle Fragen zur Webagentur CADA Galaxy in Dresden — mit klaren Antworten zu Preisen, Technologie und Ablauf.",
    url: "https://cada-galaxy.de/faq",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Wie läuft ein Projekt typischerweise ab?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir starten mit einem kostenlosen Erstgespräch, in dem wir Ziele, Zeitrahmen und Budget klären. Danach folgen vier Phasen: Analyse & Kartierung, Design & Entwicklung und Launch & Orbit — transparent, mit klaren Meilensteinen und zwei Feedback-Runden.",
      },
    },
    {
      "@type": "Question",
      "name": "Was kostet eine Website bei CADA Galaxy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Einfache Landingpages starten ab ca. 1.000 €, vollständige Unternehmenswebsites beginnen bei 2.500 €. 3D-Projekte und individuelle Entwicklungen werden nach Aufwand kalkuliert. Kontaktiere uns für ein konkretes Angebot.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie lange dauert ein Webprojekt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Eine einfache Landingpage ist in 2–3 Wochen fertig. Größere Projekte mit individuellem Design und Entwicklung dauern typischerweise 4–8 Wochen. Die durchschnittliche Projektdauer bei CADA Galaxy beträgt rund 3 Wochen.",
      },
    },
    {
      "@type": "Question",
      "name": "Was macht CADA Galaxy anders als andere Agenturen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CADA Galaxy ist eine der wenigen Agenturen, die echte 3D- und Motion-Erlebnisse mit solider Strategie und klassischem Webdesign verbindet. Kein Template-Einsatz, keine Baukästen — jedes Projekt wird von Grund auf neu gebaut. Dazu: konsequent auf Spitzen-Performance optimiert.",
      },
    },
    {
      "@type": "Question",
      "name": "Kann ich meine bestehende Website modernisieren lassen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. CADA Galaxy bietet sowohl optische Modernisierung (neues Design, gleiche Struktur) als auch inhaltliche Überarbeitung (Texte, SEO, Struktur). Manchmal reicht auch ein gezielter Teilbereich — das klären wir im Briefing.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Technologien werden eingesetzt?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir bauen auf Next.js, React, TypeScript und Tailwind CSS. Für 3D- und Motion-Projekte kommen Three.js, React Three Fiber und Framer Motion hinzu. Hosting läuft über Vercel auf globalem Edge-Network.",
      },
    },
    {
      "@type": "Question",
      "name": "Liefert ihr auch Texte und Bilder?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Auf Wunsch ja. Wir können Texte erstellen oder überarbeiten und professionelles Bildmaterial beschaffen oder empfehlen. Das klären wir im Briefing.",
      },
    },
    {
      "@type": "Question",
      "name": "Gibt es eine Nachbetreuung nach dem Launch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Jedes Projekt beinhaltet 30 Tage Nachbetreuung nach dem Launch — für Korrekturen, kleine Anpassungen und technische Fragen. Darüber hinaus bieten wir langfristige Wartungspakete an.",
      },
    },
    {
      "@type": "Question",
      "name": "Wo befindet sich CADA Galaxy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CADA Galaxy (CADA Invest GmbH) hat seinen Sitz in Dresden: Glashütter Str. 53, 01309 Dresden. Wir betreuen Kunden in ganz Deutschland — die Zusammenarbeit läuft vollständig remote.",
      },
    },
    {
      "@type": "Question",
      "name": "Betreut ihr auch Kunden außerhalb von Dresden?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, unsere Kunden kommen aus ganz Deutschland. Die Zusammenarbeit läuft vollständig remote — vom Erstgespräch bis zum Launch. Unser Standort ist Dresden, unsere Reichweite ist national.",
      },
    },
    {
      "@type": "Question",
      "name": "Macht ihr auch Online-Shops oder E-Commerce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Unser Fokus liegt auf performanten Unternehmenswebsites, Landingpages, 3D-Erlebnissen und Brand-Projekten. E-Commerce-Projekte besprechen wir gerne im Einzelfall — kontaktiere uns für eine individuelle Einschätzung.",
      },
    },
    {
      "@type": "Question",
      "name": "Kann ich meinen bestehenden Domain behalten?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja, natürlich. Wir übernehmen die neue Website auf deinen bestehenden Domain. Domain-Umzug und DNS-Konfiguration sind Teil unseres Launch-Prozesses.",
      },
    },
    {
      "@type": "Question",
      "name": "Wie viele Revisionsrunden sind inbegriffen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Im Standard-Prozess sind zwei Feedback-Runden enthalten — eine nach dem ersten Designentwurf, eine nach der Umsetzung. So bleibt das Projekt effizient ohne Qualitätsverlust.",
      },
    },
    {
      "@type": "Question",
      "name": "Bietet ihr auch SEO an?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Jede von uns gebaute Website erhält ein solides technisches SEO-Fundament: saubere Code-Struktur, schnelle Ladezeiten (Lighthouse 100), strukturierte Daten und suchmaschinenfreundliche Architektur. Umfangreiches Content-SEO und laufendes SEO-Marketing bieten wir auf Anfrage an.",
      },
    },
    {
      "@type": "Question",
      "name": "Was unterscheidet euren Prozess von anderen Agenturen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Transparenz, Geschwindigkeit und direkte Kommunikation. Kein Agentur-Overhead, keine langen Wartelisten. Vom Erstgespräch bis zur Fertigstellung dauert ein typisches Projekt bei uns ∅ 3 Wochen — mit zwei festen Feedback-Runden und klaren Meilensteinen.",
      },
    },
    {
      "@type": "Question",
      "name": "Welche Branchen betreut ihr?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wir haben Erfahrung mit Immobilien, B2B-Dienstleistungen, Telekommunikation und regionalen Unternehmen. Grundsätzlich arbeiten wir branchenübergreifend — entscheidend ist, ob das Projekt zu unserem Ansatz passt.",
      },
    },
  ],
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
