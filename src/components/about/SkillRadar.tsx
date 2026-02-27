import { motion } from "motion/react";
import { skills } from "../../data/mockData";

export const SkillRadar = () => {
  // Get top skills from each category
  const topSkills = [
    ...skills.filter((s) => s.category === "frontend").slice(0, 2),
    ...skills.filter((s) => s.category === "backend").slice(0, 2),
    ...skills.filter((s) => s.category === "devops").slice(0, 2),
    ...skills.filter((s) => s.category === "database").slice(0, 1),
    ...skills.filter((s) => s.category === "mobile").slice(0, 1),
  ];

  const center = 200;
  const radius = 150;
  const angleStep = (2 * Math.PI) / topSkills.length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <h3 className="text-xl font-mono font-semibold mb-6 text-center">
        Core Competencies Visualization
      </h3>

      <svg
        viewBox="0 0 400 400"
        className="w-full max-w-md mx-auto"
        style={{ filter: "drop-shadow(0 0 20px rgba(6, 182, 212, 0.3))" }}
      >
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={center}
            cy={center}
            r={radius * scale}
            fill="none"
            stroke="rgba(255, 255, 255, 0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Grid lines */}
        {topSkills.map((_, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={topSkills
            .map((skill, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const distance = (skill.proficiency / 100) * radius;
              const x = center + distance * Math.cos(angle);
              const y = center + distance * Math.sin(angle);
              return `${x},${y}`;
            })
            .join(" ")}
          fill="rgba(6, 182, 212, 0.2)"
          stroke="rgb(6, 182, 212)"
          strokeWidth="2"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />

        {/* Data points */}
        {topSkills.map((skill, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const distance = (skill.proficiency / 100) * radius;
          const x = center + distance * Math.cos(angle);
          const y = center + distance * Math.sin(angle);

          return (
            <g key={skill.id}>
              <motion.circle
                cx={x}
                cy={y}
                r="5"
                fill="rgb(6, 182, 212)"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.05 }}
              />
            </g>
          );
        })}

        {/* Labels */}
        {topSkills.map((skill, index) => {
          const angle = index * angleStep - Math.PI / 2;
          const labelDistance = radius + 30;
          const x = center + labelDistance * Math.cos(angle);
          const y = center + labelDistance * Math.sin(angle);

          return (
            <text
              key={skill.id}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white/70 text-xs font-mono"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </motion.div>
  );
};
