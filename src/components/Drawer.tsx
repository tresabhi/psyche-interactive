import { Flex, IconButton } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

const SIZES = [2, 4, 8, 16, 32];

export function Drawer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [size, setSize] = useState(2);

  useEffect(() => {
    if (!canvas.current) return;

    const c = canvas.current;
    const ctx = c.getContext("2d")!;

    const resize = () => {
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      c.width = rect.width * dpr;
      c.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.lineWidth = size;
      ctx.lineCap = "round";
    };

    resize();
    window.addEventListener("resize", resize);

    const position = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
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

    c.addEventListener("mousedown", down);
    c.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("resize", resize);
      c.removeEventListener("mousedown", down);
      c.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
  }, [size]);

  return (
    <Flex
      direction="column"
      gap="6"
      style={{
        backgroundColor: "white",
        width: "40vw",
        height: "40vh",
        borderRadius: "var(--radius-2)",
      }}
    >
      <canvas ref={canvas} style={{ width: "100%", height: "100%" }} />

      <Flex justify="center" gap="1">
        {SIZES.map((s) => {
          const selected = s === size;

          return (
            <IconButton
              size="3"
              key={s}
              highContrast
              variant={selected ? "solid" : "outline"}
              onClick={() => {
                setSize(s);
              }}
            >
              <div
                style={{
                  width: `${s}px`,
                  height: `${s}px`,
                  backgroundColor: "currentColor",
                  borderRadius: "100%",
                }}
              />
            </IconButton>
          );
        })}
      </Flex>
    </Flex>
  );
}
