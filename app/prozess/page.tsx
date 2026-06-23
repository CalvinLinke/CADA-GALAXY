"use client";
import { SubpageLayout } from "@/components/SubpageLayout";
import { CtaLink } from "@/components/CtaLink";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

export default function ProzessPage() {
  const { lang } = useLanguage();
  const t = translations[lang].prozess;
  const navT = translations[lang].nav;

  return (
    <SubpageLayout>
      {/* Hero */}
      <section style={{ padding: `${sectionPad} ${px}`, borderBottom: "1px solid var(--line)" }}>
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

      {/* Steps */}
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {t.steps.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "clamp(24px, 4vw, 60px)",
                padding: "clamp(40px, 6vh, 64px) 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === t.steps.length - 1 ? "1px solid var(--line)" : "none",
              }}
              className="prozess-row"
            >
              {/* Number */}
              <div style={{ paddingTop: 4 }}>
                <div
                  className="accent-box"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    color: "var(--accent)",
                    letterSpacing: "0.2em",
                    marginBottom: 8,
                  }}
                >
                  {step.num}
                </div>
                <div
                  style={{
                    width: 1,
                    height: "calc(100% - 24px)",
                    background: "var(--line)",
                    marginLeft: 4,
                  }}
                />
              </div>

              {/* Step info */}
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
                  {step.title}
                </h2>
                <p
                  style={{
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                    fontSize: 15,
                    maxWidth: "40ch",
                  }}
                >
                  {step.desc}
                </p>
                <p
                  className="accent-box"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginTop: 14,
                  }}
                >
                  ⊙ {step.duration}
                </p>
              </div>

              {/* Responsibilities */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="resp-grid">
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--muted)",
                      marginBottom: 14,
                      paddingBottom: 10,
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    {t.you_label}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {step.you.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--muted)",
                          lineHeight: 1.4,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: "var(--muted)",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div
                    className="accent-box"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 10,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                      marginBottom: 14,
                      paddingBottom: 10,
                      borderBottom: "1px solid var(--line)",
                    }}
                  >
                    {t.us_label}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {step.us.map((item) => (
                      <div
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 8,
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--ink)",
                          lineHeight: 1.4,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: "var(--accent)",
                            flexShrink: 0,
                            marginTop: 4,
                          }}
                        />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
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
          {navT.cta}
        </h3>
        <CtaLink href="/kontakt">{navT.kontakt}</CtaLink>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .prozess-row { grid-template-columns: 50px 1fr !important; }
          .prozess-row > div:last-child { grid-column: 2; }
          .resp-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .prozess-row { grid-template-columns: 1fr !important; }
          .prozess-row > div:first-child { display: none; }
        }
      `}</style>
    </SubpageLayout>
  );
}
