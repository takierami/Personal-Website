import { useState, useEffect } from "react";

interface UseTypingEffectOptions {
  speed?: number;
  delay?: number;
}

export const useTypingEffect = (
  text: string,
  options: UseTypingEffectOptions = {}
): string => {
  const { speed = 50, delay = 0 } = options;
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex >= text.length) return;

    const timeout = setTimeout(
      () => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      },
      currentIndex === 0 ? delay : speed
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, delay]);

  return displayedText;
};
