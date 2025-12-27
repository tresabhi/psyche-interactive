import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../util/smooth";
import { MarsSimple } from "./MarsSimple";
import { Orbit } from "./Orbit";
import { Sun } from "./Sun";

export function SectionSolar() {
  const scroll = useScroll();
  const wrapper = useRef<Group>(null);

  useFrame(({ camera }) => {
    if (!wrapper.current) return;

    wrapper.current.visible = scroll.visible(
      7 / scroll.pages,
      2 / scroll.pages
    );

    const t = smooth(scroll.range(7 / scroll.pages, 1 / scroll.pages));

    if (t === 0) return;

    camera.rotation.set(lerp(0, -Math.PI / 2, t), 0, 0);
    camera.position.set(lerp(50, 0, t), lerp(0, 250, t), lerp(5, 0, t));
  });

  return (
    <group ref={wrapper}>
      <Sun size={3} />

      <Orbit size={100} />
      <Orbit size={152} />
      <MarsSimple />
    </group>
  );
}
