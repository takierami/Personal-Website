import { motion } from "motion/react";
import { githubContributions } from "../../data/mockData";
import { useState } from "react";

const getLevelColor = (level: number): string => {
  const colors = [
    "rgb(22, 27, 34)", // level 0
    "rgb(14, 68, 41)", // level 1
    "rgb(0, 109, 50)", // level 2
    "rgb(38, 166, 65)", // level 3
    "rgb(57, 211, 83)", // level 4
  ];
  return colors[level] || colors[0];
};

export const GitHubContributions = () => {
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);

  const weeks: typeof githubContributions[][] = [];
  let currentWeek: typeof githubContributions = [];

  githubContributions.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === githubContributions.length - 1) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }
  });

  const totalContributions = githubContributions.reduce((sum, day) => sum + day.count, 0);
  const maxStreak = githubContributions.reduce((max, day) => Math.max(max, day.count), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-mono text-white/70">GitHub Activity</h3>
        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-cyan-400">{totalContributions} contributions</span>
          <span className="text-purple-400">Max: {maxStreak}/day</span>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.slice(-52).map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => {
              const isHovered = hoveredDay === day.date;
              return (
                <motion.div
                  key={day.date}
                  className="relative group"
                  onMouseEnter={() => setHoveredDay(day.date)}
                  onMouseLeave={() => setHoveredDay(null)}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-sm transition-all"
                    style={{
                      backgroundColor: getLevelColor(day.level),
                      boxShadow: isHovered ? `0 0 10px ${getLevelColor(day.level)}` : "none",
                    }}
                  />
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 rounded text-xs whitespace-nowrap z-20 border border-white/20"
                    >
                      <div className="font-mono text-cyan-400">{day.count} contributions</div>
                      <div className="font-mono text-white/60">{day.date}</div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-2 mt-3 text-xs font-mono text-white/40">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-2.5 h-2.5 rounded-sm"
            style={{ backgroundColor: getLevelColor(level) }}
          />
        ))}
        <span>More</span>
      </div>
    </motion.div>
  );
};
