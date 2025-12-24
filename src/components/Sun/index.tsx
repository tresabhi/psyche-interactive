import type { ComponentProps } from "react";
import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

export function Sun(props: ComponentProps<"mesh">) {
  return (
    <mesh frustumCulled={false} {...props}>
      <planeGeometry args={[2 ** 4, 2 ** 4]} />
      <shaderMaterial
        uniforms={{
          bloomThreshold: { value: 1 / 32 },
          bloomPower: { value: 8 },
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
      />
    </mesh>
  );
}
