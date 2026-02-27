import { RouterProvider } from "react-router";
import { router } from "./routes.tsx";
import { CustomCursor } from "./components/cursor/CustomCursor";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    // Prevent default cursor on drag
    document.body.style.cursor = "none";
    
    // Performance optimization: reduce motion for users who prefer it
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      document.documentElement.style.setProperty("--animation-duration", "0.01ms");
    }
  }, []);

  return (
    <>
      <CustomCursor />
      <RouterProvider router={router} />
    </>
  );
}
