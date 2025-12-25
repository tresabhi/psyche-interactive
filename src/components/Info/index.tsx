import { Card, Flex } from "@radix-ui/themes";
import { Html } from "@react-three/drei";
import type { HtmlProps } from "@react-three/drei/web/Html";
import { useEffect, useState } from "react";
import "./index.css";

export function Info({ children, ...props }: HtmlProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handlePointerDown() {
      if (!visible) return;
      setVisible(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [visible]);

  return (
    <Html
      zIndexRange={[32, 0]}
      portal={{ current: document.getElementById("app")! }}
      {...props}
    >
      <Flex gap="4">
        <Flex
          data-animate={!visible}
          flexShrink="0"
          onPointerDown={() => {
            setVisible(true);
          }}
          align="center"
          justify="center"
          className="info-clicker"
        />

        {visible && (
          <Card
            style={{ zIndex: 64 }}
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
          >
            <Flex width="min(25vw, 28rem)" gap="2" direction="column">
              {children}
            </Flex>
          </Card>
        )}
      </Flex>
    </Html>
  );
}
