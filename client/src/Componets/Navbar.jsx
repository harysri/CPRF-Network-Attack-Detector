import React, { useState } from "react";
import { Shield, Menu, X, Activity } from "lucide-react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Attack Detector", path: "/detect" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800 shadow-sm shadow-slate-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3.5 group">
            <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <span className="font-extrabold text-white text-2xl tracking-tighter">
              CPRF <span className="text-blue-400 font-bold">Detector</span>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Status Indicator */}
            <div className="ml-5 flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-inner shadow-emerald-500/5">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-emerald-400">
                System Active
              </span>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-2 animate-fadeIn">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-5 py-3.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? "bg-blue-600/10 text-blue-400 border border-blue-600/20 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-3 shadow-inner shadow-emerald-500/5">
              <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-emerald-400">
                System Active
              </span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
