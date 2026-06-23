"use client";
import { SubpageLayout } from "@/components/SubpageLayout";
import { CtaLink } from "@/components/CtaLink";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

export default function LeistungenPage() {
  const { lang } = useLanguage();
  const t = translations[lang].leistungen;
  const navT = translations[lang].nav;

  return (
    <SubpageLayout>
      {/* Hero */}
      <section
        style={{
          padding: `${sectionPad} ${px}`,
          borderBottom: "1px solid var(--line)",
        }}
      >
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

      {/* Service items */}
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.items.map((item, i) => (
            <div
              key={item.num}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "clamp(24px, 4vw, 60px)",
                padding: "clamp(36px, 5vh, 56px) 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === t.items.length - 1 ? "1px solid var(--line)" : "none",
              }}
              className="leistung-row"
            >
              <div
                className="accent-box"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                  paddingTop: 4,
                }}
              >
                {item.num}
              </div>
              <div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
                    letterSpacing: "-0.01em",
                    marginBottom: 16,
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
                    maxWidth: "44ch",
                  }}
                >
                  {item.desc}
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {item.details.map((d) => (
                  <div
                    key={d}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                    }}
                  >
                    <span
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "var(--accent)",
                        flexShrink: 0,
                      }}
                    />
                    {d}
                  </div>
                ))}
              </div>
            </div>
          ))}
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
          {t.cta_label}?
        </h3>
        <CtaLink href="/kontakt">{navT.kontakt}</CtaLink>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .leistung-row { grid-template-columns: 50px 1fr !important; }
          .leistung-row > div:last-child { grid-column: 2; }
        }
        @media (max-width: 480px) {
          .leistung-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </SubpageLayout>
  );
}
