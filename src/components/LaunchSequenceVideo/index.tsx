import { useEffect, useRef } from "react";
import { SEQUENCE_SIZE } from "../LaunchSequence";
import "./index.css";

interface Props {
  index: number;
}

export function LaunchSequenceVideo({ index }: Props) {
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapper.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            wrapper.current!.classList.add("visible");
          }, index * 1000);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(wrapper.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapper}
      className="launch-sequence"
      style={{
        left: `${
          (0.5 + (index + 0.5 - SEQUENCE_SIZE / 2) / SEQUENCE_SIZE / 1.5) * 100
        }%`,
        top: `${
          (0.5 + (index + 0.5 - SEQUENCE_SIZE / 2) / SEQUENCE_SIZE / 4) * 100
        }%`,
      }}
    >
      <video src={`/launch-sequence/${index + 1}.mp4`} autoPlay muted loop />
    </div>
  );
}
