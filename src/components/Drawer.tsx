import { CheckIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

const SIZES = [2, 4, 8, 16, 32];
const COLORS = [
  "#ffffffff",
  "#9a9a9aff",
  "#5f5f5fff",
  "#303030ff",
  "#000000ff",
  "#634c30ff",
];

export function Drawer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hide, setHide] = useState(false);
  const [size, setSize] = useState(SIZES[0]);
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext("2d")!;
    ctx.lineCap = "round";

    const resize = () => {
      const rect = canvas.current!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const dpr = window.devicePixelRatio || 1;

      const image = ctx.getImageData(
        0,
        0,
        canvas.current!.width,
        canvas.current!.height
      );

      canvas.current!.width = rect.width * dpr;
      canvas.current!.height = rect.height * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.putImageData(image, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.current);

    const down = (e: PointerEvent) => {
      drawing.current = true;
      canvas.current!.setPointerCapture(e.pointerId);

      const rect = canvas.current!.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };

    const move = (e: PointerEvent) => {
      if (!drawing.current) return;

      const rect = canvas.current!.getBoundingClientRect();
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    };

    const up = (e: PointerEvent) => {
      drawing.current = false;
      canvas.current!.releasePointerCapture(e.pointerId);
    };

    canvas.current.addEventListener("pointerdown", down);
    canvas.current.addEventListener("pointermove", move);
    canvas.current.addEventListener("pointerup", up);
    canvas.current.addEventListener("pointercancel", up);

    return () => {
      ro.disconnect();
      canvas.current!.removeEventListener("pointerdown", down);
      canvas.current!.removeEventListener("pointermove", move);
      canvas.current!.removeEventListener("pointerup", up);
      canvas.current!.removeEventListener("pointercancel", up);
    };
  }, [size, color]);

  return (
    <Flex
      direction="column"
      gap={{ initial: "3", md: "6" }}
      style={{
        width: "40vw",
        height: "60dvh",
      }}
      align="center"
    >
      {!hide && <Heading>DRAW YOUR PSYCHE</Heading>}

      <canvas
        ref={canvas}
        style={{
          borderRadius: "var(--radius-2)",
          width: "100%",
          height: "100%",
          backgroundColor: hide ? "transparent" : "white",
          touchAction: "none",
        }}
      />

      {!hide && (
        <Flex justify="center" gap="5">
          <Flex gap="1">
            {SIZES.map((s) => {
              const selected = s === size;

              return (
                <IconButton
                  key={s}
                  size={{ initial: "2", md: "3" }}
                  highContrast
                  variant={selected ? "solid" : "outline"}
                  onClick={() => {
                    setSize(s);
                  }}
                >
                  <div
                    style={{
                      width: s,
                      height: s,
                      backgroundColor: "currentColor",
                      borderRadius: "100%",
                    }}
                  />
                </IconButton>
              );
            })}
          </Flex>

          <Flex gap="1">
            {COLORS.map((c) => {
              const selected = c === color;
              return (
                <IconButton
                  key={c}
                  size={{ initial: "2", md: "3" }}
                  highContrast
                  variant={selected ? "solid" : "outline"}
                  onClick={() => {
                    setColor(c);
                  }}
                >
                  <div
                    style={{
                      width: "2rem",
                      height: "2rem",
                      backgroundColor: c,
                      borderRadius: "100%",
                    }}
                  />
                </IconButton>
              );
            })}
          </Flex>

          <IconButton
            size={{ initial: "2", md: "3" }}
            highContrast
            onClick={() => {
              setHide(true);
            }}
          >
            <CheckIcon />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
}
