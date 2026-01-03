import { Gltf, useScroll, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Group, type SpriteMaterial } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { J_HAT } from "../util/hats";

export function SectionMystery() {
  const cloud1 = useTexture(`${import.meta.env.BASE_URL}clouds/1.png`);
  const cloud2 = useTexture(`${import.meta.env.BASE_URL}clouds/2.png`);
  const cloud3 = useTexture(`${import.meta.env.BASE_URL}clouds/3.png`);
  const cloud4 = useTexture(`${import.meta.env.BASE_URL}clouds/4.png`);
  const clouds = [cloud1, cloud2, cloud3, cloud4];
  const scroll = useScroll();

  const cloud = useRef<SpriteMaterial>(null);

  const sat = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!sat.current || !cloud.current) return;

    sat.current.position
      .set(5, Math.sin(clock.elapsedTime * 2), 0)
      .applyAxisAngle(J_HAT, clock.elapsedTime + Math.PI / 2);
    sat.current.rotation.set(
      degToRad(90),
      degToRad(90),
      degToRad(25 * Math.sin(clock.elapsedTime))
    );

    cloud.current.map =
      clouds[Math.floor(clock.elapsedTime * clouds.length) % clouds.length];
    cloud.current.needsUpdate = true;

    cloud.current.opacity =
      1 - scroll.range(10 / scroll.pages, 1 / scroll.pages);
  });

  return (
    <group position={[-3, 250, 0]}>
      <pointLight decay={0} intensity={4} />

      <Gltf
        src={`${import.meta.env.BASE_URL}models/psyche-sat.glb`}
        scale={2 ** -4}
        ref={sat}
      />

      <sprite>
        <spriteMaterial transparent ref={cloud} map={cloud1} />
      </sprite>
    </group>
  );
}
