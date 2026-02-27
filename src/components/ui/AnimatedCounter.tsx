import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useEffect } from "react";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter = ({
  value,
  duration = 2,
  suffix = "",
  className = "",
}: AnimatedCounterProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop;
  }, [value, duration, count]);

  return (
    <motion.span className={className}>
      {rounded.get()}
      {suffix}
    </motion.span>
  );
};
