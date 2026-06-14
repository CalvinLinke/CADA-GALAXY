"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cadagalaxy-consent")) {
      setVisible(true);
    }
    const onOpen = () => {
      localStorage.removeItem("cadagalaxy-consent");
      setVisible(true);
    };
    window.addEventListener("cadagalaxy-open-banner", onOpen);
    return () => window.removeEventListener("cadagalaxy-open-banner", onOpen);
  }, []);

  function accept() {
    localStorage.setItem("cadagalaxy-consent", "all");
    window.dispatchEvent(new Event("cadagalaxy-consent"));
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cadagalaxy-consent", "necessary");
    window.dispatchEvent(new Event("cadagalaxy-consent"));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(5,5,7,0.97)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid var(--line)",
        padding: "18px clamp(22px, 5vw, 90px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "clamp(12px, 2vw, 24px)",
      }}
      className="cookie-banner-inner"
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "var(--muted)",
          lineHeight: 1.6,
          maxWidth: "70ch",
          margin: 0,
        }}
      >
        Diese Website nutzt Google Maps zur Karteneinbettung, was Daten an Google überträgt.
        Durch »Akzeptieren« erteilen Sie Ihre Einwilligung (DSGVO Art. 6 I a / TTDSG §25).{" "}
        <Link
          href="/datenschutz"
          style={{ color: "var(--accent)", textDecoration: "none" }}
        >
          Datenschutz
        </Link>
      </p>

      <div style={{ display: "flex", gap: 12, flexShrink: 0 }} className="cookie-banner-btns">
        <button
          onClick={decline}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "var(--muted)",
            background: "transparent",
            border: "1px solid var(--line)",
            padding: "10px 20px",
            cursor: "pointer",
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--muted)";
            (e.currentTarget as HTMLElement).style.color = "var(--ink)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
            (e.currentTarget as HTMLElement).style.color = "var(--muted)";
          }}
        >
          Nur notwendige
        </button>
        <button
          onClick={accept}
          className="cta-orbit-btn"
          style={{ padding: "10px 22px", fontSize: 11 }}
        >
          Akzeptieren
        </button>
      </div>
    </div>
  );
}
