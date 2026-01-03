import { CameraIcon } from "@radix-ui/react-icons";
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
  const [size, setSize] = useState(SIZES[0]);
  const [color, setColor] = useState(COLORS[0]);
  const [screenshot, setScreenshot] = useState(false);

  // Keep a copy of canvas content on resize
  const savedData = useRef<ImageData | null>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;

    const ctx = c.getContext("2d")!;
    ctx.lineCap = "round";

    const resize = () => {
      const rect = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      // Save existing drawing
      savedData.current = ctx.getImageData(0, 0, c.width, c.height);

      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Restore drawing
      if (savedData.current) {
        ctx.putImageData(savedData.current, 0, 0);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const getPos = (e: MouseEvent) => {
      const rect = c.getBoundingClientRect();
      return [e.clientX - rect.left, e.clientY - rect.top] as const;
    };

    const down = (e: MouseEvent) => {
      drawing.current = true;
      const [x, y] = getPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const move = (e: MouseEvent) => {
      if (!drawing.current) return;
      const [x, y] = getPos(e);

      // Always use latest size and color
      ctx.lineWidth = size;
      ctx.strokeStyle = color;

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
  }, [size, color]);

  return (
    <Flex
      direction="column"
      gap="6"
      style={{
        width: "40vw",
        height: "40vh",
      }}
      align="center"
    >
      {!screenshot && <Heading>DRAW YOUR PSYCHE</Heading>}

      <canvas
        ref={canvas}
        style={{
          borderRadius: "var(--radius-2)",
          width: "100%",
          height: "100%",
          backgroundColor: screenshot ? "transparent" : "white",
        }}
      />

      {!screenshot && (
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
                  onClick={() => setSize(s)}
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
                  onClick={() => setColor(c)}
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
              if (!canvas.current) return;

              const anchor = document.createElement("a");

              anchor.setAttribute("download", `your psyche.png`);
              anchor.setAttribute(
                "href",
                canvas.current.toDataURL("image/png")
              );
              anchor.click();

              setScreenshot(true);
            }}
          >
            <CameraIcon />
          </IconButton>
        </Flex>
      )}
    </Flex>
  );
}
