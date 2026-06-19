import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung von CADA Galaxy gemäß DSGVO.",
  alternates: { canonical: "https://cada-galaxy.de/datenschutz" },
  openGraph: {
    title: "Datenschutz — CADA Galaxy",
    description: "Datenschutzerklärung von CADA Galaxy gemäß DSGVO.",
    url: "https://cada-galaxy.de/datenschutz",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
