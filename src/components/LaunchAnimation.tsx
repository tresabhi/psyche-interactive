import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Plane, Vector3 } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils.js";
import { J_HAT } from "../util/hats";
import { smooth } from "../util/smooth";

export function LaunchAnimation() {
  const plane = useRef(new Plane(new Vector3(-1, 0, 0).normalize(), 0));
  const scroll = useScroll();

  useFrame(({ camera }) => {
    const t = smooth(scroll.range(2 / scroll.pages, 1 / scroll.pages));

    plane.current.constant = lerp(-1, 20, t);
    plane.current.normal.set(-1, 0, 0).applyAxisAngle(J_HAT, t * 2);

    camera.rotation.set(
      lerp(0, degToRad(25), t),
      lerp(0, degToRad(-100), t),
      0
    );
    camera.position.set(0, lerp(0, -2, t), 5);
  });

  return (
    <mesh position={[9.73, 0, -10]} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial clippingPlanes={[plane.current]} />
      <torusGeometry args={[10, 2 ** -6, 3, 2 ** 7]} />
    </mesh>
  );
}
