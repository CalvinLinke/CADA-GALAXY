import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Angaben gemäß § 5 TMG — CADA Galaxy, eine Marke der CADA Invest GmbH, Dresden.",
  alternates: { canonical: "https://cada-galaxy.de/impressum" },
  openGraph: {
    title: "Impressum — CADA Galaxy",
    description: "Angaben gemäß § 5 TMG — CADA Galaxy, eine Marke der CADA Invest GmbH, Dresden.",
    url: "https://cada-galaxy.de/impressum",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "CADA Galaxy" }],
  },
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
