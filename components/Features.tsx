const cards = [
  {
    num: "01",
    title: "Strategie",
    text: "Positionierung, Markenkern und digitale Roadmaps, die Richtung geben — bevor die erste Pixel-Grenze gezogen wird.",
  },
  {
    num: "02",
    title: "Design",
    text: "Interfaces und visuelle Systeme mit Haltung. Reduziert, präzise und auf jedem Viewport in Balance.",
  },
  {
    num: "03",
    title: "Entwicklung",
    text: "Performante Frontends, 3D und Motion. Vom Konzept bis zum Launch — technisch sauber, spürbar lebendig.",
  },
];

export function Features() {
  return (
    <section
      id="leistungen"
      className="section"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        padding: "clamp(90px, 12vh, 160px) clamp(22px, 5vw, 90px)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Section head */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 30,
          marginBottom: 64,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: 16,
            }}
          >
            / Leistungen
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              textTransform: "uppercase",
              fontSize: "clamp(2.4rem, 5vw, 4.4rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              maxWidth: "14ch",
            }}
          >
            Gebaut für den Orbit
          </h2>
        </div>
        <p
          style={{
            color: "var(--muted)",
            maxWidth: "38ch",
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Drei Disziplinen, ein System. Wir verbinden Strategie, Gestaltung und
          Technologie zu Erlebnissen mit Anziehungskraft.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "var(--line)",
          border: "1px solid var(--line)",
        }}
        className="features-grid"
      >
        {cards.map((c) => (
          <div key={c.num} className="feature-card">
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                color: "var(--accent)",
                letterSpacing: "0.2em",
              }}
            >
              {c.num}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                textTransform: "uppercase",
                fontSize: "2rem",
                margin: "22px 0 14px",
                letterSpacing: "0.01em",
              }}
            >
              {c.title}
            </h3>
            <p
              style={{
                color: "var(--muted)",
                fontWeight: 300,
                lineHeight: 1.65,
                fontSize: 15,
              }}
            >
              {c.text}
            </p>
            {/* glyph */}
            <div
              style={{
                marginTop: 30,
                width: 46,
                height: 46,
                border: "1px solid var(--line)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 10px var(--accent)",
                  display: "block",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) { .features-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
