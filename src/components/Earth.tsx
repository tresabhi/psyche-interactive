import { Gltf, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { smooth } from "../util/smooth";

export function Earth() {
  const scroll = useScroll();

  const wrapper = useRef<Group>(null);
  const globe = useRef<Group>(null);

  useFrame(({ clock, camera }) => {
    const t = smooth(scroll.range(0, 1 / scroll.pages));
    const s = lerp(15, 30, t);
    const theta = (clock.elapsedTime / 10) % (2 * Math.PI);

    wrapper.current?.rotation.set(
      lerp(Math.PI / 4, 0, t),
      lerp(-Math.PI / 2, 0, t ** (1 / 2)),
      0
    );
    wrapper.current?.scale.set(s, s, s);
    wrapper.current?.position.set(0, lerp(-7, 0, t), -25);
    globe.current?.rotation.set(
      degToRad(28.5),
      lerp(theta, degToRad(-10.5), t),
      0
    );

    camera.zoom = lerp(5, 3, t);
    camera.updateProjectionMatrix();
  });

  return (
    <group ref={wrapper}>
      <Gltf ref={globe} scale={1 / 200} src="/models/earth.glb" />
    </group>
  );
}
