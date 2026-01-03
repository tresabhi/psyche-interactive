import { Environment, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SectionCat } from "./SectionCat";
import { SectionIntro } from "./SectionIntro";
import { SectionMystery } from "./SectionMystery";
import { SectionSat } from "./SectionSat";
import { SectionSolar } from "./SectionSolar";

export function Sandbox() {
  return (
    <Canvas gl={{ localClippingEnabled: true }}>
      <Environment
        environmentIntensity={0}
        background
        files={[`${import.meta.env.BASE_URL}stars.jpg`]}
      />

      <ScrollControls pages={12}>
        <SectionIntro />
        <SectionSat />
        <SectionCat />
        <SectionSolar />
        <SectionMystery />
      </ScrollControls>
    </Canvas>
  );
}
