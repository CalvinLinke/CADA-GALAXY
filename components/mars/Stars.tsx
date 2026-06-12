"use client";
import * as THREE from "three";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { starSprite } from "./marsTextures";

export function Stars() {
  const ref = useRef<THREE.Points>(null!);

  const { geometry, material } = useMemo(() => {
    const N = 3200;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const palette = [
      [1, 1, 1], [0.78, 0.84, 1], [1, 0.93, 0.84],
      [0.88, 0.93, 1], [1, 0.86, 0.72], [0.95, 0.97, 1],
    ];
    for (let i = 0; i < N; i++) {
      const r  = 30 + Math.random() * 70;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pos[i * 3]     = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      const p   = palette[(Math.random() * palette.length) | 0];
      const mag = Math.pow(Math.random(), 2.4);
      const b   = 0.22 + mag * 0.78;
      col[i * 3]     = p[0] * b;
      col[i * 3 + 1] = p[1] * b;
      col[i * 3 + 2] = p[2] * b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color",    new THREE.BufferAttribute(col, 3));

    const tex = new THREE.CanvasTexture(starSprite());
    const m = new THREE.PointsMaterial({
      size: 0.42,
      map: tex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    return { geometry: g, material: m };
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += 0.011 * delta;
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}
