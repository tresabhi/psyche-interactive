import { Quicklime, type QuicklimeEvent } from "quicklime";
import { useEffect, useState } from "react";

export const progressEvent = new Quicklime(0);

export function useProgress(min: number, max: number) {
  const [progress, setProgress] = useState(progressEvent.last! - min);

  useEffect(() => {
    function update(event: QuicklimeEvent<number>) {
      setProgress(event.data - min);
    }

    progressEvent.on(update);

    return () => {
      progressEvent.off(update);
    };
  }, []);

  const inverseProgress = 1 - progress;
  const visible = progress >= 0 && progress < max - min;

  return { progress, visible, inverseProgress };
}
