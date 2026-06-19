"use client";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import {
  buildMarsColor,
  buildMarsBump,
  buildMarsNormal,
  buildMarsDisplacement,
  genCraters,
  starSprite,
} from "./mars/marsTextures";

interface MarsSceneProps {
  progressRef: React.MutableRefObject<number>;
}

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const BASE = { x0: 1.28, x1: 0.02, y0: -0.04, y1: 0.02, s0: 1.12, s1: 1.72 };

export default function MarsScene({ progressRef }: MarsSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ─── Renderer ───────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setSize(container.clientWidth, container.clientHeight);
    Object.assign(renderer.domElement.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
    });
    container.appendChild(renderer.domElement);

    // ─── Scene & Camera ─────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 3.25);

    // ─── Lights ─────────────────────────────────────────────────────────────
    const keyLight = new THREE.DirectionalLight(0xfff1e4, 3.2);
    keyLight.position.set(2.8, 1.2, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x9aa3b8, 1.15);
    fillLight.position.set(-3.5, -1.0, 1.8);
    scene.add(fillLight);

    scene.add(new THREE.AmbientLight(0x2a2f3a, 0.62));

    // ─── Textures ───────────────────────────────────────────────────────────
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const craters = genCraters(4096, 2048);

    const colorTex = new THREE.CanvasTexture(buildMarsColor(craters));
    colorTex.colorSpace = THREE.SRGBColorSpace;
    colorTex.wrapS = THREE.RepeatWrapping;
    colorTex.anisotropy = maxAniso;

    const bumpCanvas = buildMarsBump(craters);
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);
    bumpTex.wrapS = THREE.RepeatWrapping;
    bumpTex.anisotropy = maxAniso;

    const normalTex = new THREE.CanvasTexture(buildMarsNormal([], bumpCanvas));
    normalTex.wrapS = THREE.RepeatWrapping;
    normalTex.anisotropy = maxAniso;

    const dispTex = new THREE.CanvasTexture(buildMarsDisplacement(craters));
    dispTex.wrapS = THREE.RepeatWrapping;

    // ─── Planet ─────────────────────────────────────────────────────────────
    const geo = new THREE.SphereGeometry(1, 256, 256);
    const mat = new THREE.MeshStandardMaterial({
      map: colorTex,
      bumpMap: bumpTex,
      bumpScale: 0.03,
      normalMap: normalTex,
      normalScale: new THREE.Vector2(0.55, 0.55),
      displacementMap: dispTex,
      displacementScale: 0.032,
      displacementBias: -0.012,
      roughness: 0.96,
      metalness: 0.0,
    });
    const planet = new THREE.Mesh(geo, mat);
    planet.rotation.set(0.12, 0, 0.42);

    const pivot = new THREE.Group();
    pivot.position.set(BASE.x0, BASE.y0, 0);
    pivot.scale.setScalar(BASE.s0);
    pivot.add(planet);
    scene.add(pivot);

    // ─── Stars ──────────────────────────────────────────────────────────────
    const N = 3200;
    const sPos = new Float32Array(N * 3);
    const sCol = new Float32Array(N * 3);
    const sPal: number[][] = [
      [1, 1, 1],    [0.78, 0.84, 1], [1, 0.93, 0.84],
      [0.88, 0.93, 1], [1, 0.86, 0.72], [0.95, 0.97, 1],
    ];
    for (let i = 0; i < N; i++) {
      const r  = 30 + Math.random() * 40; // radius 30–70
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      sPos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      sPos[i * 3 + 1] = r * Math.cos(ph);
      sPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      const p = sPal[(Math.random() * sPal.length) | 0];
      const b = 0.22 + Math.pow(Math.random(), 2.4) * 0.78;
      sCol[i * 3]     = p[0] * b;
      sCol[i * 3 + 1] = p[1] * b;
      sCol[i * 3 + 2] = p[2] * b;
    }
    const sGeo = new THREE.BufferGeometry();
    sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
    sGeo.setAttribute("color",    new THREE.BufferAttribute(sCol, 3));
    const sTex = new THREE.CanvasTexture(starSprite());
    const sMat = new THREE.PointsMaterial({
      size: 0.42,
      map: sTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(sGeo, sMat);
    scene.add(stars);

    // ─── Interaction ────────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    };
    window.addEventListener("resize", onResize);

    // ─── Animation loop ──────────────────────────────────────────────────────
    let rafId = 0;
    let lastTime = performance.now();
    let spinY = 0;

    const tick = (now: number) => {
      rafId = requestAnimationFrame(tick);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // smooth mouse parallax (max ±0.18 / ±0.12)
      const mk = 1 - Math.exp(-3 * delta);
      mouse.x += (mouse.tx - mouse.x) * mk;
      mouse.y += (mouse.ty - mouse.y) * mk;
      camera.position.x = mouse.x * 0.18;
      camera.position.y = -mouse.y * 0.12;
      camera.lookAt(0, 0, 0);

      // scroll-driven pivot
      const p = progressRef.current;
      const e = easeInOut(p);
      const aspect = container.clientWidth / container.clientHeight;
      const narrow = Math.max(0, Math.min(0.6, 1.2 - aspect));
      const s = lerp(BASE.s0, BASE.s1, e) * (1 - narrow * 0.25);
      pivot.position.x = lerp(BASE.x0 - narrow * 1.4, BASE.x1, e);
      pivot.position.y = lerp(BASE.y0 + narrow * 0.30, BASE.y1, e);
      pivot.scale.setScalar(s);

      // planet auto-rotation ~0.1 rad/s + scroll bonus turn
      spinY += 0.1 * delta;
      planet.rotation.y = spinY + p * Math.PI * 0.32;

      stars.rotation.y += 0.011 * delta;

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!rafId) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(tick);
      }
    };
    const stopLoop = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    // pause when container scrolled off-screen
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? startLoop() : stopLoop()),
      { threshold: 0.01 },
    );
    io.observe(container);

    // pause when browser tab is hidden
    const onVisibility = () =>
      document.hidden ? stopLoop() : startLoop();
    document.addEventListener("visibilitychange", onVisibility);

    startLoop();

    // ─── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      stopLoop();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geo.dispose();
      mat.dispose();
      colorTex.dispose();
      bumpTex.dispose();
      normalTex.dispose();
      dispTex.dispose();
      sGeo.dispose();
      sMat.dispose();
      sTex.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [progressRef]);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />;
}
