import { Environment, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SectionCat } from "./SectionCat";
import { SectionIntro } from "./SectionIntro";
import { SectionSat } from "./SectionSat";
import { SectionSolar } from "./SectionSolar";

export function Sandbox() {
  return (
    <Canvas gl={{ localClippingEnabled: true }}>
      <Environment environmentIntensity={0} background files={["/stars.jpg"]} />

      <ScrollControls pages={11}>
        <SectionIntro />
        <SectionSat />
        <SectionCat />
        <SectionSolar />
      </ScrollControls>
    </Canvas>
  );
}
