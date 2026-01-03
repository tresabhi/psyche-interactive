import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, PointLight } from "three";
import { Earth } from "./Earth";
import { Florida } from "./Florida";
import { LaunchAnimation } from "./LaunchAnimation";
import { Scroller } from "./Scroller";

export function SectionIntro() {
  const scroll = useScroll();
  const wrapper = useRef<Group>(null);
  const light = useRef<PointLight>(null);

  useFrame(() => {
    if (!wrapper.current || !light.current) return;

    wrapper.current.visible = scroll.visible(0, 3.5 / scroll.pages);
    light.current.intensity =
      2 * (1 - scroll.range(2 / scroll.pages, 1 / scroll.pages));
  });

  return (
    <group ref={wrapper}>
      <pointLight ref={light} position={[-10, 10, 10]} decay={0} />

      <Earth />
      <Florida />
      <Scroller />
      <LaunchAnimation />
    </group>
  );
}
