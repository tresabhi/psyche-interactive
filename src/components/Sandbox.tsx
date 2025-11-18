import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";

export function Sandbox() {
  return (
    <Canvas style={{ background: "black" }}>
      <pointLight decay={0} intensity={3} />

      <Environment background files="/stars.jpg" />

      <OrbitControls />
      <Earth position={[0, 0, 2]} />
    </Canvas>
  );
}
