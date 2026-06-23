"use client";
import { useState } from "react";
import { SubpageLayout } from "@/components/SubpageLayout";
import { CtaLink } from "@/components/CtaLink";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid var(--line)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          padding: "clamp(20px, 3vh, 28px) 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            textTransform: "uppercase",
            fontSize: "clamp(1rem, 1.6vw, 1.4rem)",
            letterSpacing: "0.01em",
            color: "var(--ink)",
          }}
        >
          {q}
        </span>
        <span
          style={{
            width: 28,
            height: 28,
            border: "1px solid var(--line)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--accent)",
            fontFamily: "var(--font-mono)",
            fontSize: 18,
            flexShrink: 0,
            transition: "transform 0.25s",
            transform: open ? "rotate(45deg)" : "none",
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div
          style={{
            paddingBottom: "clamp(20px, 3vh, 28px)",
            color: "var(--muted)",
            fontWeight: 300,
            lineHeight: 1.7,
            fontSize: 15,
            maxWidth: "60ch",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  const { lang } = useLanguage();
  const t = translations[lang].faq;
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
        <p style={{ color: "var(--muted)", maxWidth: "50ch", fontWeight: 300, lineHeight: 1.65, fontSize: "clamp(15px, 1.4vw, 18px)" }}>
          {t.desc}
        </p>
      </section>

      {/* FAQ accordion */}
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div style={{ maxWidth: 900 }}>
          {t.items.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
          <div style={{ borderTop: "1px solid var(--line)" }} />
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
    </SubpageLayout>
  );
}
