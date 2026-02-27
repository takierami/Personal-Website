import { motion, AnimatePresence } from "motion/react";
import { X, Github, ExternalLink, Star, GitFork, Calendar, Check } from "lucide-react";
import type { Project } from "../../types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-all"
          >
            <X size={24} />
          </button>

          {/* Header Image */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Stats Overlay */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-3">
              {project.stars && (
                <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 flex items-center gap-2">
                  <Star size={16} className="text-yellow-400" />
                  <span className="font-mono text-sm">{project.stars.toLocaleString()} stars</span>
                </div>
              )}
              {project.forks && (
                <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 flex items-center gap-2">
                  <GitFork size={16} className="text-cyan-400" />
                  <span className="font-mono text-sm">{project.forks.toLocaleString()} forks</span>
                </div>
              )}
              <div className="px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 flex items-center gap-2">
                <Calendar size={16} className="text-purple-400" />
                <span className="font-mono text-sm">{project.year}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            {/* Title & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-2">{project.title}</h2>
                <p className="text-lg text-cyan-400 font-mono">{project.description}</p>
              </div>

              <div className="flex gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10 transition-all"
                  >
                    <Github size={20} />
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-all"
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </div>

            {/* Long Description */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-white/90">Overview</h3>
              <p className="text-white/60 leading-relaxed">{project.longDescription}</p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-white/90">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg text-sm font-mono text-cyan-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            {project.achievements.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-3 text-white/90">Key Achievements</h3>
                <div className="space-y-3">
                  {project.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="mt-1 p-1 bg-green-500/20 rounded-full">
                        <Check size={14} className="text-green-400" />
                      </div>
                      <p className="text-white/70 leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
