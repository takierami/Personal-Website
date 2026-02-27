import { useMousePosition } from "../../hooks/useMousePosition";
import { motion } from "motion/react";
import { useState, useEffect } from "react";

export const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      setIsPointer(!!isClickable);
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: x - 8,
          y: y - 8,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
        animate={{
          x: x - 16,
          y: y - 16,
          scale: isPointer ? 1.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
          mass: 0.8,
        }}
      />
    </>
  );
};
