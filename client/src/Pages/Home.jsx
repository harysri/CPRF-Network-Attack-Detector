import React from "react";
import { Shield, Zap, Activity, FileSearch, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const attackTypes = [
    {
      name: "Benign",
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
    },
    {
      name: "Bot",
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      border: "border-amber-500/20",
    },
    {
      name: "Brute Force",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20",
    },
    {
      name: "DDoS",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
    {
      name: "Infiltration",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20",
    },
    {
      name: "PortScan",
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/20",
    },
    {
      name: "Web Attack",
      color: "text-rose-400",
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
    },
  ];

  const features = [
    {
      icon: <FileSearch className="w-6 h-6 text-blue-400" />,
      title: "CSV Upload",
      desc: "Upload network traffic CSV files containing CICIDS2017 features for instant analysis.",
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: "CPRF Model",
      desc: "Powered by Class Probability Random Forest for superior detection accuracy.",
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      title: "Real-time Results",
      desc: "Get immediate predictions with confidence scores for each attack category.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
              <Shield className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-center text-white mb-6 tracking-tight">
            Network Attack <span className="text-blue-400">Detector</span>
          </h1>

          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            Advanced intrusion detection using Class Probability Random Forest
            (CPRF) on the CICIDS2017 dataset. Identify malicious network
            activities with high accuracy and efficiency.
          </p>

          <div className="flex justify-center gap-4 mb-16">
            <Link
              to="/detect"
              className="group flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start Detection
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: "Attack Classes", value: "7" },
              { label: "Dataset", value: "CICIDS2017" },
              { label: "Model", value: "CPRF" },
              { label: "Input", value: "CSV" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl bg-slate-900/50 border border-slate-800"
              >
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attack Types Grid */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Detectable Attack Categories
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {attackTypes.map((attack) => (
            <div
              key={attack.name}
              className={`p-4 rounded-xl border ${attack.border} ${attack.bg} backdrop-blur-sm transition-all hover:scale-105 cursor-default`}
            >
              <div className={`text-sm font-bold ${attack.color} text-center`}>
                {attack.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-800">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="p-3 bg-slate-800/50 rounded-xl w-fit mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {f.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
