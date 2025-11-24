import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { r_E, SCALE } from "../constants";
import { Earth } from "./Earth";
import { Sun } from "./Sun";

export function Sandbox() {
  return (
    <Canvas
      style={{ background: "black" }}
      camera={{
        position: [-2, 2, r_E * SCALE + 2],
        fov: 60,
      }}
    >
      <pointLight decay={0} intensity={2} />

      <Environment background files="/stars.jpg" />

      <OrbitControls target={[0, 0, r_E * SCALE]} />
      <Earth position={[0, 0, r_E * SCALE]} />

      <Sun />
    </Canvas>
  );
}
