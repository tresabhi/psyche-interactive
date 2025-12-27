import type { ComponentProps } from "react";
import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

interface Props extends ComponentProps<"mesh"> {
  size?: number;
}

export function Sun({ size = 1, ...props }: Props) {
  return (
    <mesh frustumCulled={false} {...props}>
      <planeGeometry args={[size * 2 ** 4, size * 2 ** 4]} />
      <shaderMaterial
        uniforms={{
          bloomThreshold: { value: 1 / 32 },
          bloomPower: { value: 2 ** 2 },
        }}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        transparent
      />
    </mesh>
  );
}
