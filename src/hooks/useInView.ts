import { useState, useEffect, useRef, RefObject } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useInView = <T extends HTMLElement>(
  options: UseInViewOptions = {}
): [RefObject<T>, boolean] => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = false } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;
        setInView(isInView);

        if (isInView && triggerOnce && element) {
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, inView];
};
