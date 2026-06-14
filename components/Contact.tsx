"use client";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export function Contact() {
  const { lang } = useLanguage();
  const t = translations[lang].contactSection;

  return (
    <section
      id="kontakt"
      className="section contact-section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        padding: "clamp(90px, 14vh, 180px) clamp(22px, 5vw, 90px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "var(--accent)",
          marginBottom: 28,
        }}
      >
        {t.eyebrow}
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          textTransform: "uppercase",
          fontSize: "clamp(2.8rem, 8vw, 7rem)",
          lineHeight: 0.88,
          letterSpacing: "-0.01em",
          position: "relative",
        }}
      >
        {t.h2_1}
        <br />
        {t.h2_2}
      </h2>

      <a
        href="mailto:info@cada-galaxy.de"
        style={{
          marginTop: 40,
          display: "inline-flex",
          alignItems: "center",
          gap: 14,
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(14px, 2vw, 20px)",
          letterSpacing: "0.1em",
          color: "var(--ink)",
          borderBottom: "1px solid var(--accent)",
          paddingBottom: 8,
          transition: "color 0.25s",
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
      >
        info@cada-galaxy.de
      </a>
    </section>
  );
}
