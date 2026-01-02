import { useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Sprite, SpriteMaterial, Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { J_HAT } from "../util/hats";
import { smooth } from "../util/smooth";
import { marsInitialPosition } from "./MarsSimple";
import { earthInitialPosition } from "./SectionCat";

const earth = new Vector3();
const mars = new Vector3();
const n = 1;

export function SatOrbiter() {
  const texture = useTexture("/satellite.png");
  const scroll = useScroll();
  const sat = useRef<Sprite>(null);
  const mat = useRef<SpriteMaterial>(null);

  useFrame(() => {
    if (!sat.current || !mat.current) return;

    const t = 2 * smooth(scroll.range(7 / scroll.pages, 2 / scroll.pages));
    const theta_earth = 2 * Math.PI * t;
    const theta_mars = 0.534 * 2 * Math.PI * t;

    earth.copy(earthInitialPosition).applyAxisAngle(J_HAT, theta_earth);
    mars.copy(marsInitialPosition).applyAxisAngle(J_HAT, theta_mars);

    const r_earth = earthInitialPosition.length();
    const r_mars = marsInitialPosition.length();

    const r = lerp(
      r_earth,
      r_mars + 7,
      t < 1 ? (2 - 4 * n) * t ** 2 + (4 * n - 1) * t : t ** 3
    );
    const theta = lerp(
      theta_earth + degToRad(50),
      theta_mars - degToRad(20),
      t ** (1 / 2)
    );

    sat.current.visible = true;
    sat.current.position.set(r, 0, 0).applyAxisAngle(J_HAT, theta);
    mat.current.opacity = scroll.range(7 / scroll.pages, 0.1 / scroll.pages);
  });

  return (
    <sprite ref={sat} scale={10}>
      <spriteMaterial ref={mat} transparent map={texture} />
    </sprite>
  );
}
