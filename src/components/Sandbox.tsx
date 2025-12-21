import { Environment, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SectionIntro } from "./SectionIntro";

export function Sandbox() {
  return (
    <Canvas orthographic camera={{ zoom: 64 }}>
      <Environment background files={["/stars.jpg"]} />

      <ScrollControls pages={1} damping={0}>
        <SectionIntro />
      </ScrollControls>
    </Canvas>
  );
}
