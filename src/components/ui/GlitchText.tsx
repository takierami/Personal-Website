import { motion } from "motion/react";
import { useState, useEffect } from "react";

interface GlitchTextProps {
  children: string;
  className?: string;
}

export const GlitchText = ({ children, className = "" }: GlitchTextProps) => {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {glitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 text-cyan-400 opacity-70"
            initial={{ x: 0 }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.1, repeat: 1 }}
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 text-purple-400 opacity-70"
            initial={{ x: 0 }}
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 0.1, repeat: 1 }}
          >
            {children}
          </motion.span>
        </>
      )}
    </div>
  );
};
