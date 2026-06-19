"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

function formatClock(seconds: number): string {
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `T+${hh}:${mm}:${ss}`;
}

export function Header() {
  const [seconds, setSeconds] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const t = translations[lang].nav;

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      setSeconds(Math.floor((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { href: "/leistungen",  label: t.leistungen },
    { href: "/prozess",     label: t.prozess },
    { href: "/technologie", label: t.technologie },
    { href: "/referenzen",  label: t.referenzen },
    { href: "/faq",         label: t.faq },
    { href: "/ueber-uns",   label: lang === "de" ? "Über uns" : "About" },
    { href: "/kontakt",     label: t.kontakt },
  ];

  return (
    <>
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
          gap: 16,
          background: isHome
            ? (scrolled ? "rgba(6,6,20,0.85)" : "transparent")
            : "rgba(6,6,20,0.94)",
          backdropFilter: isHome && scrolled ? "blur(10px)" : undefined,
          borderBottom: isHome && scrolled ? "1px solid var(--line)" : "1px solid transparent",
          boxShadow: isHome ? undefined : "0 4px 0 4px rgba(6,6,20,0.94)",
          transition: "background .3s ease, backdrop-filter .3s ease, border-color .3s ease",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="CADA Galaxy"
          onClick={() => setMenuOpen(false)}
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          <Image
            src="/logo.png"
            alt="CADA Galaxy"
            height={60}
            width={248}
            className="header-logo"
            style={{ width: "auto" }}
            priority
          />
        </Link>

        {/* Desktop nav — hidden <1024px */}
        <nav
          style={{ display: "flex", gap: "clamp(16px, 2.2vw, 38px)" }}
          className="hidden-nav"
        >
          {navItems.map(({ href, label }) => (
            <Link key={href} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {/* Status pill — hidden <640px */}
          <div
            className="status-pill"
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
          >
            <span style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: 7 }}>
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
            <span style={{ color: "var(--ink)" }}>{formatClock(seconds)}</span>
          </div>

          {/* Language switcher — hidden on mobile when menu is open (shown inside menu instead) */}
          <div
            className="lang-switcher"
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--line)",
              overflow: "hidden",
              background: "rgba(10,10,14,0.4)",
              backdropFilter: "blur(6px)",
            }}
          >
            {(["de", "en"] as const).map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  padding: "8px 12px",
                  background: "transparent",
                  border: "none",
                  borderLeft: i > 0 ? "1px solid var(--line)" : "none",
                  cursor: "pointer",
                  color: lang === l ? "var(--accent)" : "var(--muted)",
                  transition: "color 0.2s",
                }}
                aria-label={`Switch to ${l.toUpperCase()}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Hamburger button — visible <1024px */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="hamburger-btn"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              width: 38,
              height: 38,
              background: "rgba(10,10,14,0.4)",
              border: "1px solid var(--line)",
              backdropFilter: "blur(6px)",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                display: "block",
                width: 16,
                height: 1,
                background: "var(--ink)",
                transition: "transform 0.25s, opacity 0.25s",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 16,
                height: 1,
                background: "var(--ink)",
                transition: "opacity 0.25s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: 16,
                height: 1,
                background: "var(--ink)",
                transition: "transform 0.25s, opacity 0.25s",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .hidden-nav   { display: none !important; }
            .hamburger-btn { display: flex !important; }
          }
          @media (max-width: 640px) {
            .status-pill  { display: none !important; }
            .lang-switcher { display: none !important; }
          }
        `}</style>
      </header>

      {/* Mobile menu overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 49,
          background: "rgba(5,5,7,0.98)",
          backdropFilter: "blur(16px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px clamp(22px, 6vw, 64px) 48px",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          opacity: menuOpen ? 1 : 0,
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column" }}>
          {navItems.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                textTransform: "uppercase",
                fontSize: "clamp(2rem, 9vw, 4.5rem)",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "var(--ink)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "clamp(14px, 2.5vh, 22px) 0",
                borderBottom: "1px solid var(--line)",
                transition: "color 0.2s",
              }}
              className="mobile-nav-link"
            >
              <span>{label}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "var(--accent)",
                  fontWeight: 400,
                }}
              >
                0{i + 1}
              </span>
            </Link>
          ))}
        </nav>

        {/* Bottom row: lang + coordinates */}
        <div
          style={{
            marginTop: "clamp(28px, 4vh, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {/* Language switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--line)",
              overflow: "hidden",
            }}
          >
            {(["de", "en"] as const).map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "10px 18px",
                  background: "transparent",
                  border: "none",
                  borderLeft: i > 0 ? "1px solid var(--line)" : "none",
                  cursor: "pointer",
                  color: lang === l ? "var(--accent)" : "var(--muted)",
                  transition: "color 0.2s",
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            51°02′N · 13°47′E
          </span>
        </div>
      </div>

      <style>{`
        .mobile-nav-link:hover { color: var(--accent) !important; }
      `}</style>
    </>
  );
}
