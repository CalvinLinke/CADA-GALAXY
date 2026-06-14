import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Angaben gemäß § 5 TMG — CADA Galaxy.",
};

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
