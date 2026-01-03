import { Box } from "@radix-ui/themes";
import { useEffect, useRef } from "react";

export function Drawer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext("2d")!;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const position = (e: MouseEvent) => {
      const rect = canvas.current!.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top];
    };

    const down = (e: MouseEvent) => {
      drawing.current = true;

      const [x, y] = position(e);

      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const move = (e: MouseEvent) => {
      if (!drawing.current) return;

      const [x, y] = position(e);

      ctx.lineTo(x, y);
      ctx.stroke();
    };

    const up = () => {
      drawing.current = false;
    };

    canvas.current.addEventListener("mousedown", down);
    canvas.current.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      canvas.current!.removeEventListener("mousedown", down);
      canvas.current!.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <Box
      style={{
        backgroundColor: "white",
        width: "40vw",
        height: "40vh",
        borderRadius: "1rem",
      }}
    >
      <canvas
        ref={canvas}
        width={800}
        height={400}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
