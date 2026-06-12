"use client";
import { useEffect, useRef } from "react";

export function ShootingStar() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    function fly() {
      if (!el) return;
      const W = window.innerWidth, H = window.innerHeight;
      const sx   = W * (0.24 + Math.random() * 0.34);
      const sy   = H * (0.05 + Math.random() * 0.24);
      const ang  = (152 + Math.random() * 28) * (Math.PI / 180);
      const dist = W * (0.4 + Math.random() * 0.26);
      const ex   = sx + Math.cos(ang) * dist;
      const ey   = sy + Math.sin(ang) * dist;
      const rot  = Math.atan2(ey - sy, ex - sx) * (180 / Math.PI);

      el.classList.remove("go");
      el.style.setProperty("--sx", sx + "px");
      el.style.setProperty("--sy", sy + "px");
      el.style.setProperty("--ex", ex + "px");
      el.style.setProperty("--ey", ey + "px");
      el.style.setProperty("--rot", rot + "deg");
      el.style.setProperty("--dur", (0.9 + Math.random() * 0.5) + "s");
      void el.offsetWidth; // force reflow
      el.classList.add("go");
    }

    const onEnd = () => el?.classList.remove("go");
    el.addEventListener("animationend", onEnd);

    let intervalId: ReturnType<typeof setInterval>;
    const timeoutId = setTimeout(() => {
      fly();
      intervalId = setInterval(fly, 9000 + Math.random() * 9000);
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      el.removeEventListener("animationend", onEnd);
    };
  }, []);

  return <div ref={ref} className="shooting-star" />;
}
