import { CheckIcon } from "@radix-ui/react-icons";
import { Flex, Heading, IconButton } from "@radix-ui/themes";
import { useCallback, useEffect, useRef, useState } from "react";

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

  const savedData = useRef<ImageData | null>(null);

  const resize = useCallback((ctx: CanvasRenderingContext2D) => {
    const rect = canvas.current!.getBoundingClientRect();
    const dpr = window.devicePixelRatio ?? 1;

    savedData.current = ctx.getImageData(
      0,
      0,
      canvas.current!.width,
      canvas.current!.height
    );

    canvas.current!.width = rect.width * dpr;
    canvas.current!.height = rect.height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (savedData.current) ctx.putImageData(savedData.current, 0, 0);
  }, []);
  const getPos = useCallback((ctx: CanvasRenderingContext2D, e: MouseEvent) => {
    const rect = ctx.canvas.getBoundingClientRect();
    return [e.clientX - rect.left, e.clientY - rect.top] as const;
  }, []);
  const down = useCallback((ctx: CanvasRenderingContext2D, e: MouseEvent) => {
    console.log("down");
    drawing.current = true;
    const [x, y] = getPos(ctx, e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  }, []);
  const move = useCallback(
    (ctx: CanvasRenderingContext2D, e: MouseEvent) => {
      if (!drawing.current) return;

      console.log("move");

      const [x, y] = getPos(ctx, e);

      ctx.lineWidth = size;
      ctx.strokeStyle = color;

      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [size, color]
  );
  const up = useCallback(() => {
    drawing.current = false;
  }, []);

  useEffect(() => {
    if (!canvas.current) return;

    const ctx = canvas.current.getContext("2d")!;
    ctx.lineCap = "round";

    const _resize = () => resize(ctx);
    const _down = (e: MouseEvent) => down(ctx, e);
    const _move = (e: MouseEvent) => move(ctx, e);

    _resize();
    window.addEventListener("resize", _resize);

    canvas.current.addEventListener("mousedown", _down);
    canvas.current.addEventListener("mousemove", _move);
    window.addEventListener("mouseup", up);

    return () => {
      window.removeEventListener("resize", _resize);
      canvas.current!.removeEventListener("mousedown", _down);
      canvas.current!.removeEventListener("mousemove", _move);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <Flex
      direction="column"
      gap="6"
      style={{
        width: "40vw",
        height: "60vh",
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
                  size="3"
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
                  size="3"
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
            size="3"
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
