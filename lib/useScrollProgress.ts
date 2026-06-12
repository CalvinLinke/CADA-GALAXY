"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useHeroProgress(heroRef: React.RefObject<HTMLElement | null>) {
  const progress = useRef(0);

  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });

    const raf = (t: number) => {
      lenis.raf(t);
      requestAnimationFrame(raf);
    };
    const rafId = requestAnimationFrame(raf);

    const update = () => {
      const el = heroRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const top   = el.getBoundingClientRect().top;
      progress.current = total > 0
        ? Math.max(0, Math.min(1, -top / total))
        : 0;
    };

    lenis.on("scroll", update);
    update();

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [heroRef]);

  return progress;
}
