"use client";
import * as THREE from "three";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useMarsTextures } from "./useMarsTextures";

const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const BASE = { x0: 1.28, x1: 0.02, y0: -0.04, y1: 0.02, s0: 1.12, s1: 1.72 };

interface MarsProps {
  progressRef: React.MutableRefObject<number>;
}

export function Mars({ progressRef }: MarsProps) {
  const pivot  = useRef<THREE.Group>(null!);
  const planet = useRef<THREE.Mesh>(null!);
  const spin   = useRef(0);
  const mouse  = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const { color, bump, displacement } = useMarsTextures();
  const { size } = useThree();

  useFrame((state, delta) => {
    // pointer → mouse parallax target
    mouse.current.tx = state.pointer.x * 0.5;
    mouse.current.ty = state.pointer.y * 0.5;

    const p = progressRef.current;
    const e = easeInOut(p);

    // narrow viewport: shift planet left + up so it stays visible on mobile
    const aspect = size.width / size.height;
    const narrow = Math.max(0, Math.min(0.6, 1.2 - aspect));
    const s = lerp(BASE.s0, BASE.s1, e) * (1 - narrow * 0.25);

    pivot.current.position.x = lerp(BASE.x0 - narrow * 1.4, BASE.x1, e);
    pivot.current.position.y = lerp(BASE.y0 + narrow * 0.30, BASE.y1, e);
    pivot.current.scale.setScalar(s);

    // delta-time auto-rotation + scroll extra turn
    spin.current += 0.1 * delta;
    planet.current.rotation.y = spin.current + p * Math.PI * 0.32;

    // smooth camera mouse parallax
    const mk = 1 - Math.exp(-3 * delta);
    mouse.current.x += (mouse.current.tx - mouse.current.x) * mk;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * mk;
    state.camera.position.x = mouse.current.x * 0.18;
    state.camera.position.y = -mouse.current.y * 0.12;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={pivot} position={[BASE.x0, BASE.y0, 0]} scale={BASE.s0}>
      <mesh ref={planet} rotation={[0.12, 0, 0.42]}>
        <sphereGeometry args={[1, 256, 256]} />
        <meshStandardMaterial
          map={color}
          bumpMap={bump}
          bumpScale={0.12}
          displacementMap={displacement}
          displacementScale={0.10}
          displacementBias={-0.04}
          roughness={0.96}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
