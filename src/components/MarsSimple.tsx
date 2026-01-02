import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3, type Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { J_HAT } from "../util/hats";
import { smooth } from "../util/smooth";

export const marsInitialPosition = new Vector3(152 / 2, 0, 0).applyAxisAngle(
  J_HAT,
  degToRad(-20)
);

export function MarsSimple() {
  const mars = useRef<Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!mars.current) return;

    const t = 2 * smooth(scroll.range(7 / scroll.pages, 2 / scroll.pages));
    // n_mars / n_earth = 0.534
    const theta = 0.534 * 2 * Math.PI * t;

    mars.current.position
      .copy(marsInitialPosition)
      .applyAxisAngle(J_HAT, theta);
  });

  return (
    <mesh ref={mars}>
      <icosahedronGeometry args={[2, 1]} />
      <meshStandardMaterial color="#f57e3e" />
    </mesh>
  );
}
