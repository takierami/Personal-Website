import { motion } from "motion/react";
import { ArrowRight, Linkedin, MessageCircle, Mail, FileText, Terminal } from "lucide-react";
import { Link } from "react-router";
import { ParticleField } from "../components/hero/ParticleField";
import { GitHubContributions } from "../components/hero/GitHubContributions";
import { GlitchText } from "../components/ui/GlitchText";
import { useTypingEffect } from "../hooks/useTypingEffect";
import { profileData } from "../data/mockData";
import { useState, useEffect } from "react";

export const HomePage = () => {
  const roles = [
    "Full-Stack Engineer",
    "Solutions Architect",
    "Cloud Native Developer",
    "System Designer",
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const typedRole = useTypingEffect(roles[currentRoleIndex], { speed: 100, delay: 500 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 z-0">
        <ParticleField />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Terminal-style greeting */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-6 font-mono text-sm text-cyan-400"
            >
              <Terminal size={16} />
              <span>$ whoami</span>
            </motion.div>

            {/* Name */}
            <h1 className="mb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-2"
              >
                <GlitchText className="text-white">
                  Taki
                </GlitchText>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight"
              >
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Eddine Rami
                </span>
              </motion.div>
            </h1>

            {/* Typing Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <div className="text-xl sm:text-2xl lg:text-3xl font-mono text-white/80 h-10">
                <span className="text-cyan-400">{">"}</span>{" "}
                {typedRole}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-0.5 h-7 bg-cyan-400 ml-1"
                />
              </div>
            </motion.div>

            {/* Summary */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-white/60 mb-8 leading-relaxed max-w-xl"
            >
              {profileData.headline}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-mono font-semibold flex items-center gap-2 group"
                >
                  View Projects
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </motion.button>
              </Link>


            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-4"
            >
              {/* LinkedIn */}
              <motion.a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all group"
              >
                <Linkedin
                  size={24}
                  className="transition-colors"
                  style={{ color: "#0A66C2" }}
                />
              </motion.a>

              {/* WhatsApp */}
              <motion.a
                href={profileData.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all group"
              >
                <MessageCircle
                  size={24}
                  className="transition-colors"
                  style={{ color: "#25D366" }}
                />
              </motion.a>

              {/* Email */}
              <motion.a
                href={`mailto:${profileData.email}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all group"
              >
                <Mail
                  size={24}
                  className="transition-colors"
                  style={{ color: "#FF5733" }}
                />
              </motion.a>

              {/* Portfolio/Projects */}
              <Link to="/projects">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all group cursor-pointer"
                >
                  <FileText
                    size={24}
                    className="transition-colors"
                    style={{ color: "#A78BFA" }}
                  />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Column - GitHub Contributions */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <GitHubContributions />

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              <div className="p-6 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-xl border border-cyan-500/20">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                  6+
                </div>
                <div className="text-sm font-mono text-white/60">Years Experience</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl border border-purple-500/20">
                <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                  100+
                </div>
                <div className="text-sm font-mono text-white/60">Projects Delivered</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-xl border border-green-500/20">
                <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2">
                  5.8k
                </div>
                <div className="text-sm font-mono text-white/60">GitHub Stars</div>
              </div>

              <div className="p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-xl border border-orange-500/20">
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent mb-2">
                  99.9%
                </div>
                <div className="text-sm font-mono text-white/60">Uptime Record</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};