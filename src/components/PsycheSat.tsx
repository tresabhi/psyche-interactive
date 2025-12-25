import { Text } from "@radix-ui/themes";
import { Gltf, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../util/smooth";
import { Info } from "./Info";

export function PsycheSat() {
  const wrapper = useRef<Group>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!wrapper.current) return;

    const t = smooth(scroll.range(2 / scroll.pages, 2 / scroll.pages));

    wrapper.current.position.set(300 * (1 - t), -80 * (1 - t), 40);
    wrapper.current.rotation.set(
      lerp(degToRad(-30), degToRad(10), t),
      lerp(degToRad(0), degToRad(190), t),
      degToRad(100)
    );
  });

  return (
    <group ref={wrapper}>
      <Info position={[1, 0, 3]}>
        <Text weight="bold">Apple sauce</Text>
      </Info>

      <Gltf src="/models/psyche-sat.glb" />
    </group>
  );
}
