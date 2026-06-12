# Handoff: CADA Galaxy — Landingpage mit animiertem 3D-Mars-Hero

> **Zielstack:** Next.js + Tailwind CSS + React Three Fiber (`@react-three/fiber`, `@react-three/drei`) + Lenis/Framer Motion.
> Diese Doku ist so geschrieben, dass ein Entwickler **ohne Kontext aus dem ursprünglichen Chat** die Seite 1:1 nachbauen kann.

---

## 1. Overview

Single-page Landingpage für die Marke **CADA Galaxy**. Kernstück ist ein **vollflächiger Hero mit einem echten, rotierenden 3D-Mars** vor einem Galaxie-Hintergrund (Sternenfeld). Beim Scrollen wandert der Planet von rechts in die Bildmitte und skaliert größer, während die Headline „CADA GALAXY" nach links aus dem Bild geschoben und ausgeblendet wird. Eine Sternschnuppe fliegt nach 1,5 s durch den Hintergrund.

Darunter folgen zwei klassische Sektionen: **Leistungen** (3 Feature-Cards) und **Kontakt** (zentriertes CTA-Band), plus Footer.

Look: dunkel, „aerospace/SpaceX"-Ästhetik, kondensierte Display-Schrift, Monospace-Akzente, ein einziger oranger Akzent (`#ff6a3d`).

---

## 2. About the Design Files

Die Dateien in `reference/` sind **Design-Referenzen, die in HTML/Vanilla-JS erstellt wurden** — ein Prototyp, der Aussehen und Verhalten zeigt, **kein Produktionscode zum Direkt-Kopieren**.

- `reference/CADA Galaxy.html` — Markup, CSS (im `<style>`-Block), Scroll-Logik (im `<script>`-Block), Sternschnuppe.
- `reference/scene.js` — die komplette Three.js-Szene: prozedurale Mars-Textur (Canvas), Bump-Map, Beleuchtung, Sternenfeld, Scroll-/Render-Loop. **Die prozedurale Texturerzeugung ist das Herzstück und soll 1:1 übernommen werden** (siehe `PORTING_GUIDE_R3F.md`).
- `reference/logo.png` — eng zugeschnittenes Marken-Logo für die Navbar (Emblem + Wortmarke, 2236×742, transparent).
- `reference/logo-original.png` — das gelieferte Original (2560×1440, viel transparenter Rand).

**Aufgabe:** Diese Designs im Ziel-Stack (Next.js + Tailwind + R3F) mit dessen idiomatischen Patterns **neu aufbauen** — nicht das HTML einbetten. Die prozedurale Mars-Logik aus `scene.js` wird dabei in eine R3F-Komponente portiert (Mapping in `PORTING_GUIDE_R3F.md`).

---

## 3. Fidelity

**High-Fidelity (hifi).** Finale Farben, Typografie, Abstände, Animationen und Scroll-Verhalten sind festgelegt und unten exakt dokumentiert. Pixelgenau nachbauen.

---

## 4. Wie finde ich heraus, welchen Next.js-Router ich nutze? (App vs. Pages)

In deinem bestehenden Projekt:
- Gibt es einen Ordner **`app/`** (mit `app/layout.tsx` und `app/page.tsx`)? → **App Router** (neuer Standard, empfohlen).
- Gibt es stattdessen einen Ordner **`pages/`** (mit `pages/index.tsx`, `pages/_app.tsx`)? → **Pages Router**.
- Bei einem **neuen** Projekt (`npx create-next-app@latest`) wählst du im Prompt „App Router" → **App Router**.

Diese Doku ist primär für den **App Router** geschrieben (Datei-Hinweise in Klammern). Wichtig fürs 3D: Three.js/R3F **muss client-side laufen** — die Hero-Komponente bekommt oben `"use client"`, und die R3F-`<Canvas>`-Komponente wird per `next/dynamic` mit `{ ssr: false }` geladen.

---

## 5. Empfohlene Projektstruktur (App Router)

```
app/
  layout.tsx          ← Fonts (next/font) + <body> Grundfarben
  page.tsx            ← rendert <Hero/>, <Features/>, <Contact/>, <SiteFooter/>
  globals.css         ← Tailwind + CSS-Variablen/Tokens
components/
  Header.tsx          ← fixe Navbar mit Logo + Nav + Status-Pill
  Hero.tsx            ← "use client"; sticky Hero, Scroll-Mapping, Headline, ShootingStar
  MarsScene.tsx       ← "use client"; React-Three-Fiber Canvas (dynamic import, ssr:false)
  mars/
    useMarsTextures.ts   ← portierte prozedurale Canvas-Texturen (color + bump)
    Mars.tsx             ← Planet-Mesh + Lichter + Sternenfeld
  Features.tsx
  Contact.tsx
  SiteFooter.tsx
  ShootingStar.tsx
lib/
  useScrollProgress.ts ← Lenis + Scroll-Fortschritt des Hero (0..1)
public/
  logo.png
```

---

## 6. Design Tokens

### Farben
| Token | Hex / Wert | Verwendung |
|---|---|---|
| `bg` | `#050507` | Seiten-Hintergrund (fast schwarz) |
| `ink` | `#f4f4f6` | Primärtext / Headline |
| `muted` | `#9a9aa4` | Sekundärtext, Nav, Labels |
| `accent` | `#ff6a3d` | Akzent: Buttons, Linien, Live-Dot, Hover |
| `line` | `rgba(255,255,255,0.12)` | Borders, Grid-Linien, Card-Trenner |
| Card-Hover-BG | `#0a0a0f` | Feature-Card auf Hover |

**Hintergrund-Verläufe (fixe Ebene hinter allem, `.space-bg`):**
```css
background:
  radial-gradient(1200px 900px at 78% 42%, rgba(120,54,32,0.30), rgba(120,54,32,0) 60%),
  radial-gradient(1000px 1200px at 18% 78%, rgba(40,52,96,0.22), rgba(40,52,96,0) 62%),
  radial-gradient(1400px 800px at 60% -10%, rgba(70,40,80,0.16), rgba(70,40,80,0) 60%),
  radial-gradient(100% 100% at 50% 50%, #08070b 0%, #050507 55%, #030305 100%);
```
Darüber liegt eine `::after`-Ebene mit gestreuten 1px-`radial-gradient`-Sternpunkten bei `opacity:0.5` (statischer Sternenstaub hinter dem WebGL-Canvas). Exakte Punkte siehe `reference/CADA Galaxy.html`.

### Typografie
3 Familien (per `next/font/google` laden):
- **Saira Condensed** — Display/Headlines. Gewichte 300,400,500,600,700,800. (CSS-Var `--font-display`)
- **Barlow** — Fließtext. Gewichte 300,400,500,600. (CSS-Var `--font-body`)
- **Space Mono** — Mono-Akzente (Nav, Labels, Status, CTA). Gewichte 400,700. (CSS-Var `--font-mono`)

| Element | Familie | Größe | Gewicht | Tracking | Sonstiges |
|---|---|---|---|---|---|
| Hero `h1` | Saira Condensed | `clamp(4.2rem, 13vw, 12rem)` | **400** | `-0.01em` | line-height `0.82`, UPPERCASE, `text-shadow: 0 8px 60px rgba(0,0,0,.6)` |
| Hero kicker | Space Mono | 12px | 400 | `0.34em` | UPPERCASE, accent, davor 42px breite Linie |
| Hero sub | Barlow | 16px | 300 | — | muted, line-height 1.6, max-width 440px |
| CTA-Button | Space Mono | 12px | 400 | `0.22em` | UPPERCASE, ink |
| Nav-Links | Space Mono | 12px | 400 | `0.18em` | UPPERCASE, muted → ink on hover |
| Status-Pill | Space Mono | 11px | 400 | `0.12em` | UPPERCASE |
| Section-Label | Space Mono | 12px | 400 | `0.28em` | UPPERCASE, accent |
| Section `h2` | Saira Condensed | `clamp(2.4rem, 5vw, 4.4rem)` | 700 | `-0.01em` | UPPERCASE, line-height 0.95 |
| Card `h3` | Saira Condensed | 2rem | 700 | `0.01em` | UPPERCASE |
| Card-Text | Barlow | 15px | 300 | — | muted, line-height 1.65 |
| Contact `h2` | Saira Condensed | `clamp(2.8rem, 8vw, 7rem)` | 800 | `-0.01em` | UPPERCASE, line-height 0.88 |

### Sonstiges
- **Border-Radius:** Buttons/Pills/Cards sind **eckig** (kein Radius) bis auf runde Punkte (`border-radius:50%` für Dot/Glyph).
- **Keine Schatten** außer dem Headline-`text-shadow` und der CTA-Hover-Tönung.
- **Spacing:** Seiten-Padding horizontal `clamp(22px, 5vw, 90px)`; Header-Padding `26px clamp(22px, 4vw, 56px)`; Sektions-Padding vertikal `clamp(90px, 12–14vh, 160–180px)`.

---

## 7. Screens / Sektionen

### 7.1 Header (fix, `components/Header.tsx`)
- `position: fixed; top:0; left:0; right:0; z-index:50;` über allem.
- Flex, `justify-content: space-between`, vertikal zentriert. Padding `26px clamp(22px,4vw,56px)`.
- **Links:** Logo `public/logo.png`, `height:34px; width:auto;` (Link auf `#top`, `aria-label="CADA Galaxy"`).
- **Mitte:** Nav mit 4 Links — **Leistungen, Prozess, Referenzen, Kontakt** (Anker `#leistungen`, `#prozess`, `#referenzen`, `#kontakt`). Space Mono 12px, `0.18em`, muted. Hover: Farbe → ink **und** ein 1px accent-Underline wächst von 0 → 100% (`transition: width .28s`).
- **Rechts:** Status-Pill — Border `1px line`, Padding `8px 14px`, `backdrop-filter: blur(6px)`, BG `rgba(10,10,14,0.4)`. Inhalt: `● LIVE` (accent Punkt, pulsiert 1.8s) · `ORBIT` (muted) · `T+00:00:00` (ink, **Live-Clock** die ab Mount hochzählt, Format `T+HH:MM:SS`).
- Responsive: `@media (max-width:1024px)` Nav ausblenden; `@media (max-width:640px)` Status ausblenden.

### 7.2 Hero (`components/Hero.tsx`, `"use client"`)
Aufbau für den Scroll-Effekt (**wichtig**):
```
<section class="hero-wrap">   height: 240vh; position: relative;
  <div class="hero-sticky">    position: sticky; top:0; height:100vh; overflow:hidden;
    <ShootingStar/>           z-index:0
    <MarsScene/>              z-index:1  (absolute inset:0, das R3F <Canvas>)
    <div class="hero-content">z-index:2  (flex, vertikal zentriert, padding 0 clamp(22px,5vw,90px), pointer-events:none)
       <div class="hero-text">  ← wird beim Scrollen transformiert
          kicker · h1 (CADA / GALAXY zweizeilig) · sub · CTA (pointer-events:auto)
    <div class="scroll-hint">  z-index:3  unten zentriert: "SCROLL" + animierter Strich
```
- Die `hero-wrap` ist **240vh hoch**; das `hero-sticky` bleibt `sticky` kleben → der gesamte Effekt spielt über 1,4 Bildschirmhöhen Scroll ab.
- Headline zweizeilig: `CADA<br/>GALAXY`.

### 7.3 Features (`components/Features.tsx`, `#leistungen`)
- Section auf `bg`, oben `border-top: 1px line`. Padding `clamp(90px,12vh,160px) clamp(22px,5vw,90px)`.
- **Kopf:** flex, `align-items:flex-end; justify-content:space-between`, wrap, `gap:30px`, `margin-bottom:64px`.
  - Links: Label `/ Leistungen` (accent), darunter `h2` „Gebaut für den Orbit" (max-width 14ch).
  - Rechts: Absatz (muted, max-width 38ch): „Drei Disziplinen, ein System. Wir verbinden Strategie, Gestaltung und Technologie zu Erlebnissen mit Anziehungskraft."
- **Grid:** 3 Spalten, `gap:1px`, `background: line`, umgeben von `border:1px line` → erzeugt 1px-Trennlinien. `@media (max-width:900px)` → 1 Spalte.
- **Card** (×3): BG `bg`, Padding `40px 34px 46px`, Hover → BG `#0a0a0f` und eine 2px accent-Linie wächst oben von 0→100% (`::before`, `transition: width .4s`).
  - `num` (Space Mono, accent, `0.2em`), `h3`, Text, unten ein runder `glyph` (46px Kreis, 1px line, mit zentralem 8px accent-Punkt + Glow).
  - **Inhalte:**
    1. `01` · **Strategie** · „Positionierung, Markenkern und digitale Roadmaps, die Richtung geben — bevor die erste Pixel-Grenze gezogen wird."
    2. `02` · **Design** · „Interfaces und visuelle Systeme mit Haltung. Reduziert, präzise und auf jedem Viewport in Balance."
    3. `03` · **Entwicklung** · „Performante Frontends, 3D und Motion. Vom Konzept bis zum Launch — technisch sauber, spürbar lebendig."

### 7.4 Contact (`components/Contact.tsx`, `#kontakt`)
- Section auf `bg`, `border-top:1px line`, Padding `clamp(90px,14vh,180px) clamp(22px,5vw,90px)`. Flex column, zentriert, `text-align:center`, `overflow:hidden`.
- Dekorativer Schein: `::before` — 900×900 Kreis am unteren Rand, `radial-gradient(circle, rgba(255,106,61,0.18), transparent 60%)`.
- Label `/ Kontakt` (accent, `margin-bottom:28px`), `h2` „Bereit für<br/>den Anflug?", darunter Mail-Link `hallo@cadagalaxy.com` (Space Mono, `clamp(14px,2vw,20px)`, `border-bottom:1px accent`, Hover → accent).

### 7.5 Footer (`components/SiteFooter.tsx`)
- `border-top:1px line`, Padding `32px clamp(22px,5vw,90px)`, flex space-between wrap, Space Mono 11px `0.14em` UPPERCASE muted.
- Inhalt: **CADA Galaxy** (ink, 16px) · „© 2026 — Made in Orbit" · „Imprint · Datenschutz".

---

## 8. Interactions & Behavior

### 8.1 Scroll-Mapping (Hero) — **exakte Formeln**
Sei `p` der Scroll-Fortschritt des Hero im Bereich `0..1`:
```
total = heroWrap.offsetHeight - window.innerHeight   // = 1.4 * vh
p     = clamp(-heroWrap.getBoundingClientRect().top / total, 0, 1)
```
Daraus:
- **Headline:** `transform: translateX(${-p * 78}vw)`, `opacity: max(0, 1 - p*1.5)` → bei ~67% komplett raus & unsichtbar.
- **Scroll-Hint:** `opacity: max(0, 1 - p*4)`.
- **Planet (3D):** an die R3F-Szene als `progress=p` übergeben (siehe 8.2 / PORTING_GUIDE).

Im HTML läuft das über einen `scroll`-Listener + `requestAnimationFrame`-Gate. **Empfehlung im Ziel-Stack:** [Lenis](https://github.com/darkroomengineering/lenis) für smoothes Scrollen, und den Fortschritt entweder via Lenis-`scroll`-Event oder Framer Motions `useScroll({ target: heroRef, offset: ["start start","end end"] })` → `scrollYProgress` (gibt direkt `0..1`). Diesen Wert in einen Ref schreiben und in der R3F-`useFrame`-Loop lesen (nicht als React-State pro Frame setzen → Re-Render vermeiden).

### 8.2 3D-Planet — Verhalten
- **Eigenrotation:** konstant `0.1 rad/s` um die Y-Achse (zeit-/delta-basiert, **nicht** pro Frame fix — sonst ruckelt es).
- **Scroll-gekoppelte Extra-Drehung:** `planet.rotation.y = autoSpin + p * π * 0.9`.
- **Position/Skalierung des Pivots** (linear über `easeInOut(p)` interpoliert):
  - `x: 1.28 → 0.02` (von rechts in die Mitte)
  - `y: -0.04 → 0.02`
  - `scale: 1.12 → 1.72` (wird größer)
  - Auf schmalen Viewports leicht kleiner/tiefer (Faktoren siehe `applyProgress` in scene.js).
- **Achsneigung:** `planet.rotation.z = 0.42; rotation.x = 0.12`.
- **Maus-Parallaxe:** Kamera bewegt sich minimal (`camera.position.x = mouseX*0.18`, `y = -mouseY*0.12`), zeit-geglättet.

### 8.3 Sternschnuppe (`ShootingStar`)
- 3px Punkt mit Glow + 120px linearem Schweif (CSS-Gradient).
- **Erster Flug nach 1500 ms**, danach Wiederholung alle `9000 + rand*9000` ms.
- Start links-oben im freien Sternenhimmel: `sx = W*(0.24..0.58)`, `sy = H*(0.05..0.29)`; Winkel `152°..180°`; Distanz `W*(0.4..0.66)`; Dauer `0.9..1.4s`, `linear`; opacity 0→1 (8%) → 1 (78%) → 0. Liegt auf `z-index:0` (hinter dem Planeten). Exakte CSS-Keyframes in `reference/CADA Galaxy.html` (`.shooting-star`, `@keyframes shoot`).

### 8.4 Reduced Motion
Bitte `prefers-reduced-motion` respektieren: Eigenrotation des Planeten verlangsamen/anhalten und Sternschnuppe deaktivieren ist optional, aber erwünscht.

---

## 9. State Management
Bewusst minimal, kein globaler Store nötig:
- **Hero:** ein `useRef` für den Scroll-Fortschritt (`progressRef.current`), beschrieben vom Scroll-Handler/Lenis, gelesen in `useFrame`. Headline-Transform über Framer Motion `useTransform(scrollYProgress, ...)` oder direkt per Style.
- **Status-Clock:** `useState` Sekundenzähler ab Mount, `setInterval` 1s, Format `T+HH:MM:SS`.
- **Sternschnuppe:** lokale Timer (`setTimeout`/`setInterval`), Animation rein in CSS.
- **MarsScene:** Texturen **einmalig** per `useMemo` erzeugen (teuer!), siehe PORTING_GUIDE.

---

## 10. Performance (wichtig, sonst ruckelt es)
- `dpr={[1, 1.5]}` am `<Canvas>` (Pixel-Ratio cappen) — im Prototyp war das die Hauptursache für ruckeln.
- Alle Animationen **delta-time-basiert** (`useFrame((state, delta) => …)`), nie fixe Schritte pro Frame.
- Prozedurale Texturen nur **einmal** generieren (`useMemo`/Modul-Singleton), nicht pro Render.
- Den Scroll-Fortschritt über einen Ref in die `useFrame`-Loop geben, **nicht** pro Frame React-State setzen.
- Canvas pausieren, wenn der Hero aus dem Viewport ist (`frameloop="demand"` oder IntersectionObserver) — der Prototyp pausiert via IntersectionObserver.

---

## 11. Assets
- `public/logo.png` — Logo, eng zugeschnitten (Emblem + „CADA GALAXY"-Wortmarke), 2236×742, transparent. In der Navbar `height:34px`.
- `reference/logo-original.png` — Original-Upload (2560×1440), nur falls ihr neu zuschneiden wollt.
- **Keine** externen Bilder für den Planeten — die Oberfläche wird komplett prozedural per Canvas erzeugt (siehe `scene.js` / PORTING_GUIDE). Kein Mars-Foto nötig.
- Fonts via `next/font/google`: Saira Condensed, Barlow, Space Mono.

---

## 12. Files in diesem Paket
- `reference/CADA Galaxy.html` — vollständiger HTML-Prototyp (Markup, CSS, Scroll-Logik, Sternschnuppe, Live-Clock).
- `reference/scene.js` — Three.js-Szene inkl. **prozeduraler Mars-Textur + Bump-Map** (1:1 zu portieren).
- `reference/logo.png`, `reference/logo-original.png` — Logo-Assets.
- `screenshots/` — 01 Hero oben · 02 Hero halb gescrollt · 03 Hero zentriert/herangezoomt · 04 Leistungen · 05 Kontakt.
- `PORTING_GUIDE_R3F.md` — Schritt-für-Schritt-Mapping von `scene.js` → React Three Fiber, inkl. Code-Gerüst.

---

## 13. Definition of Done
- [ ] Hero pixelgenau wie Screenshot 01 (Logo, Nav, Status-Clock, Headline 400er Saira, kicker, CTA, scroll-hint).
- [ ] 3D-Mars prozedural (kein Foto), homogene Pole (keine Naht/Streifen), wenige unförmige tiefe Krater, smoothe delta-time-Rotation.
- [ ] Scroll: Planet von rechts → Mitte + größer, Headline nach links raus + Fade — Formeln aus §8.1.
- [ ] Sternschnuppe nach 1,5 s, dann periodisch.
- [ ] Features- & Kontakt-Sektion inkl. Hover-States; Footer.
- [ ] `dpr` gecappt, delta-time-Loop, Texturen memoisiert → keine Ruckler.
- [ ] Responsive: Nav <1024px aus, Status <640px aus, Grid <900px einspaltig.
