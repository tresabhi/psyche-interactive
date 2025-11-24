import { Canvas } from "@react-three/fiber";
import { Earth } from "./Earth";
import { useProgress } from "./Progress";
import { ScrollHint } from "./ScrollHint";
import { Section } from "./Section";

export function SectionIntro() {
  const { visible, progress, inverseProgress } = useProgress(0, 1);

  if (!visible) return null;

  return (
    <Section>
      <Canvas camera={{ fov: 45 }}>
        <pointLight position={[-10, 10, 10]} decay={0} intensity={2} />
        <Earth />
      </Canvas>

      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontStretch: "ultra-expanded",
          fontWeight: 900,
          fontSize: "5vw",
          whiteSpace: "nowrap",
          color: "var(--gray-11)",
          filter: `opacity(${100 * inverseProgress}%) blur(${1 * progress}rem)`,
        }}
      >
        PSYCHE INTERACTIVE
      </span>

      <ScrollHint
        style={{
          opacity: `${100 * inverseProgress}%`,
        }}
      />
    </Section>
  );
}
