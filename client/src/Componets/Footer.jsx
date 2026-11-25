import { Shield, Database, BrainCircuit, BookOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto dark:bg-slate-900 dark:border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-slate-700 font-semibold text-sm dark:text-slate-300">
              CPRF Network Attack Detector
            </span>
          </div>

          {/* Tech Stack Info */}
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
              <Database className="w-3.5 h-3.5" />
              <span>CICIDS2017 Dataset</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-slate-700 dark:hover:text-slate-400 transition-colors">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Class Probability Random Forest</span>
            </div>
          </div>
          {/* Documentation */}
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a
              href="https://github.com/harysri/CPRF-Network-Attack-Detector/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              <BookOpen className="inline-block w-4 h-4 ml-1" />
              <span className="ml-1">Documentation</span>
            </a>
            <a
              href="https://github.com/harysri/CPRF-Network-Attack-Detector"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 transition-colors"
            >
              <FaGithub className="inline-block w-4 h-4 mr-1" />
              GitHub
            </a>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-400 font-medium dark:text-slate-600">
            &copy; {new Date().getFullYear()} CPRF IDS Research. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
