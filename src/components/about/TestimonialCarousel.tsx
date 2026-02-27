import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import type { Testimonial } from "../../types";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 p-8 sm:p-12">
        <Quote className="absolute top-8 left-8 text-cyan-400/20" size={64} />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {/* Rating */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={`${
                    i < current.rating
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-white/20"
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-8 italic">
              "{current.content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-16 h-16 rounded-full border-2 border-cyan-400/30"
              />
              <div>
                <div className="font-semibold text-white">{current.name}</div>
                <div className="text-sm text-white/60">
                  {current.role} at {current.company}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center gap-4 mt-8">
          <button
            onClick={prev}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex gap-2 flex-1 justify-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-cyan-400"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
