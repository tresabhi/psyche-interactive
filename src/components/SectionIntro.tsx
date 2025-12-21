import { Earth } from "./Earth";
import { Title } from "./Title";

export function SectionIntro() {
  return (
    <>
      <Title />

      <pointLight position={[-10, 10, 10]} decay={0} intensity={2} />
      <Earth />
    </>
  );
}
