import type { Metadata } from "next";
import { Saira_Condensed, Barlow, Space_Mono } from "next/font/google";
import "./globals.css";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "CADA Galaxy",
  description: "Eine neue Dimension digitaler Gestaltung — in Bewegung, in Tiefe, in Orbit.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="de"
      className={`${saira.variable} ${barlow.variable} ${spaceMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
