import { Gltf } from "@react-three/drei";
import { forwardRef, type ComponentProps } from "react";
import { Group } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { useProgress } from "./Progress";

const DISTANCE = 10;

export const Earth = forwardRef<Group, ComponentProps<"group">>(
  (props, ref) => {
    const { inverseProgress } = useProgress(0, 1);

    return (
      <group
        rotation={[
          (Math.PI / 4) * inverseProgress,
          -(Math.PI / 2) * inverseProgress,
          0,
        ]}
        position={[0, 0, -(DISTANCE + 0.5) * inverseProgress]}
        scale={5}
      >
        <Gltf
          rotation={[degToRad(20), degToRad(-10), 0]}
          scale={1 / 200}
          src="/models/earth.glb"
        />
      </group>
    );
  }
);
