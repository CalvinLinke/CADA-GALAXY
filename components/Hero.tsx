"use client";
import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useHeroProgress } from "@/lib/useScrollProgress";
import { ShootingStar } from "./ShootingStar";

const MarsScene = dynamic(() => import("./MarsScene"), { ssr: false });

export function Hero() {
  const heroRef  = useRef<HTMLElement>(null);
  const textRef  = useRef<HTMLDivElement>(null);
  const hintRef  = useRef<HTMLDivElement>(null);
  const progressRef = useHeroProgress(heroRef);

  // Apply headline / scroll-hint transforms on scroll without React state
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const p = progressRef.current;
      if (textRef.current) {
        textRef.current.style.transform = `translateX(${-p * 78}vw)`;
        textRef.current.style.opacity   = String(Math.max(0, 1 - p * 1.5));
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = String(Math.max(0, 1 - p * 4));
      }
    };

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [progressRef]);

  return (
    <section ref={heroRef} className="hero-wrap" id="top">
      <div className="hero-sticky">
        {/* z0: shooting star */}
        <ShootingStar />

        {/* z1: 3D Mars canvas */}
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <MarsScene progressRef={progressRef} />
        </div>

        {/* z2: hero content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            padding: "0 clamp(22px, 5vw, 90px)",
            pointerEvents: "none",
          }}
        >
          <div
            ref={textRef}
            style={{
              maxWidth: 760,
              willChange: "transform, opacity",
            }}
          >
            {/* kicker */}
            <div
              className="accent-box"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: 26,
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 42,
                  height: 1,
                  background: "var(--accent)",
                  marginRight: 14,
                  flexShrink: 0,
                }}
              />
              51°02′N · 13°47′E
            </div>

            {/* headline */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(4.2rem, 13vw, 12rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                textShadow: "0 8px 60px rgba(0,0,0,.6)",
              }}
            >
              CADA
              <br />
              <span style={{ color: "var(--ink)" }}>GALAXY</span>
            </h1>

            {/* sub */}
            <p
              style={{
                marginTop: 30,
                maxWidth: 440,
                color: "var(--muted)",
                fontSize: 16,
                lineHeight: 1.6,
                fontWeight: 300,
              }}
            >
              Wir entwickeln Websites, die in Sekundenbruchteilen laden, auf dem Handy überzeugen und bei Google sichtbar sind.
            </p>

            {/* CTA */}
            <a
              href="#leistungen"
              style={{
                pointerEvents: "auto",
                marginTop: 40,
                display: "inline-flex",
                alignItems: "center",
                gap: 16,
                border: "1px solid var(--line)",
                padding: "16px 26px",
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink)",
                background: "rgba(10,10,14,0.35)",
                backdropFilter: "blur(4px)",
                transition: "border-color 0.3s, background 0.3s, gap 0.3s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--accent)";
                el.style.background  = "rgba(255,106,61,0.12)";
                el.style.gap         = "22px";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--line)";
                el.style.background  = "rgba(10,10,14,0.35)";
                el.style.gap         = "16px";
              }}
            >
              ENTDECKEN
              <span className="cta-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* z3: scroll hint */}
        <div
          ref={hintRef}
          style={{
            position: "absolute",
            bottom: 34,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 10,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--muted)",
            willChange: "opacity",
          }}
        >
          <span>SCROLL</span>
          <span className="scroll-bar" />
        </div>
      </div>
    </section>
  );
}
