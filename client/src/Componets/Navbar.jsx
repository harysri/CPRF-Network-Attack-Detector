import { useState } from "react";
import { Shield, Menu, X, Activity, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../context/theme-context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Attack Detector", path: "/detect" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm shadow-slate-200/60 dark:bg-slate-950/90 dark:border-slate-800 dark:shadow-slate-950/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3.5 group">
            <div className="p-2.5 bg-blue-500/10 rounded-2xl border border-blue-500/20 group-hover:bg-blue-500/20 transition-all">
              <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-extrabold text-slate-900 dark:text-white text-2xl tracking-tighter">
              CPRF{" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                Detector
              </span>
            </span>
          </NavLink>

          <div className="flex items-center gap-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-blue-600/10 text-blue-700 border border-blue-600/20 font-semibold dark:text-blue-400"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Status Indicator */}
              <div className="ml-5 flex items-center gap-2.5 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-inner shadow-emerald-500/5">
                <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  System Active
                </span>
              </div>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="p-2.5 ml-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-all dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              className="md:hidden p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
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
                      ? "bg-blue-600/10 text-blue-700 border border-blue-600/20 font-semibold dark:text-blue-400"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex items-center gap-3 px-5 py-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mt-3 shadow-inner shadow-emerald-500/5">
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
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
