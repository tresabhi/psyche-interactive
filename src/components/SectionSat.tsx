import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, PointLight, type Group } from "three";
import { PsycheSat } from "./PsycheSat";
import { Sun } from "./Sun";

export function SectionSat() {
  const scroll = useScroll();
  const wrapper = useRef<Group>(null);

  useFrame(() => {
    if (!wrapper.current) return;

    wrapper.current.visible = scroll.visible(
      2.5 / scroll.pages,
      3 / scroll.pages
    );

    for (const child of wrapper.current.children) {
      if (!(child instanceof PointLight)) continue;

      child.intensity =
        child.userData.intensity *
        scroll.range(3 / scroll.pages, 1 / scroll.pages);
    }
  });

  return (
    <group ref={wrapper}>
      <pointLight position={[3, 4, 30]} userData={{ intensity: 3 }} decay={0} />
      <Sun position={[15, 15, 100]} />

      <pointLight
        position={[0, 0, 0]}
        userData={{ intensity: 2 }}
        color={new Color(0.5, 0.5, 1)}
        decay={0}
      />

      <PsycheSat />
    </group>
  );
}
