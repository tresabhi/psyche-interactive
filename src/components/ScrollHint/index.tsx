import { Box, type BoxProps } from "@radix-ui/themes";
import { forwardRef } from "react";
import "./index.css";

export const ScrollHint = forwardRef<HTMLDivElement, BoxProps>(
  ({ style, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        position="absolute"
        bottom="0"
        mb="5"
        right="50%"
        height="2rem"
        width="1rem"
        style={{
          borderRadius: "0.5rem",
          outline: `2px solid var(--gray-11)`,
          transform: "translateX(-50%)",
          ...style,
        }}
        {...props}
      >
        <Box
          className="scroll-hint"
          width="0.75rem"
          height="0.75rem"
          m="0.125rem"
          style={{
            borderRadius: "50%",
            backgroundColor: "var(--gray-12)",
          }}
        />
      </Box>
    );
  }
);
