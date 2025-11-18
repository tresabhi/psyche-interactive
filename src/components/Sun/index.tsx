import fragmentShader from "./shaders/fragment.glsl?raw";
import vertexShader from "./shaders/vertex.glsl?raw";

export function Sun() {
  return (
    <mesh frustumCulled={false}>
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
