"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";

export function HomeSections() {
  const { lang } = useLanguage();
  const t = translations[lang];
  const stats = t.stats;
  const homeL = t.homeLeistungen;
  const homeP = t.homeProzess;
  const homeR = t.homeReferenzen;
  const refs = t.referenzen.projects;
  const leistungenItems = t.leistungen.items;

  const [openLeistung, setOpenLeistung] = useState<string | null>(null);

  return (
    <>
      {/* Stats / Kennzahlen */}
      <section
        style={{
          padding: `clamp(48px, 7vh, 80px) ${px}`,
          borderTop: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 32,
          }}
        >
          {stats.eyebrow}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="stats-grid"
        >
          {stats.items.map((item) => (
            <div
              key={item.value}
              style={{
                background: "var(--bg)",
                padding: "clamp(28px, 4vh, 48px) clamp(20px, 3vw, 40px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.8rem, 5vw, 5rem)",
                  lineHeight: 1,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                {item.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen Preview */}
      <section
        style={{
          padding: `clamp(60px, 9vh, 100px) ${px}`,
          borderTop: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 16,
              }}
            >
              {homeL.eyebrow}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
              }}
            >
              {homeL.h2}
            </h2>
          </div>
        </div>

        <div>
          {homeL.items.map((item, i) => {
            const isOpen = openLeistung === item.num;
            const fullItem = leistungenItems[i];
            return (
              <div key={item.num} style={{ borderTop: i === 0 ? "1px solid var(--line)" : "none", borderBottom: "1px solid var(--line)" }}>
                {/* Row trigger */}
                <button
                  onClick={() => setOpenLeistung(isOpen ? null : item.num)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "clamp(18px, 2.5vh, 28px) 0",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "clamp(20px, 3vw, 48px)" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        color: "var(--accent)",
                        textTransform: "uppercase",
                        flexShrink: 0,
                        width: 28,
                      }}
                    >
                      {item.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        fontSize: "clamp(1.1rem, 2vw, 1.8rem)",
                        letterSpacing: "-0.01em",
                        color: isOpen ? "var(--accent)" : "var(--ink)",
                        transition: "color 0.2s",
                      }}
                    >
                      {item.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 16,
                      color: isOpen ? "var(--accent)" : "var(--muted)",
                      transition: "transform 0.25s, color 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      display: "inline-block",
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </button>

                {/* Expanded preview */}
                {isOpen && (
                  <div
                    style={{
                      paddingBottom: "clamp(18px, 2.5vh, 28px)",
                      paddingLeft: "clamp(48px, 5.5vw, 76px)",
                    }}
                  >
                    <p
                      style={{
                        color: "var(--muted)",
                        fontWeight: 300,
                        lineHeight: 1.7,
                        fontSize: "clamp(14px, 1.2vw, 16px)",
                        maxWidth: "60ch",
                        marginBottom: 20,
                      }}
                    >
                      {fullItem.desc}
                    </p>
                    <Link
                      href="/leistungen"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        borderBottom: "1px solid var(--accent)",
                        paddingBottom: 3,
                        transition: "opacity 0.2s",
                      }}
                    >
                      {lang === "de" ? "Zur Leistung" : "Learn more"} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 32 }}>
          <Link
            href="/leistungen"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "opacity 0.2s",
            }}
          >
            {homeL.cta} →
          </Link>
        </div>
      </section>

      {/* Prozess Teaser */}
      <section
        style={{
          padding: `clamp(60px, 9vh, 100px) ${px}`,
          borderTop: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
          }}
        >
          {homeP.eyebrow}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 48 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "clamp(2rem, 4vw, 4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            {homeP.h2}
          </h2>
          <Link
            href="/prozess"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            {homeP.cta} →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="prozess-teaser-grid"
        >
          {homeP.steps.map((step) => (
            <div
              key={step.num}
              style={{
                background: "var(--bg)",
                padding: "clamp(24px, 3.5vh, 40px) clamp(18px, 2.5vw, 32px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                  marginBottom: 18,
                }}
              >
                {step.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
                  letterSpacing: "-0.01em",
                  marginBottom: 8,
                }}
              >
                {step.title}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {step.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Referenzen Teaser */}
      <section
        style={{
          padding: `clamp(60px, 9vh, 100px) ${px}`,
          borderTop: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 16,
          }}
        >
          {homeR.eyebrow}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "clamp(2rem, 4vw, 4rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            {homeR.h2}
          </h2>
          <Link
            href="/referenzen"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--accent)",
              textDecoration: "none",
            }}
          >
            {homeR.cta} →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(16px, 2vw, 28px)",
          }}
          className="ref-teaser-grid"
        >
          {refs.map((ref) => (
            <a
              key={ref.title}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                textDecoration: "none",
                border: "1px solid var(--line)",
                overflow: "hidden",
                transition: "border-color 0.25s",
              }}
              className="ref-teaser-card"
            >
              <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                <Image
                  src={ref.img}
                  alt={ref.title}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div style={{ padding: "clamp(16px, 2vw, 24px)" }}>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 8,
                  }}
                >
                  {ref.category}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
                    color: "var(--ink)",
                  }}
                >
                  {ref.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Über CADA Galaxy — keyword-fokussierter Textblock für SEO */}
      <section
        style={{
          padding: `clamp(60px, 9vh, 100px) ${px}`,
          borderTop: "1px solid var(--line)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="about-text-grid"
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 20,
              }}
            >
              {lang === "de" ? "/ Über uns" : "/ About"}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                marginBottom: 24,
              }}
            >
              {lang === "de" ? "Webagentur aus Dresden" : "Web agency from Dresden"}
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.75,
                fontSize: "clamp(15px, 1.3vw, 17px)",
                maxWidth: "48ch",
              }}
            >
              {lang === "de"
                ? "CADA Galaxy ist eine Webagentur aus Dresden, spezialisiert auf 3D-Weberlebnisse, maximale Performance und kurze Projektlaufzeiten. Wir entwickeln Websites mit Next.js und Three.js — messbar schnell, einzigartig animiert, ∅ 14 Tage vom Briefing bis zum Launch."
                : "CADA Galaxy is a web agency from Dresden, specialising in 3D web experiences, maximum performance and short project timelines. We build websites with Next.js and Three.js — measurably fast, uniquely animated, ∅ 14 days from briefing to launch."}
            </p>
          </div>
          <div
            style={{
              paddingTop: "clamp(0px, 4vh, 48px)",
            }}
          >
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.75,
                fontSize: "clamp(15px, 1.3vw, 17px)",
                maxWidth: "48ch",
                marginBottom: 32,
              }}
            >
              {lang === "de"
                ? "Für Unternehmen in Deutschland, die mit ihrer Website in Erinnerung bleiben wollen. Kein Template, kein Baukasten — jedes Projekt entsteht von Grund auf neu, mit technischer Präzision und gestalterischem Anspruch."
                : "For businesses in Germany that want their website to be remembered. No templates, no page builders — every project is built from scratch, with technical precision and design ambition."}
            </p>
            <Link
              href="/ueber-uns"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--accent)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.2s",
              }}
            >
              {lang === "de" ? "Mehr über CADA Galaxy" : "More about CADA Galaxy"} →
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 680px) {
          .stats-grid { grid-template-columns: 1fr !important; }
          .prozess-teaser-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .ref-teaser-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .prozess-teaser-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 720px) {
          .about-text-grid { grid-template-columns: 1fr !important; }
        }
        .ref-teaser-card:hover {
          border-color: var(--accent);
        }
        .ref-teaser-card:hover img {
          transform: scale(1.03);
        }
      `}</style>
    </>
  );
}
