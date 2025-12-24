import { Gltf, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../util/smooth";

export function PsycheSat() {
  const model = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!model.current) return;

    const t = smooth(scroll.range(2 / scroll.pages, 2 / scroll.pages));

    model.current.position.set(300 * (1 - t), -80 * (1 - t), 40);
    model.current.rotation.set(
      lerp(degToRad(-30), degToRad(10), t),
      lerp(degToRad(0), degToRad(190), t),
      degToRad(100)
    );
  });

  return <Gltf ref={model} src="/models/psyche-sat.glb" />;
}
