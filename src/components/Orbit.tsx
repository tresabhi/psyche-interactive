import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { MeshBasicMaterial } from "three";

interface Props {
  size: number;
}

export function Orbit({ size }: Props) {
  const scroll = useScroll();
  const material = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    if (!material.current) return;

    material.current.opacity = scroll.range(7 / scroll.pages, 1 / scroll.pages);
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[size / 2, 2 ** -3, 2, 2 ** 6]} />
        <meshBasicMaterial ref={material} transparent color="#808080" />
      </mesh>
    </group>
  );
}
