import { Earth } from "./Earth";

export function SectionIntro() {
  return (
    <>
      <pointLight position={[-10, 10, 10]} decay={0} intensity={2} />
      <Earth />
    </>
  );
}
