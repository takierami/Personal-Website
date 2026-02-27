import { motion } from "motion/react";
import { ExternalLink, Github, Star, GitFork, GitCommit } from "lucide-react";
import type { Project } from "../../types";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

export const ProjectCard = ({ project, index, onClick }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden cursor-pointer hover:border-cyan-500/30 transition-all"
    >
      {/* Featured Badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full">
          <span className="text-xs font-mono font-semibold">Featured</span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-white/40">{project.year}</span>
        </div>

        <p className="text-sm text-white/60 mb-4 line-clamp-2">{project.description}</p>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/70"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 text-xs font-mono text-white/40">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs font-mono text-white/40">
          {project.stars && (
            <div className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" />
              <span>{project.stars.toLocaleString()}</span>
            </div>
          )}
          {project.forks && (
            <div className="flex items-center gap-1">
              <GitFork size={14} className="text-cyan-400" />
              <span>{project.forks.toLocaleString()}</span>
            </div>
          )}
          {project.commits && (
            <div className="flex items-center gap-1">
              <GitCommit size={14} className="text-purple-400" />
              <span>{project.commits.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Effect - Links */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-center p-6 gap-3"
      >
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all"
          >
            <Github size={20} />
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all"
          >
            <ExternalLink size={20} />
          </a>
        )}
        <button className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-mono text-sm font-semibold transition-all">
          View Details
        </button>
      </motion.div>
    </motion.div>
  );
};
