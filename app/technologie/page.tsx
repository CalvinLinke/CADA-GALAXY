"use client";
import { SubpageLayout } from "@/components/SubpageLayout";
import { CtaLink } from "@/components/CtaLink";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

export default function TechnologiePage() {
  const { lang } = useLanguage();
  const t = translations[lang].technologie;
  const navT = translations[lang].nav;
  const lh = t.lighthouse;

  return (
    <SubpageLayout>
      {/* Hero */}
      <section style={{ padding: `${sectionPad} ${px}`, borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          {t.eyebrow}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            maxWidth: "18ch",
            marginBottom: 32,
          }}
        >
          {t.h1}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: "50ch",
            fontWeight: 300,
            lineHeight: 1.65,
            fontSize: "clamp(15px, 1.4vw, 18px)",
          }}
        >
          {t.desc}
        </p>
      </section>

      {/* Tech grid */}
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="tech-grid"
        >
          {t.items.map((item) => (
            <div
              key={item.num}
              className="feature-card"
              style={{ padding: "clamp(32px, 4vh, 52px) clamp(24px, 3vw, 44px)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: "var(--accent)",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  }}
                >
                  {item.num}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    border: "1px solid var(--line)",
                    padding: "3px 8px",
                  }}
                >
                  {item.label}
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(1.4rem, 2vw, 2rem)",
                  letterSpacing: "-0.01em",
                  marginBottom: 14,
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  fontWeight: 300,
                  lineHeight: 1.65,
                  fontSize: 15,
                  marginBottom: 22,
                }}
              >
                {item.desc}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      border: "1px solid var(--line)",
                      padding: "4px 10px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lighthouse */}
      <section
        style={{
          padding: `clamp(60px, 9vh, 100px) ${px}`,
          borderTop: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 20,
          }}
        >
          {lh.eyebrow}
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(1.5rem, 2.5vw, 2.6rem)",
            letterSpacing: "-0.01em",
            marginBottom: 16,
            maxWidth: "22ch",
          }}
        >
          {lh.h2}
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.65,
            fontSize: 15,
            maxWidth: "60ch",
            marginBottom: 0,
          }}
        >
          {lh.desc}
        </p>
        <div className="lh-screenshot-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/lighthouse-result.jpg"
            alt="Google PageSpeed Insights Ergebnis: 100 Leistung, 94 Barrierefreiheit, 100 Best Practices, 100 SEO"
            className="lh-screenshot"
          />
          <p className="lh-caption">{lh.caption}</p>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: `clamp(80px, 12vh, 130px) ${px}`,
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 36,
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "clamp(1.6rem, 3vw, 2.8rem)",
            letterSpacing: "-0.01em",
            maxWidth: "26ch",
          }}
        >
          {navT.cta}
        </h3>
        <CtaLink href="/kontakt">{navT.kontakt}</CtaLink>
      </section>

      <style>{`
        @media (max-width: 768px) { .tech-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </SubpageLayout>
  );
}
