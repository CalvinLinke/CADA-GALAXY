"use client";
import { SubpageLayout } from "@/components/SubpageLayout";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

export default function ImpressumPage() {
  const { lang } = useLanguage();
  const t = translations[lang].impressum;

  const bodyStyle: React.CSSProperties = {
    color: "var(--muted)",
    fontWeight: 300,
    lineHeight: 1.7,
    fontSize: 15,
    maxWidth: "60ch",
  };

  const h3Style: React.CSSProperties = {
    fontFamily: "var(--font-display)",
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: "clamp(1rem, 1.4vw, 1.3rem)",
    letterSpacing: "0.02em",
    color: "var(--ink)",
    marginBottom: 10,
    marginTop: 36,
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
          / {t.h1}
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "clamp(3rem, 7vw, 7rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            marginBottom: 48,
          }}
        >
          {t.h1}
        </h1>

        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 36 }}>
          <h3 style={h3Style}>{t.angaben}</h3>
          <p style={bodyStyle}>
            <strong style={{ color: "var(--ink)" }}>CADA Invest GmbH</strong><br />
            Glashütter Str. 53<br />
            01309 Dresden<br />
            <br />
            E-Mail: info@cada-galaxy.de<br />
            Tel.: +49 162 176 68 80<br />
            <br />
            Mo–Fr: 08:00 – 18:00 Uhr<br />
            Sa: 09:00 – 14:00 Uhr
          </p>

          <h3 style={{ ...h3Style, marginTop: 24 }}>{t.verantwortlich}</h3>
          <p style={bodyStyle}>[NAME DES VERTRETUNGSBERECHTIGTEN]</p>

          <p style={{ ...bodyStyle, marginTop: 16 }}>
            Handelsregister: HRB 45325<br />
            Registergericht: Amtsgericht Dresden<br />
            USt-IdNr.: [UST-ID]
          </p>

          <h3 style={h3Style}>{t.haftung_title}</h3>
          <p style={bodyStyle}>{t.haftung_text}</p>

          <h3 style={h3Style}>{t.links_title}</h3>
          <p style={bodyStyle}>{t.links_text}</p>

          <h3 style={h3Style}>{t.urheberrecht_title}</h3>
          <p style={bodyStyle}>{t.urheberrecht_text}</p>
        </div>
      </section>
    </SubpageLayout>
  );
}
