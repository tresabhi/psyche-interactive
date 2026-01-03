import { Image, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh, ShaderMaterial } from "three";
import { smooth } from "../util/smooth";

export function Florida() {
  const image = useRef<Mesh>(null);
  const scroll = useScroll();

  useFrame(() => {
    if (!image.current) return;

    const t = smooth(scroll.curve(1 / scroll.pages, 1 / scroll.pages));

    (image.current.material as ShaderMaterial).opacity = t;
  });

  return (
    <group position={[0.5, 0, -3]} scale={2 ** -2}>
      <Image
        ref={image}
        opacity={0}
        url={`${import.meta.env.BASE_URL}florida/cape.png`}
        transparent
        scale={[6.4, 1]}
      />
    </group>
  );
}
