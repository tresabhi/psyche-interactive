import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../util/smooth";
import { Orbit } from "./Orbit";
import { Sun } from "./Sun";

export function SectionSolar() {
  const scroll = useScroll();

  useFrame(({ camera }) => {
    const t = smooth(scroll.range(7 / scroll.pages, 1 / scroll.pages));

    if (t === 0) return;

    camera.position.set(lerp(50, 0, t), lerp(0, 200, t), lerp(5, 0, t));
    camera.rotation.set(lerp(degToRad(-30), -Math.PI / 2, t), 0, 0);
  });

  return (
    <>
      <Sun size={3} />

      <Orbit size={88} />
    </>
  );
}
