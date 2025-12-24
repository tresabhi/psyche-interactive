import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { SectionIntro } from "./SectionIntro";

export function Sandbox() {
  return (
    <Canvas gl={{ localClippingEnabled: true }}>
      {import.meta.env.DEV && <OrbitControls enableZoom={false} />}

      <Environment environmentIntensity={0} background files={["/stars.jpg"]} />

      <ScrollControls pages={5}>
        <SectionIntro />
      </ScrollControls>
    </Canvas>
  );
}
