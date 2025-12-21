import { Gltf, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";

export function Earth() {
  const scroll = useScroll();

  const wrapper = useRef<Group>(null);
  const globe = useRef<Group>(null);

  useFrame(({ clock }) => {
    const t = scroll.range(0, 1 / scroll.pages);
    const s = lerp(30, 100, t);
    const theta = (clock.elapsedTime / 10) % (2 * Math.PI);

    wrapper.current?.rotation.set(
      lerp(Math.PI / 4, 0, t),
      lerp(-Math.PI / 2, 0, t ** (1 / 2)),
      0
    );
    wrapper.current?.scale.set(s, s, s);
    wrapper.current?.position.set(0, lerp(-14, 0, t), -50);
    globe.current?.rotation.set(degToRad(27), lerp(theta, degToRad(-9), t), 0);
  });

  return (
    <group ref={wrapper}>
      <Gltf ref={globe} scale={1 / 200} src="/models/earth.glb" />
    </group>
  );
}
