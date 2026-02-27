import { motion } from "motion/react";
import { experiences } from "../data/mockData";
import { TimelineItem } from "../components/experience/TimelineItem";
import { Briefcase, GraduationCap, Award } from "lucide-react";

export const ExperiencePage = () => {
  const workExperience = experiences.filter((e) => e.type === "work");
  const education = experiences.filter((e) => e.type === "education");
  const certifications = experiences.filter((e) => e.type === "certification");

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block mb-4 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full"
          >
            <span className="font-mono text-sm text-green-400">Experience</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-green-200 to-cyan-400 bg-clip-text text-transparent">
              Professional Journey
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            6+ years of building impactful products, leading engineering teams, and solving
            complex technical challenges at scale.
          </p>
        </motion.div>

        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg">
              <Briefcase size={24} />
            </div>
            <h2 className="text-3xl font-bold">Work Experience</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {workExperience.map((experience, index) => (
                <TimelineItem key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-3xl font-bold">Education</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500" />

            {/* Timeline Items */}
            <div className="space-y-8">
              {education.map((experience, index) => (
                <TimelineItem key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg">
              <Award size={24} />
            </div>
            <h2 className="text-3xl font-bold">Certifications</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 hover:border-orange-500/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-orange-400 transition-colors">
                      {cert.role}
                    </h3>
                    <p className="text-sm font-mono text-white/60">{cert.company}</p>
                  </div>
                  <Award className="text-orange-400" size={24} />
                </div>

                <div className="text-sm font-mono text-white/40 mb-4">
                  {cert.period.start} - {cert.period.end}
                </div>

                {cert.description.map((desc, i) => (
                  <p key={i} className="text-sm text-white/60 mb-2">
                    {desc}
                  </p>
                ))}

                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-sm font-mono text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    Verify Credential →
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
