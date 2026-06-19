"use client";
import { useEffect, useRef } from "react";

interface GalaxyBackgroundProps {
  /** If true, skip scroll-fade and show immediately (subpages without hero) */
  immediate?: boolean;
}

export function GalaxyBackground({ immediate = false }: GalaxyBackgroundProps) {
  const bgRef   = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bg   = bgRef.current;
    const star = starRef.current;
    if (!bg) return;

    // On subpages (no hero-wrap) show galaxy instantly
    const trigger = immediate
      ? null
      : (document.querySelector(".hero-wrap")?.nextElementSibling as HTMLElement | null);

    if (immediate || !trigger) {
      bg.style.opacity = "1";
    }

    const clamp = (v: number, lo: number, hi: number) =>
      Math.max(lo, Math.min(hi, v));

    // Fade galaxy in when the first post-hero section enters the viewport
    const onScroll = () => {
      if (!trigger) return;
      const top = trigger.getBoundingClientRect().top;
      const rev = clamp(
        (window.innerHeight * 0.9 - top) / (window.innerHeight * 0.55),
        0, 1,
      );
      bg.style.opacity = String(rev);
    };
    if (trigger) {
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    // Shooting star — exactly every 7 s, only while galaxy is visible
    const fly = () => {
      if (!star || parseFloat(bg.style.opacity || "0") < 0.12) return;
      const rot    = 148 + (Math.random() - 0.5) * 32;          // ~132–164°
      const startX = 10 + Math.random() * 70;
      const startY = 4  + Math.random() * 28;
      const dist   = 200 + Math.random() * 260;
      const rad    = (rot * Math.PI) / 180;
      const endX   = startX + (Math.cos(rad) * dist) / window.innerWidth  * 100;
      const endY   = startY + (Math.sin(rad) * dist) / window.innerHeight * 100;
      const dur    = 0.9 + Math.random() * 0.5;

      star.style.setProperty("--sx",  `${startX}vw`);
      star.style.setProperty("--sy",  `${startY}vh`);
      star.style.setProperty("--ex",  `${endX}vw`);
      star.style.setProperty("--ey",  `${endY}vh`);
      star.style.setProperty("--rot", `${rot}deg`);
      star.style.setProperty("--dur", `${dur}s`);
      star.classList.remove("go");
      void star.offsetWidth; // force reflow to restart animation
      star.classList.add("go");
    };

    const timer = setInterval(fly, 7000);

    return () => {
      if (trigger) window.removeEventListener("scroll", onScroll);
      clearInterval(timer);
    };
  }, [immediate]);

  return (
    <div
      id="galaxy-bg"
      ref={bgRef}
      style={{ opacity: 0 }}
    >
      {/* 1 — Nebula / base tone */}
      <div className="gal-nebula" />
      {/* 2 — Milky-way dust band */}
      <div className="gal-milkyway" />
      {/* 3 — Dense fine star field (slow drift) */}
      <div className="gal-stars" />
      {/* 4a — Base twinkle layer */}
      <div className="gal-twinkle" />
      {/* 4b–d — Individual spark layers (offset timing) */}
      <div className="gal-spark-a" />
      <div className="gal-spark-b" />
      <div className="gal-spark-c" />
      <div className="gal-spark-d" />
      {/* Shooting star (JS-driven) */}
      <div className="gal-shooting-star" ref={starRef} />
    </div>
  );
}
