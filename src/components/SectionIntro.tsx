import { Earth } from "./Earth";
import { Florida } from "./Florida";
import { LaunchSequence } from "./LaunchSequence";
import { Title } from "./Title";

export function SectionIntro() {
  return (
    <>
      <pointLight position={[-10, 10, 10]} decay={0} intensity={2} />

      <Title />
      <Earth />
      <Florida />
      <LaunchSequence />
    </>
  );
}
