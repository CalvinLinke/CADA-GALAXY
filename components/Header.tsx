"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

function formatClock(seconds: number): string {
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `T+${hh}:${mm}:${ss}`;
}

export function Header() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "26px clamp(22px, 4vw, 56px)",
      }}
    >
      {/* Logo */}
      <a href="#top" aria-label="CADA Galaxy" style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/logo.png"
          alt="CADA Galaxy"
          height={34}
          width={140}
          style={{ height: "34px", width: "auto" }}
          priority
        />
      </a>

      {/* Nav — hidden <1024px */}
      <nav
        style={{
          display: "flex",
          gap: "clamp(20px, 2.6vw, 44px)",
        }}
        className="hidden-nav"
      >
        {(["Leistungen", "Prozess", "Referenzen", "Kontakt"] as const).map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="nav-link"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Status pill — hidden <640px */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          border: "1px solid var(--line)",
          padding: "8px 14px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--muted)",
          background: "rgba(10,10,14,0.4)",
          backdropFilter: "blur(6px)",
        }}
        className="status-pill"
      >
        <span
          style={{
            color: "var(--accent)",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
              animation: "pulse 1.8s infinite",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          LIVE
        </span>
        <span>ORBIT</span>
        <span style={{ color: "var(--ink)" }}>{formatClock(seconds)}</span>
      </div>

      <style>{`
        @media (max-width: 1024px) { .hidden-nav { display: none !important; } }
        @media (max-width: 640px)  { .status-pill { display: none !important; } }
      `}</style>
    </header>
  );
}
