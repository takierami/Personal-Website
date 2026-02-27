import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";

export const NotFound = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* 404 */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="text-[12rem] sm:text-[16rem] font-bold leading-none">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-lg text-white/60 mb-2">
            Looks like you've ventured into uncharted territory.
          </p>
          <p className="text-sm text-white/40 font-mono">
            Error: ENOENT - The requested resource does not exist in this dimension.
          </p>
        </motion.div>

        {/* Code Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 text-left font-mono text-sm"
        >
          <div className="text-purple-400">
            <span className="text-white/40">{"// "}</span>Houston, we have a problem
          </div>
          <div className="text-cyan-400 mt-2">
            <span className="text-white/60">const</span> error ={" "}
            <span className="text-white/60">{"{"}</span>
          </div>
          <div className="text-white/60 ml-4">
            code: <span className="text-orange-400">"404"</span>,
          </div>
          <div className="text-white/60 ml-4">
            message: <span className="text-orange-400">"Page not found"</span>,
          </div>
          <div className="text-white/60 ml-4">
            suggestion: <span className="text-orange-400">"Try going home?"</span>
          </div>
          <div className="text-cyan-400">
            <span className="text-white/60">{"}"}</span>;
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-mono font-semibold flex items-center gap-2"
            >
              <Home size={20} />
              Go Home
            </motion.button>
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-lg font-mono font-semibold border border-white/20 flex items-center gap-2 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
