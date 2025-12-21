import { Environment, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SectionIntro } from "./SectionIntro";

export function Sandbox() {
  return (
    <Canvas>
      <Environment environmentIntensity={0} background files={["/stars.jpg"]} />

      <ScrollControls pages={1}>
        <SectionIntro />
      </ScrollControls>
    </Canvas>
  );
}
