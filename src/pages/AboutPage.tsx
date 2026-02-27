import { motion } from "motion/react";
import { Code, Database, Cloud, Smartphone, Brain, Blocks } from "lucide-react";
import { useInView } from "../hooks/useInView";
import { profileData, skills, testimonials } from "../data/mockData";
import { SkillCategory } from "../types";
import { AnimatedCounter } from "../components/ui/AnimatedCounter";
import { TestimonialCarousel } from "../components/about/TestimonialCarousel";
import { SkillRadar } from "../components/about/SkillRadar";
import { TerminalSimulator } from "../components/ui/TerminalSimulator";

const categoryIcons: Record<SkillCategory, any> = {
  frontend: Code,
  backend: Database,
  devops: Cloud,
  mobile: Smartphone,
  ai: Brain,
  blockchain: Blocks,
  database: Database,
  tools: Code,
};

const categoryColors: Record<SkillCategory, string> = {
  frontend: "from-cyan-400 to-blue-500",
  backend: "from-green-400 to-emerald-500",
  devops: "from-orange-400 to-red-500",
  mobile: "from-purple-400 to-pink-500",
  ai: "from-pink-400 to-rose-500",
  blockchain: "from-yellow-400 to-orange-500",
  database: "from-blue-400 to-indigo-500",
  tools: "from-gray-400 to-slate-500",
};

export const AboutPage = () => {
  const [headerRef, headerInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  return (
    <div className="relative min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            className="inline-block mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full"
          >
            <span className="font-mono text-sm text-cyan-400">About Me</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-400 bg-clip-text text-transparent">
              Building the Future,
            </span>
            <br />
            <span className="text-white/40">One Line at a Time</span>
          </h1>

          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            {profileData.summary}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={statsInView ? { opacity: 1, y: 0 } : {}}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {[
            { label: "Years Coding", value: 6, suffix: "+" },
            { label: "Projects Completed", value: 25, suffix: "+" },
            { label: "Technologies Mastered", value: 28, suffix: "" },
            { label: "Lines of Code", value: 500, suffix: "k+" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={statsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all group"
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                {statsInView && (
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} />
                )}
              </div>
              <div className="text-sm font-mono text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          ref={skillsRef}
          initial={{ opacity: 0, y: 30 }}
          animate={skillsInView ? { opacity: 1, y: 0 } : {}}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {Object.entries(skillsByCategory).map(([category, categorySkills], index) => {
              const Icon = categoryIcons[category as SkillCategory];
              const gradient = categoryColors[category as SkillCategory];

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 bg-gradient-to-r ${gradient} rounded-lg`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-mono font-semibold capitalize">
                      {category}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-sm text-white/80">
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-white/40">
                            {skill.proficiency}%
                          </span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={
                              skillsInView ? { width: `${skill.proficiency}%` } : {}
                            }
                            transition={{ delay: index * 0.1 + skillIndex * 0.05, duration: 1 }}
                            className={`h-full bg-gradient-to-r ${gradient} rounded-full`}
                          />
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs font-mono text-white/30">
                          <span>{skill.yearsOfExperience} years</span>
                          <span>•</span>
                          <span>{skill.projects} projects</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Skill Radar Chart */}
          <SkillRadar />
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              What People Say
            </span>
          </h2>

          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-white/10 mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Engineering Philosophy
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Code Quality First",
                description: "Clean, maintainable, and well-tested code isn't optional—it's the foundation of sustainable software.",
              },
              {
                title: "User-Centric Design",
                description: "Technology should serve people. Every architectural decision considers the end-user experience.",
              },
              {
                title: "Continuous Learning",
                description: "The tech landscape evolves rapidly. I invest in learning new technologies and sharing knowledge with the community.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white/5 rounded-xl"
              >
                <h3 className="text-lg font-mono font-semibold text-cyan-400 mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Terminal Simulator */}
        <TerminalSimulator />
      </div>
    </div>
  );
};