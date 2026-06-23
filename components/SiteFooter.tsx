"use client";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";

export function SiteFooter() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const nav = t.nav;
  const f = t.footer;

  const linkStyle: React.CSSProperties = {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "var(--muted)",
    transition: "color 0.2s",
    textDecoration: "none",
  };

  const navLinks = [
    { href: "/leistungen", label: nav.leistungen },
    { href: "/prozess", label: nav.prozess },
    { href: "/technologie", label: nav.technologie },
    { href: "/faq", label: nav.faq },
    { href: "/referenzen", label: nav.referenzen },
    { href: "/ueber-uns", label: lang === "de" ? "Über uns" : "About" },
    { href: "/kontakt", label: nav.kontakt },
  ];

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        borderTop: "1px solid var(--line)",
        background: "rgba(13,17,42,0.65)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
      }}
    >
      {/* Main row */}
      <div
        style={{
          padding: `clamp(32px, 5vh, 52px) ${px}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: "clamp(24px, 4vw, 48px)",
        }}
      >
        {/* Brand */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            CADA Galaxy
          </Link>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: 8,
            }}
          >
            {f.tagline}
          </p>
          <a
            href={`mailto:${f.email}`}
            className="accent-box"
            style={{
              ...linkStyle,
              display: "inline-block",
              marginTop: 12,
              color: "var(--accent)",
              fontSize: 12,
              letterSpacing: "0.08em",
              textTransform: "none",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.75"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          >
            {f.email}
          </a>
        </div>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "clamp(12px, 2vw, 28px)",
            alignItems: "center",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              style={linkStyle}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Bottom row */}
      <div
        style={{
          padding: `14px ${px}`,
          borderTop: "1px solid var(--line)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
          }}
        >
          {f.copyright}
        </span>
        <div style={{ display: "flex", gap: "clamp(16px, 2vw, 28px)" }} className="footer-bottom-links">
          <Link
            href="/impressum"
            style={{ ...linkStyle, fontSize: 10 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
          >
            {f.impressum}
          </Link>
          <Link
            href="/datenschutz"
            style={{ ...linkStyle, fontSize: 10 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
          >
            {f.datenschutz}
          </Link>
          <Link
            href="/sitemap-html"
            style={{ ...linkStyle, fontSize: 10 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
          >
            Sitemap
          </Link>
        </div>
      </div>
    </footer>
  );
}
