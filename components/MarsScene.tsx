"use client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Mars } from "./mars/Mars";
import { Stars } from "./mars/Stars";

interface MarsSceneProps {
  progressRef: React.MutableRefObject<number>;
}

export default function MarsScene({ progressRef }: MarsSceneProps) {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ fov: 45, position: [0, 0, 3.25], near: 0.1, far: 200 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NoToneMapping;
        gl.outputColorSpace = THREE.SRGBColorSpace;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Stars />
      <Mars progressRef={progressRef} />
      <directionalLight color={0xfff1e4} intensity={2.7} position={[4.5, 1.4, 3.2]} />
      <directionalLight color={0x5878a8} intensity={2.05} position={[-4, -1.5, -2]} />
      <ambientLight color={0x3a4560} intensity={0.82} />
    </Canvas>
  );
}
