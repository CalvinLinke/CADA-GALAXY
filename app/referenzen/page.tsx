"use client";
import Image from "next/image";
import { SubpageLayout } from "@/components/SubpageLayout";
import { CtaLink } from "@/components/CtaLink";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const px = "clamp(22px, 5vw, 90px)";
const sectionPad = "clamp(80px, 11vh, 140px)";

export default function ReferenzenPage() {
  const { lang } = useLanguage();
  const t = translations[lang].referenzen;
  const navT = translations[lang].nav;

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
        <p style={{ color: "var(--muted)", maxWidth: "50ch", fontWeight: 300, lineHeight: 1.65, fontSize: "clamp(15px, 1.4vw, 18px)" }}>
          {t.desc}
        </p>
      </section>

      {/* Projects */}
      <section style={{ padding: `${sectionPad} ${px}` }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 1, background: "var(--line)", border: "1px solid var(--line)" }}>
          {t.projects.map((project, i) => (
            <div
              key={project.title}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0,
                background: "var(--bg)",
              }}
              className="ref-row"
            >
              {/* Image */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "16/9",
                  overflow: "hidden",
                  order: i % 2 === 0 ? 0 : 1,
                }}
                className="ref-img"
              >
                <Image
                  src={project.img}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover", transition: "transform 0.6s ease" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "clamp(40px, 6vh, 64px) clamp(28px, 4vw, 56px)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  order: i % 2 === 0 ? 1 : 0,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: 16,
                  }}
                >
                  {project.category}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontSize: "clamp(1.8rem, 2.6vw, 2.8rem)",
                    letterSpacing: "-0.01em",
                    marginBottom: 16,
                  }}
                >
                  {project.title}
                </h2>
                <p
                  style={{
                    color: "var(--muted)",
                    fontWeight: 300,
                    lineHeight: 1.65,
                    fontSize: 15,
                    marginBottom: 28,
                    maxWidth: "36ch",
                  }}
                >
                  {project.desc}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--ink)",
                    borderBottom: "1px solid var(--accent)",
                    paddingBottom: 4,
                    width: "fit-content",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                >
                  {t.project_label}
                  <span className="cta-arrow" style={{ width: 20 }} />
                </a>
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
        @media (max-width: 768px) {
          .ref-row { grid-template-columns: 1fr !important; }
          .ref-img { order: 0 !important; }
          .ref-row > div:last-child { order: 1 !important; }
        }
      `}</style>
    </SubpageLayout>
  );
}
