import { Outlet } from "react-router";
import { Navigation } from "../navigation/Navigation";
import { ScrollProgress } from "../ui/ScrollProgress";
import { Footer } from "../ui/Footer";
import { BackToTop } from "../ui/BackToTop";
import { motion, AnimatePresence } from "motion/react";
import { Suspense } from "react";

const PageFallback = () => (
  <div className="min-h-screen bg-black flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
  </div>
);

export const MainLayout = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <ScrollProgress />
      <Navigation />
      <BackToTop />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <Footer />

      {/* Grid background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
};