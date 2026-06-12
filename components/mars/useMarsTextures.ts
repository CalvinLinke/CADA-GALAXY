"use client";
import * as THREE from "three";
import { useMemo } from "react";
import { buildMarsColor, buildMarsBump, buildMarsDisplacement, genCraters } from "./marsTextures";

export function useMarsTextures() {
  return useMemo(() => {
    // genCraters once — share between color and bump so they align
    const craters = genCraters(4096, 2048);

    const colorCanvas = buildMarsColor(craters);
    const bumpCanvas  = buildMarsBump(craters);
    const dispCanvas  = buildMarsDisplacement(craters);

    const color = new THREE.CanvasTexture(colorCanvas);
    color.colorSpace = THREE.SRGBColorSpace;
    color.wrapS = THREE.RepeatWrapping;

    const bump = new THREE.CanvasTexture(bumpCanvas);
    bump.wrapS = THREE.RepeatWrapping;

    const displacement = new THREE.CanvasTexture(dispCanvas);
    displacement.wrapS = THREE.RepeatWrapping;

    return { color, bump, displacement };
  }, []);
}
