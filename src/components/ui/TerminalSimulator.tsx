import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Terminal } from "lucide-react";

interface Command {
  input: string;
  output: string[];
}

const commands: Command[] = [
  {
    input: "cat /about/skills.json",
    output: [
      "{",
      '  "languages": ["TypeScript", "Python", "Go", "Solidity"],',
      '  "frontend": ["React", "Next.js", "Vue", "WebGL"],',
      '  "backend": ["Node.js", "Django", "FastAPI", "gRPC"],',
      '  "devops": ["Kubernetes", "Docker", "AWS", "Terraform"],',
      '  "databases": ["PostgreSQL", "Redis", "MongoDB"],',
      '  "expertise": "Full-Stack Engineering & Cloud Architecture"',
      "}",
    ],
  },
  {
    input: "ls -la /experience",
    output: [
      "drwxr-xr-x  4 taki  staff   128B  TechCorp Global (2022-Present)",
      "drwxr-xr-x  3 taki  staff    96B  InnovateLabs (2020-2022)",
      "drwxr-xr-x  2 taki  staff    64B  StartupXYZ (2018-2020)",
      "-rw-r--r--  1 taki  staff   15KB  MIT - M.S. Computer Science",
      "-rw-r--r--  1 taki  staff   12KB  UC Berkeley - B.S. EECS",
    ],
  },
  {
    input: "git log --oneline --graph --all",
    output: [
      "* a7f3c91 (HEAD -> main) feat: neural style transfer API",
      "* 82b4e15 refactor: optimize distributed task engine",
      "* f3d2a84 feat: WebRTC collaborative canvas",
      "* c94e1f7 perf: reduce bundle size by 40%",
      "* 7a3f9e2 feat: DeFi yield aggregator smart contracts",
      "* 5c2d8b1 docs: comprehensive architecture documentation",
    ],
  },
  {
    input: "whoami",
    output: [
      "Taki Eddine Rami",
      "Senior Full-Stack Engineer & Solutions Architect",
      "Building scalable systems that serve millions of users",
      "Location: Remote • Worldwide",
      "",
      "$ echo $PASSION",
      "> Creating elegant solutions to complex problems",
    ],
  },
];

export const TerminalSimulator = () => {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const command = commands[currentCommandIndex];
    let currentLineIndex = 0;
    let currentCharIndex = 0;
    const lines: string[] = [];

    const typeText = () => {
      if (currentLineIndex < command.output.length) {
        const currentLine = command.output[currentLineIndex];

        if (currentCharIndex < currentLine.length) {
          setIsTyping(true);
          lines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1);
          setDisplayedText([...lines]);
          currentCharIndex++;
          setTimeout(typeText, 20);
        } else {
          currentLineIndex++;
          currentCharIndex = 0;
          setTimeout(typeText, 50);
        }
      } else {
        setIsTyping(false);
        // Move to next command after delay
        setTimeout(() => {
          setCurrentCommandIndex((prev) => (prev + 1) % commands.length);
          setDisplayedText([]);
        }, 3000);
      }
    };

    const initialDelay = setTimeout(typeText, 500);

    return () => {
      clearTimeout(initialDelay);
    };
  }, [currentCommandIndex]);

  const command = commands[currentCommandIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 bg-black/50 backdrop-blur-sm rounded-xl border border-cyan-500/30 font-mono text-sm overflow-hidden"
      style={{
        boxShadow: "0 0 30px rgba(6, 182, 212, 0.2)",
      }}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-cyan-400" />
          <span className="text-cyan-400">taki@portfolio:~</span>
        </div>
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
      </div>

      {/* Terminal Content */}
      <div className="space-y-2">
        {/* Command Input */}
        <div className="flex items-start gap-2">
          <span className="text-green-400">$</span>
          <span className="text-white">{command.input}</span>
        </div>

        {/* Command Output */}
        <div className="pl-4 text-cyan-300/80 space-y-1">
          {displayedText.map((line, index) => (
            <div key={index} className="leading-relaxed">
              {line}
            </div>
          ))}
          {isTyping && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan-400 ml-1"
            />
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex gap-1 mt-4 pt-3 border-t border-white/10">
        {commands.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-all ${
              index === currentCommandIndex
                ? "bg-cyan-400"
                : index < currentCommandIndex
                ? "bg-cyan-400/30"
                : "bg-white/10"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
