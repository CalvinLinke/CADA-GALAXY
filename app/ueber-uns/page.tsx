"use client";
import Link from "next/link";
import { SubpageLayout } from "@/components/SubpageLayout";
import { CtaLink } from "@/components/CtaLink";
import { useLanguage } from "@/lib/LanguageContext";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

const VALUES_DE = [
  {
    num: "01",
    title: "Kein Template-Denken",
    desc: "Jede Website entsteht von Grund auf neu. Wir entwickeln individuelle Lösungen, die zur Marke und zu den Zielen des Projekts passen — keine Baukästen, keine Kompromisse.",
  },
  {
    num: "02",
    title: "Performance ist Standard",
    desc: "Ein 100/100 Lighthouse Score ist bei uns kein Ausnahmefall, sondern Mindestanforderung. Schnelle Websites ranken besser, konvertieren besser — und fühlen sich besser an.",
  },
  {
    num: "03",
    title: "3D als echtes Werkzeug",
    desc: "3D-Elemente setzen wir dort ein, wo sie echten Mehrwert erzeugen — nicht als Gimmick, sondern als Kommunikationsmittel. Direkt im Browser, ohne Plugins.",
  },
  {
    num: "04",
    title: "Tempo ohne Abstriche",
    desc: "∅ 14 Tage vom Briefing bis zum Launch — das ist kein Marketingversprechen, sondern unser Schnitt. Ermöglicht durch einen klaren Prozess und direkte Kommunikation.",
  },
];

const VALUES_EN = [
  {
    num: "01",
    title: "No template thinking",
    desc: "Every website is built from scratch. We develop individual solutions that fit the brand and project goals — no page builders, no compromises.",
  },
  {
    num: "02",
    title: "Performance is standard",
    desc: "A 100/100 Lighthouse score isn't an exception with us — it's the minimum requirement. Fast websites rank better, convert better and feel better.",
  },
  {
    num: "03",
    title: "3D as a real tool",
    desc: "We use 3D elements where they create genuine value — not as a gimmick, but as a communication tool. Directly in the browser, no plugins required.",
  },
  {
    num: "04",
    title: "Speed without compromise",
    desc: "∅ 14 days from briefing to launch — that's not a marketing promise, it's our average. Made possible by a clear process and direct communication.",
  },
];

const STATS_DE = [
  { value: "100", label: "Lighthouse Score", sub: "Jedes Projekt" },
  { value: "∅ 14", label: "Tage bis Launch", sub: "Vom Briefing bis Go-live" },
  { value: "3", label: "Referenzprojekte", sub: "Immobilien, B2B, Redesign" },
  { value: "2", label: "Sprachen", sub: "Deutsch & Englisch" },
];

const STATS_EN = [
  { value: "100", label: "Lighthouse Score", sub: "Every project" },
  { value: "∅ 14", label: "Days to launch", sub: "From briefing to go-live" },
  { value: "3", label: "Reference projects", sub: "Real estate, B2B, Redesign" },
  { value: "2", label: "Languages", sub: "German & English" },
];

export default function UeberUnsPage() {
  const { lang } = useLanguage();
  const isDE = lang === "de";
  const values = isDE ? VALUES_DE : VALUES_EN;
  const stats = isDE ? STATS_DE : STATS_EN;

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
          {isDE ? "/ Über CADA Galaxy" : "/ About CADA Galaxy"}
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
          {isDE ? "Webagentur aus Dresden" : "Web Agency from Dresden"}
        </h1>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: "52ch",
            fontWeight: 300,
            lineHeight: 1.75,
            fontSize: "clamp(15px, 1.4vw, 18px)",
          }}
        >
          {isDE
            ? "CADA Galaxy ist eine Webagentur aus Dresden, gegründet als CADA Invest GmbH. Wir entwickeln digitale Erlebnisse, die im Gedächtnis bleiben — mit 3D-Web, maximaler Performance und einer durchschnittlichen Projektlaufzeit von 14 Tagen. Für Unternehmen in Deutschland, die mehr wollen als eine Standard-Website."
            : "CADA Galaxy is a web agency from Dresden, founded as CADA Invest GmbH. We develop digital experiences that stick — with 3D web, maximum performance and an average project duration of 14 days. For businesses in Germany that want more than a standard website."}
        </p>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: `clamp(48px, 7vh, 80px) ${px}`,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1,
            background: "var(--line)",
            border: "1px solid var(--line)",
          }}
          className="about-stats-grid"
        >
          {stats.map((s) => (
            <div
              key={s.value}
              style={{
                background: "var(--bg)",
                padding: "clamp(24px, 3.5vh, 40px) clamp(18px, 2.5vw, 32px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(2.2rem, 4vw, 4rem)",
                  lineHeight: 1,
                  color: "var(--accent)",
                  letterSpacing: "-0.02em",
                  marginBottom: 8,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  marginBottom: 4,
                }}
              >
                {s.label}
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
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Was uns ausmacht */}
      <section
        style={{
          padding: `${sectionPad} ${px}`,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="about-split-grid"
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
              {isDE ? "/ Was uns ausmacht" : "/ What defines us"}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
              }}
            >
              {isDE ? "Präzision statt Quantität" : "Precision over quantity"}
            </h2>
          </div>
          <div>
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.8,
                fontSize: "clamp(15px, 1.3vw, 17px)",
              }}
            >
              {isDE
                ? "Wir sind eine spezialisierte Agentur — kein Generalanbieter. Unser Fokus liegt auf Projekten, bei denen visuelle Qualität, technische Exzellenz und kurze Lieferzeiten entscheidend sind. Wer eine Standard-WordPress-Seite braucht, ist woanders besser aufgehoben. Wer eine Website will, die wirklich auffällt — willkommen bei CADA Galaxy."
                : "We are a specialised agency — not a general provider. Our focus is on projects where visual quality, technical excellence and short delivery times are decisive. If you need a standard WordPress site, you'll find better options elsewhere. If you want a website that truly stands out — welcome to CADA Galaxy."}
            </p>
          </div>
        </div>
      </section>

      {/* Werte */}
      <section style={{ padding: `${sectionPad} ${px}`, borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--accent)",
            marginBottom: 48,
          }}
        >
          {isDE ? "/ Unsere Grundsätze" : "/ Our principles"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {values.map((v, i) => (
            <div
              key={v.num}
              style={{
                display: "grid",
                gridTemplateColumns: "60px 1fr 1fr",
                gap: "clamp(20px, 4vw, 60px)",
                padding: "clamp(32px, 4.5vh, 48px) 0",
                borderTop: "1px solid var(--line)",
                borderBottom: i === values.length - 1 ? "1px solid var(--line)" : "none",
              }}
              className="values-row"
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--accent)",
                  letterSpacing: "0.2em",
                  paddingTop: 4,
                }}
              >
                {v.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  fontSize: "clamp(1.4rem, 2vw, 2rem)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                {v.title}
              </h3>
              <p
                style={{
                  color: "var(--muted)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  fontSize: 15,
                }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Standort */}
      <section
        style={{
          padding: `${sectionPad} ${px}`,
          borderBottom: "1px solid var(--line)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 6vw, 80px)",
            alignItems: "start",
          }}
          className="about-split-grid"
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
              {isDE ? "/ Standort & Koordinaten" : "/ Location & coordinates"}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
                lineHeight: 0.92,
                letterSpacing: "-0.01em",
                marginBottom: 24,
              }}
            >
              Dresden, Deutschland
            </h2>
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.8,
                fontSize: "clamp(15px, 1.3vw, 17px)",
              }}
            >
              {isDE
                ? "Unser Büro befindet sich im Dresdner Stadtteil Blasewitz. Projekte betreuen wir für Kunden in ganz Deutschland — vollständig remote, mit klaren Strukturen und kurzen Kommunikationswegen."
                : "Our office is located in the Dresden district of Blasewitz. We work with clients across Germany — fully remote, with clear structures and short communication paths."}
            </p>
          </div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              lineHeight: 2,
              paddingTop: "clamp(0px, 3vh, 40px)",
            }}
          >
            <div style={{ color: "var(--ink)", marginBottom: 4, fontWeight: 700 }}>CADA Invest GmbH</div>
            <div>Glashütter Str. 53</div>
            <div>01309 Dresden</div>
            <div style={{ marginTop: 16 }}>
              <a
                href="mailto:info@cada-galaxy.de"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                info@cada-galaxy.de
              </a>
            </div>
            <div>
              <a
                href="tel:+491621766880"
                style={{ color: "var(--accent)", textDecoration: "none" }}
              >
                +49 162 176 68 80
              </a>
            </div>
            <div style={{ marginTop: 16 }}>
              <span style={{ color: "var(--accent)" }}>51°02′N · 13°47′E</span>
            </div>
          </div>
        </div>
      </section>

      {/* Referenzen Teaser */}
      <section
        style={{
          padding: `${sectionPad} ${px}`,
          borderBottom: "1px solid var(--line)",
        }}
      >
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
          {isDE ? "/ Unsere Arbeit" : "/ Our work"}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 8,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              textTransform: "uppercase",
              fontSize: "clamp(2rem, 3.5vw, 3.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.01em",
            }}
          >
            {isDE ? "Drei Projekte. Drei Branchen." : "Three projects. Three industries."}
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
            {isDE ? "Alle Referenzen" : "All references"} →
          </Link>
        </div>
        <p
          style={{
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.7,
            fontSize: 15,
            maxWidth: "52ch",
            marginTop: 16,
          }}
        >
          {isDE
            ? "Immobilien, B2B-Telekommunikation, Redesign — drei Projekte, die zeigen was möglich ist, wenn Strategie, Design und Entwicklung zusammenwirken."
            : "Real estate, B2B telecommunications, redesign — three projects that show what's possible when strategy, design and development work together."}
        </p>
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
          {isDE ? "Bereit für dein nächstes Webprojekt?" : "Ready for your next web project?"}
        </h3>
        <CtaLink href="/kontakt">
          {isDE ? "Kontakt" : "Contact"}
        </CtaLink>
      </section>

      <style>{`
        @media (max-width: 680px) {
          .about-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .about-split-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .about-stats-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .values-row { grid-template-columns: 40px 1fr !important; }
          .values-row > p { grid-column: 2; }
        }
        @media (max-width: 480px) {
          .values-row { grid-template-columns: 1fr !important; }
          .values-row > p { grid-column: 1; }
        }
      `}</style>
    </SubpageLayout>
  );
}
