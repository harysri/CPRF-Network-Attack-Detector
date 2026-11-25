import { createContext, useContext } from "react";

export const STORAGE_KEY = "cprf-theme";

// Stored preference is either "light", "dark" or "system".
// With no stored preference we follow the OS setting.
export const getSystemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export const getStoredTheme = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // localStorage can be unavailable (private mode / blocked cookies)
  }
  return "system";
};

export const resolveTheme = (theme) =>
  theme === "system" ? getSystemTheme() : theme;

export const ThemeContext = createContext({
  theme: "system",
  resolvedTheme: "light",
  isDark: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);
