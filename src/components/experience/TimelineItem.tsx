import { motion } from "motion/react";
import { MapPin, Calendar, ExternalLink, CheckCircle } from "lucide-react";
import type { Experience } from "../../types";

interface TimelineItemProps {
  experience: Experience;
  index: number;
}

export const TimelineItem = ({ experience, index }: TimelineItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-20"
    >
      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.2 }}
        className="absolute left-6 top-6 w-5 h-5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-black"
        style={{
          boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
        }}
      />

      {/* Content Card */}
      <div className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all group">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-1 group-hover:text-cyan-400 transition-colors">
              {experience.role}
            </h3>
            <div className="flex items-center gap-2 text-lg text-white/80 mb-2">
              <span className="font-mono">{experience.company}</span>
              {experience.link && (
                <a
                  href={experience.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          {experience.logo && (
            <img
              src={experience.logo}
              alt={experience.company}
              className="w-16 h-16 rounded-lg object-cover border border-white/10"
            />
          )}
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm font-mono text-white/60">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-cyan-400" />
            <span>
              {experience.period.start} - {experience.period.end}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-purple-400" />
            <span>{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          {experience.description.map((desc, i) => (
            <p key={i} className="text-white/70 leading-relaxed">
              • {desc}
            </p>
          ))}
        </div>

        {/* Achievements */}
        {experience.achievements.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-mono text-cyan-400 mb-2">Key Achievements:</h4>
            <div className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
