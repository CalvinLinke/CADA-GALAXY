export function SiteFooter() {
  return (
    <footer
      style={{
        position: "relative",
        zIndex: 2,
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        padding: "32px clamp(22px, 5vw, 90px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 18,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--muted)",
      }}
    >
      <span style={{ color: "var(--ink)", fontSize: 16 }}>CADA Galaxy</span>
      <span>© 2026 — Made in Orbit</span>
      <span>Imprint · Datenschutz</span>
    </footer>
  );
}
