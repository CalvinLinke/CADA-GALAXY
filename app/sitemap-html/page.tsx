"use client";
import Link from "next/link";
import { SubpageLayout } from "@/components/SubpageLayout";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

const pages = [
  { href: "/",            label: "Startseite" },
  { href: "/leistungen",  label: "Leistungen" },
  { href: "/prozess",     label: "Prozess" },
  { href: "/technologie", label: "Technologie" },
  { href: "/referenzen",  label: "Referenzen" },
  { href: "/faq",         label: "FAQ" },
  { href: "/kontakt",     label: "Kontakt" },
  { href: "/impressum",   label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];

export default function SitemapHtmlPage() {
  const { lang } = useLanguage();
  const nav = translations[lang].nav;

  const labelMap: Record<string, string> = {
    "/":            lang === "de" ? "Startseite" : "Home",
    "/leistungen":  nav.leistungen,
    "/prozess":     nav.prozess,
    "/technologie": nav.technologie,
    "/referenzen":  nav.referenzen,
    "/faq":         nav.faq,
    "/kontakt":     nav.kontakt,
    "/impressum":   lang === "de" ? "Impressum" : "Legal Notice",
    "/datenschutz": lang === "de" ? "Datenschutz" : "Privacy Policy",
  };

  return (
    <SubpageLayout>
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div
          className="accent-box"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          / ÜBERSICHT
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginBottom: 56,
          }}
        >
          SITEMAP
        </h1>

        <div
          style={{
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {pages.map(({ href }) => (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(16px, 2vh, 22px) 0",
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
                color: "var(--ink)",
                transition: "color 0.2s",
              }}
              className="sitemap-row"
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(1rem, 1.8vw, 1.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {labelMap[href]}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                cada-galaxy.de{href === "/" ? "" : href} →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        .sitemap-row:hover { color: var(--accent) !important; }
        .sitemap-row:hover span:last-child { color: var(--accent) !important; }
      `}</style>
    </SubpageLayout>
  );
}
