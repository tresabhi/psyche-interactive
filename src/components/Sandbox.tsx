import { Environment, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SectionIntro } from "./SectionIntro";
import { SectionSat } from "./SectionSat";

export function Sandbox() {
  return (
    <Canvas gl={{ localClippingEnabled: true }}>
      <Environment environmentIntensity={0} background files={["/stars.jpg"]} />

      <ScrollControls pages={6}>
        <SectionIntro />
        <SectionSat />
      </ScrollControls>
    </Canvas>
  );
}
