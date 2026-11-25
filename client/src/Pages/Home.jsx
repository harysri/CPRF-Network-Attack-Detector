import { Shield, Zap, Activity, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1];

// Parents that stagger their children in sequence.
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: easeOut },
  },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: easeOut },
  },
};

const viewportOnce = { once: true, amount: 0.2 };

const Home = () => {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    { label: "Attack Classes", value: "7" },
    { label: "Dataset", value: "CICIDS2017" },
    { label: "Model", value: "CPRF" },
    { label: "Input", value: "CSV" },
  ];

  const attackTypes = [
    {
      name: "Benign",
      color: "text-emerald-700 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      border: "border-emerald-200 dark:border-emerald-500/20",
    },
    {
      name: "Bot",
      color: "text-amber-700 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-200 dark:border-amber-500/20",
    },
    {
      name: "Brute Force",
      color: "text-orange-700 dark:text-orange-400",
      bg: "bg-orange-50 dark:bg-orange-500/10",
      border: "border-orange-200 dark:border-orange-500/20",
    },
    {
      name: "DDoS",
      color: "text-red-700 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10",
      border: "border-red-200 dark:border-red-500/20",
    },
    {
      name: "Infiltration",
      color: "text-purple-700 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-500/10",
      border: "border-purple-200 dark:border-purple-500/20",
    },
    {
      name: "PortScan",
      color: "text-cyan-700 dark:text-cyan-400",
      bg: "bg-cyan-50 dark:bg-cyan-500/10",
      border: "border-cyan-200 dark:border-cyan-500/20",
    },
    {
      name: "Web Attack",
      color: "text-rose-700 dark:text-rose-400",
      bg: "bg-rose-50 dark:bg-rose-500/10",
      border: "border-rose-200 dark:border-rose-500/20",
    },
  ];

  const features = [
    {
      icon: <FileSearch className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "CSV Upload",
      desc: "Upload network traffic CSV files containing CICIDS2017 features for instant analysis.",
    },
    {
      icon: (
        <Zap className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
      ),
      title: "CPRF Model",
      desc: "Powered by Class Probability Random Forest for superior detection accuracy.",
    },
    {
      icon: (
        <Activity className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      ),
      title: "Real-time Results",
      desc: "Get immediate predictions with confidence scores for each attack category.",
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-200">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-200/50 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950" />

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative max-w-6xl mx-auto px-6 pt-20 pb-16"
          >
            <motion.div
              variants={popIn}
              className="flex items-center justify-center mb-6"
            >
              <motion.div
                animate={
                  shouldReduceMotion ? undefined : { y: [0, -8, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20"
              >
                <Shield className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </motion.div>

            <motion.h1
              variants={slideUp}
              className="text-5xl md:text-6xl font-bold text-center text-slate-900 dark:text-white mb-6 tracking-tight"
            >
              Network Attack{" "}
              <span className="text-blue-600 dark:text-blue-400">Detector</span>
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="text-lg text-slate-600 dark:text-slate-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Advanced intrusion detection using Class Probability Random Forest
              (CPRF) on the CICIDS2017 dataset. Identify malicious network
              activities with high accuracy and efficiency.
            </motion.p>

            <div className="flex justify-center gap-4 mb-16">
              <motion.div
                variants={slideUp}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
              >
                <Link
                  to="/detect"
                  className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-colors hover:shadow-lg hover:shadow-blue-500/25"
                >
                  Start Detection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={slideUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="text-center p-4 rounded-xl bg-white border border-slate-200 shadow-sm shadow-slate-200/50 dark:bg-slate-900/50 dark:border-slate-800 dark:shadow-none"
                >
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Attack Types Grid */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <motion.h2
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center"
          >
            Detectable Attack Categories
          </motion.h2>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3"
          >
            {attackTypes.map((attack) => (
              <motion.div
                key={attack.name}
                variants={popIn}
                whileHover={{ y: -4, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                className={`p-4 rounded-xl border ${attack.border} ${attack.bg} backdrop-blur-sm cursor-default`}
              >
                <div className={`text-sm font-bold ${attack.color} text-center`}>
                  {attack.name}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features */}
        <div className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-200 dark:border-slate-800">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={{ ...slideUp, hover: { y: -6 } }}
                whileHover="hover"
                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm shadow-slate-200/50 hover:border-slate-300 transition-colors dark:bg-slate-900/50 dark:border-slate-800 dark:shadow-none dark:hover:border-slate-700"
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    show: { opacity: 1, scale: 1 },
                    hover: { rotate: -8, scale: 1.1 },
                  }}
                  className="p-3 bg-slate-100 rounded-xl w-fit mb-4 dark:bg-slate-800/50"
                >
                  {f.icon}
                </motion.div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {f.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Home;
