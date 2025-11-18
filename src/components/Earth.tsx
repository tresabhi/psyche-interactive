import { Gltf } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, type ComponentProps } from "react";
import { Group } from "three";

export function Earth(props: ComponentProps<"group">) {
  const gltf = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!gltf.current) return;
    gltf.current.rotation.y = clock.elapsedTime / 10;
  });

  return (
    <group {...props}>
      <Gltf ref={gltf} scale={1 / 200} src="/models/earth.glb" />
    </group>
  );
}
