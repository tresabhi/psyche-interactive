import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function Sandbox() {
  return (
    <Canvas>
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <pointLight position={[10, 8, 5]} intensity={100} />

      <OrbitControls />
    </Canvas>
  );
}
