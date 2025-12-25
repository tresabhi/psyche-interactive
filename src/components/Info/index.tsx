import { Card, Flex } from "@radix-ui/themes";
import { Html } from "@react-three/drei";
import type { HtmlProps } from "@react-three/drei/web/Html";
import { useEffect, useState } from "react";
import "./index.css";

export function Info({ children, ...props }: HtmlProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handlePointerDown() {
      setVisible(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <Html portal={{ current: document.body }} {...props}>
      <Flex gap="4" style={{ fontFamily: "var(--default-font-family)" }}>
        <Flex
          data-animate={!visible}
          flexShrink="0"
          onPointerDown={(event) => {
            event.stopPropagation();
            setVisible((state) => !state);
          }}
          align="center"
          justify="center"
          className="info-clicker"
        />

        {visible && (
          <Card>
            <Flex
              direction="column"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
            >
              {children}
            </Flex>
          </Card>
        )}
      </Flex>
    </Html>
  );
}
