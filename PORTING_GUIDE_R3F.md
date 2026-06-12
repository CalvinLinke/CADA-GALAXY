# Porting Guide: `scene.js` → React Three Fiber

Ziel: die Vanilla-Three.js-Szene aus `reference/scene.js` idiomatisch in **Next.js + @react-three/fiber + @react-three/drei** überführen. Das Aussehen muss **identisch** bleiben — vor allem die **prozedural erzeugte Mars-Textur** wird unverändert übernommen.

---

## 0. Dependencies
```bash
npm i three @react-three/fiber @react-three/drei lenis
# optional: framer-motion (für scrollYProgress / Headline-Transform)
npm i framer-motion
# TypeScript-Typen:
npm i -D @types/three
```

---

## 1. Was aus `scene.js` 1:1 übernommen wird (nicht neu erfinden!)

Diese reinen Helfer arbeiten nur mit `<canvas>` 2D und Mathe — **wörtlich kopieren** in `components/mars/marsTextures.ts` und nur das Modulsystem anpassen (export). Sie sind das Geheimnis des Looks:

- `makeNoiseCanvas(w,h)` — Grau-Rauschen.
- `rgbaStr`, `softBlob` — weiche Farbwolken (Albedo-Regionen).
- `drawCrater` — weicher Krater-Verlauf (für Mikro-Krater & Bump).
- `craterShape`, `genCraters`, `craterPath`, `drawDeepCrater` — **unförmige** (nicht-runde) tiefe Krater; Form wird zwischen Color- und Bump-Map geteilt → exakt deckungsgleich.
- `smoothPoles` — glättet Textur/Relief zu den Polen → **keine equirect-Naht/Streifen** am Pol (war ein explizites Design-Ziel).
- `drawPolarCap` — wird **nicht mehr genutzt** (keine Eiskappen). Kann weggelassen werden.
- `buildMarsColor()` → 4096×2048 Canvas, Farb-Textur.
- `buildMarsBump()` → 4096×2048 Canvas, Höhen-/Bump-Textur.
- `starSprite()` — runder Stern-Sprite (Punkt-Textur).

> **Wichtig:** `genCraters()` erzeugt Zufallspositionen und schreibt sie in ein geteiltes `marsCraters`-Array, das **erst** `buildMarsColor` füllt und dann `buildMarsBump` liest — so liegen Farb- und Bump-Krater übereinander. Diese Reihenfolge beim Portieren beibehalten (oder die Krater-Liste einmal erzeugen und an beide Builder übergeben).

---

## 2. Texturen als Hook (einmalig erzeugen)

`components/mars/useMarsTextures.ts`:
```ts
import * as THREE from "three";
import { useMemo } from "react";
import { buildMarsColor, buildMarsBump } from "./marsTextures";

export function useMarsTextures() {
  return useMemo(() => {
    // genCraters() wird in buildMarsColor() befüllt und von buildMarsBump() gelesen
    const colorCanvas = buildMarsColor();   // füllt das geteilte Krater-Array
    const bumpCanvas  = buildMarsBump();    // nutzt dieselben Krater

    const color = new THREE.CanvasTexture(colorCanvas);
    color.colorSpace = THREE.SRGBColorSpace; // r152+: war sRGBEncoding in r128
    color.wrapS = THREE.RepeatWrapping;

    const bump = new THREE.CanvasTexture(bumpCanvas);
    bump.wrapS = THREE.RepeatWrapping;

    return { color, bump };
  }, []);
}
```
> **Three-Version beachten:** Der Prototyp nutzt **r128** (`sRGBEncoding`, `outputEncoding`). Aktuelles three (r15x+, von R3F gezogen) nutzt `colorSpace`/`SRGBColorSpace` und `gl.outputColorSpace`. Bei R3F setzt man Farbraum/Tonemapping am `<Canvas>` (siehe §4). Anisotropy nach dem ersten Frame via `gl.capabilities.getMaxAnisotropy()` setzen oder `drei`'s `useTexture`-Pattern.

---

## 3. Mars-Komponente (Planet + Lichter + Sterne)

`components/mars/Mars.tsx`:
```tsx
"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useMarsTextures } from "./useMarsTextures";

const easeInOut = (t: number) => (t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t+2,2)/2);
const lerp = (a:number,b:number,t:number)=>a+(b-a)*t;
// Pivot-Keyframes 1:1 aus scene.js (BASE):
const BASE = { x0:1.28, x1:0.02, y0:-0.04, y1:0.02, s0:1.12, s1:1.72 };

export function Mars({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const pivot  = useRef<THREE.Group>(null!);
  const planet = useRef<THREE.Mesh>(null!);
  const spin = useRef(0);
  const { color, bump } = useMarsTextures();

  useFrame((state, delta) => {
    const p = progressRef.current;             // 0..1 vom Hero-Scroll
    const e = easeInOut(p);
    // Pivot: von rechts in die Mitte + größer (schmale Viewports leicht anders, s. scene.js applyProgress)
    pivot.current.position.x = lerp(BASE.x0, BASE.x1, e);
    pivot.current.position.y = lerp(BASE.y0, BASE.y1, e);
    pivot.current.scale.setScalar(lerp(BASE.s0, BASE.s1, e));
    // Rotation: delta-time! (0.1 rad/s) + scroll-Extra
    spin.current += 0.1 * delta;
    planet.current.rotation.y = spin.current + p * Math.PI * 0.9;
  });

  return (
    <group ref={pivot} position={[BASE.x0, BASE.y0, 0]} scale={BASE.s0}>
      {/* Achsneigung wie scene.js */}
      <mesh ref={planet} rotation={[0.12, 0, 0.42]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={color}
          bumpMap={bump}
          bumpScale={0.03}
          roughness={0.96}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
```
> `rotation` als Euler `[x, y, z]`. In scene.js: `rotation.z = 0.42`, `rotation.x = 0.12`, also `[0.12, 0, 0.42]`.

**Lichter** (1:1 aus scene.js — als JSX in der Szene):
```tsx
<directionalLight color={0xfff1e4} intensity={2.5} position={[4.5, 1.4, 3.2]} />
<directionalLight color={0x5878a8} intensity={0.32} position={[-4, -1.5, -2]} />
<ambientLight color={0x20242e} intensity={0.3} />
```
> Hinweis: In aktuellem three sind Light-Intensitäten physikalisch normiert. Die Werte oben stammen aus r128; falls der Planet zu dunkel/hell wirkt, Intensitäten leicht nachziehen oder am `<Canvas>` `legacyLights`-Verhalten beachten. Visuelles Ziel = Screenshots 01/03.

**Sternenfeld** — `buildStars()` aus scene.js portieren: 3200 Punkte auf einer Kugelschale (r 30..100), Farb-Palette + magnitudengewichtete Helligkeit (`Math.pow(rand,2.4)`), `THREE.Points` mit `PointsMaterial({ size:0.42, map: starSprite(), vertexColors:true, transparent:true, depthWrite:false, blending:AdditiveBlending, sizeAttenuation:true })`. In R3F als `<points>` mit `bufferGeometry` + `bufferAttribute` (position/color) oder via `drei`. Langsame Eigenrotation `0.011 rad/s * delta` in `useFrame`.

---

## 4. Canvas-Wrapper (client-only, dynamic import)

`components/MarsScene.tsx`:
```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Mars } from "./mars/Mars";
import { Stars } from "./mars/Stars";

export default function MarsScene({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}                                   // Pixel-Ratio cappen (Perf!)
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 3.25], near: 0.1, far: 200 }}
      onCreated={({ gl }) => { gl.toneMapping = THREE.NoToneMapping; gl.outputColorSpace = THREE.SRGBColorSpace; }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Stars />
      <Mars progressRef={progressRef} />
      <directionalLight color={0xfff1e4} intensity={2.5} position={[4.5, 1.4, 3.2]} />
      <directionalLight color={0x5878a8} intensity={0.32} position={[-4, -1.5, -2]} />
      <ambientLight color={0x20242e} intensity={0.3} />
    </Canvas>
  );
}
```
In `Hero.tsx` **client-only** laden (Three darf nicht serverseitig rendern):
```tsx
import dynamic from "next/dynamic";
const MarsScene = dynamic(() => import("@/components/MarsScene"), { ssr: false });
```
Kamera-Maus-Parallaxe (optional, wie scene.js): in `useFrame` `state.camera.position.x = lerp(...mouse...)` — oder weglassen.

---

## 5. Scroll-Fortschritt → `progressRef`

`lib/useScrollProgress.ts` (Lenis + Ref, kein State pro Frame):
```ts
"use client";
import { useEffect, useRef } from "react";
import Lenis from "lenis";

export function useHeroProgress(heroRef: React.RefObject<HTMLElement>) {
  const progress = useRef(0);
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);

    const update = () => {
      const el = heroRef.current; if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const top = el.getBoundingClientRect().top;
      progress.current = Math.max(0, Math.min(1, total > 0 ? -top / total : 0));
    };
    lenis.on("scroll", update);
    update();
    return () => { lenis.destroy(); };
  }, [heroRef]);
  return progress; // an <MarsScene progressRef={...}/> und an die Headline geben
}
```
**Headline-Transform** (entweder direkt im `scroll`-Callback `el.style.transform` setzen, oder mit Framer Motion):
```
translateX = -progress * 78vw
opacity    = max(0, 1 - progress * 1.5)
```
Mit Framer Motion: `const { scrollYProgress } = useScroll({ target: heroRef, offset:["start start","end end"] });`
`const x = useTransform(scrollYProgress, [0,1], ["0vw","-78vw"]);`
`const opacity = useTransform(scrollYProgress, [0, 0.67], [1, 0]);`
…und parallel `useMotionValueEvent(scrollYProgress, "change", v => { progressRef.current = v; })` für die 3D-Szene.

---

## 6. Stolperfallen / Checkliste
- [ ] **`"use client"`** auf Hero/MarsScene; `<Canvas>` via `dynamic(..., { ssr:false })`.
- [ ] Texturen **einmal** (`useMemo`) — Canvas-Erzeugung ist teuer (4096²).
- [ ] **delta-time** in `useFrame` (kein fixer Schritt pro Frame) — sonst die ursprünglichen Ruckler.
- [ ] **`dpr={[1,1.5]}`**.
- [ ] Krater-Liste zwischen Color- und Bump-Builder **teilen** (sonst liegen Relief & Färbung nicht übereinander).
- [ ] `smoothPoles` aktiv lassen → **keine Pol-Naht**.
- [ ] Farbraum: `outputColorSpace = SRGBColorSpace`, Color-Texture `colorSpace = SRGBColorSpace`; Bump bleibt linear.
- [ ] Progress per **Ref** in die Loop, nicht React-State pro Frame.
- [ ] Visueller Abgleich gegen `screenshots/01-hero-top.png` und `03-hero-centered.png`.
