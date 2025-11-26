import { Gltf, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";

export function Earth() {
  const scroll = useScroll();

  const wrapper = useRef<Group>(null);

  useFrame(() => {
    const x = scroll.range(0, 1 / scroll.pages);

    const scale = lerp(5, 100, x);

    wrapper.current?.rotation.set(
      lerp(Math.PI / 4, 0, x),
      lerp(-Math.PI / 2, 0, x ** (1 / 2)),
      0
    );
    wrapper.current?.scale.set(scale, scale, scale);
  });

  return (
    <group ref={wrapper} position={[0, 0, -50]}>
      <Gltf
        rotation={[degToRad(27), degToRad(-9), 0]}
        scale={1 / 200}
        src="/models/earth.glb"
      />
    </group>
  );
}
