import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ProjectCategory } from "../types";
import { projects } from "../data/mockData";
import { ProjectCard } from "../components/projects/ProjectCard";
import { ProjectModal } from "../components/projects/ProjectModal";
import type { Project } from "../types";

const categories: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "mobile", label: "Mobile" },
  { id: "ai", label: "AI/ML" },
  { id: "blockchain", label: "Blockchain" },
  { id: "devtools", label: "DevTools" },
];

export const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block mb-4 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full"
          >
            <span className="font-mono text-sm text-purple-400">Portfolio</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            A selection of production systems, open-source contributions, and technical
            experiments that showcase my engineering capabilities.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-mono text-sm transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {filteredProjects.length}
            </div>
            <div className="text-xs font-mono text-white/60">Projects</div>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {filteredProjects.reduce((sum, p) => sum + (p.stars || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs font-mono text-white/60">GitHub Stars</div>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-green-400 mb-1">
              {filteredProjects.reduce((sum, p) => sum + (p.commits || 0), 0).toLocaleString()}
            </div>
            <div className="text-xs font-mono text-white/60">Commits</div>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="text-2xl font-bold text-orange-400 mb-1">
              {new Set(filteredProjects.flatMap((p) => p.technologies)).size}
            </div>
            <div className="text-xs font-mono text-white/60">Technologies</div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-white/40 font-mono">
              No projects found in this category
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
