import { useScrollProgress } from "../../hooks/useScrollProgress";
import { motion } from "motion/react";

export const ScrollProgress = () => {
  const progress = useScrollProgress();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 origin-left z-[100]"
      style={{ scaleX: progress / 100 }}
      initial={{ scaleX: 0 }}
    />
  );
};
