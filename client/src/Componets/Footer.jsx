import React from "react";
import { Shield, Database, BrainCircuit } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="text-slate-300 font-semibold text-sm">
              CPRF Network Attack Detector
            </span>
          </div>

          {/* Tech Stack Info */}
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-1.5 hover:text-slate-400 transition-colors">
              <Database className="w-3.5 h-3.5" />
              <span>CICIDS2017 Dataset</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-slate-400 transition-colors">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Class Probability Random Forest</span>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-600 font-medium">
            &copy; {new Date().getFullYear()} CPRF IDS Research. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
