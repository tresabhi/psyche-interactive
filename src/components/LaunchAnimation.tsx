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
    const tPath = smooth(scroll.range(2 / scroll.pages, 1 / scroll.pages));
    const tCamX = smooth(scroll.curve(2 / scroll.pages, 2 / scroll.pages));
    const tCamY = smooth(scroll.range(2 / scroll.pages, 2 / scroll.pages));

    plane.current.constant = lerp(-1, 20, tPath);
    plane.current.normal.set(-1, 0, 0).applyAxisAngle(J_HAT, tPath * 2);

    camera.rotation.set(
      lerp(0, degToRad(15), tCamX),
      lerp(0, -Math.PI, tCamY),
      0
    );
    camera.position.set(0, lerp(0, -3, tCamX), 5);
  });

  return (
    <mesh position={[9.73, 0, -10]} rotation={[Math.PI / 2, 0, 0]}>
      <meshBasicMaterial clippingPlanes={[plane.current]} />
      <torusGeometry args={[10, 2 ** -6, 3, 2 ** 7]} />
    </mesh>
  );
}
