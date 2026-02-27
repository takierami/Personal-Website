import { motion } from "motion/react";
import { Link } from "react-router";
import { Heart, Code, Mail, Phone, MessageCircle, Linkedin } from "lucide-react";
import { socialLinks, profileData } from "../../data/mockData";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <motion.span
                className="font-mono text-2xl font-bold tracking-tight"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-white">{"<"}</span>
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TER
                </span>
                <span className="text-white">{" />"}</span>
              </motion.span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-md">
              Senior Full-Stack Engineer crafting scalable distributed systems and delightful
              user experiences. Building the future, one line at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-mono text-sm font-semibold mb-4 text-cyan-400">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { path: "/", label: "Home" },
                { path: "/about", label: "About" },
                { path: "/projects", label: "Projects" },
                { path: "/experience", label: "Experience" },
                { path: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-mono text-sm font-semibold mb-4 text-cyan-400">Connect</h3>
            <div className="space-y-3">
              {/* Email */}
              <a
                href={`mailto:${profileData.email}`}
                className="flex items-center gap-2 text-white/60 hover:text-cyan-400 transition-colors text-sm group"
              >
                <Mail size={16} className="text-cyan-400" />
                <span className="group-hover:underline">{profileData.email}</span>
              </a>

              {/* Phone */}
              <div className="space-y-1">
                <a
                  href={`tel:${profileData.phone}`}
                  className="flex items-center gap-2 text-white/60 hover:text-purple-400 transition-colors text-sm group"
                >
                  <Phone size={16} className="text-purple-400" />
                  <span className="group-hover:underline">{profileData.phone}</span>
                </a>
                <a
                  href={`tel:${profileData.phoneSecondary}`}
                  className="flex items-center gap-2 text-white/60 hover:text-purple-400 transition-colors text-sm group ml-6"
                >
                  <span className="group-hover:underline">{profileData.phoneSecondary}</span>
                </a>
              </div>

              {/* WhatsApp */}
              <a
                href={profileData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors text-sm group"
              >
                <MessageCircle size={16} className="text-green-400" />
                <span className="group-hover:underline">WhatsApp</span>
              </a>

              {/* LinkedIn */}
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors text-sm group"
              >
                <Linkedin size={16} className="text-blue-400" />
                <span className="group-hover:underline">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
            <div className="flex items-center gap-2">
              <span>© {currentYear} Taki Eddine Rami. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Built with</span>
              <Heart size={14} className="text-red-400 fill-red-400 animate-pulse" />
              <span>and</span>
              <Code size={14} className="text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
    </footer>
  );
};