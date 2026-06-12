"use client";
import { useMemo } from "react";
import * as THREE from "three";

const vert = `
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  vNormal = normalize(normalMatrix * normal);
  vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
  vViewDir = normalize(-mvPos.xyz);
  gl_Position = projectionMatrix * mvPos;
}`;

const frag = `
uniform vec3 glowColor;
varying vec3 vNormal;
varying vec3 vViewDir;
void main() {
  float intensity = 1.0 - dot(vNormal, vViewDir);
  intensity = pow(intensity, 2.5);
  gl_FragColor = vec4(glowColor, intensity * 0.78);
}`;

export function Atmosphere() {
  const uniforms = useMemo(
    () => ({ glowColor: { value: new THREE.Color(0xff7040) } }),
    []
  );
  return (
    <mesh scale={1.06}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={vert}
        fragmentShader={frag}
        uniforms={uniforms}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
