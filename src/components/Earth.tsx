import { Gltf } from "@react-three/drei";
import type { ComponentProps } from "react";

export function Earth(props: ComponentProps<"group">) {
  return (
    <group {...props}>
      <Gltf scale={1 / 200} src="/models/earth.glb" />
    </group>
  );
}
