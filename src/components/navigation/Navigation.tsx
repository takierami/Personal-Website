import { Link, useLocation } from "react-router";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/experience", label: "Experience" },
  { path: "/contact", label: "Contact" },
];

export const Navigation = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/50"
          : "bg-black/80 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="relative group flex-shrink-0">
            <motion.span
              className="font-mono text-lg sm:text-xl font-bold tracking-tight flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white">{"<"}</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                TER
              </span>
              <span className="text-white">{" />"}</span>
            </motion.span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const isHovered = hoveredLink === link.path;
                
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={() => setHoveredLink(link.path)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className="relative px-6 py-3 text-base font-medium transition-all duration-300"
                  >
                    {/* Active/Hover background */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border border-cyan-400/30 bg-cyan-400/10"
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-blue-500/20"
                      initial={false}
                      animate={{
                        opacity: isHovered && !isActive ? 1 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    
                    {/* Text */}
                    <motion.span
                      className="relative z-10 block"
                      animate={{
                        background: isActive || isHovered
                          ? "linear-gradient(90deg, #22d3ee, #3b82f6)"
                          : "none",
                        WebkitBackgroundClip: isActive || isHovered ? "text" : "unset",
                        WebkitTextFillColor: isActive || isHovered ? "transparent" : "unset",
                        color: isActive || isHovered ? "transparent" : "rgba(255,255,255,0.7)",
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {link.label}
                    </motion.span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* CTA Button Desktop */}
          <motion.div 
            className="hidden md:block flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/contact">
              <button
                className="px-6 py-2.5 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-shadow duration-300"
              >
                Let&apos;s Talk
              </button>
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          height: mobileMenuOpen ? "auto" : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        className="md:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-b border-white/10"
      >
        <div className="px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/30"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block"
          >
            <button className="w-full px-4 py-3 text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white">
              Let&apos;s Talk
            </button>
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
};
