"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Sun, Moon, Flashlight } from "lucide-react";

interface ThemeToggleProps {
  onFlashlightToggle: (active: boolean) => void;
  flashlightActive: boolean;
}

export default function ThemeToggle({
  onFlashlightToggle,
  flashlightActive,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Prevent hydration mismatch — render placeholder
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  const cycle = () => {
    if (flashlightActive) {
      // Flashlight -> Light
      onFlashlightToggle(false);
      setTheme("light");
    } else if (resolvedTheme === "light") {
      // Light -> Dark
      setTheme("dark");
    } else {
      // Dark -> Flashlight
      onFlashlightToggle(true);
    }
  };

  const getIcon = () => {
    if (flashlightActive) return <Flashlight size={18} />;
    if (resolvedTheme === "dark") return <Moon size={18} />;
    return <Sun size={18} />;
  };

  const getLabel = () => {
    if (flashlightActive) return "Real Dark Mode";
    if (resolvedTheme === "dark") return "Dark mode";
    return "Light mode";
  };

  return (
    <button
      onClick={cycle}
      className={`p-2 rounded-lg transition-colors ${
        flashlightActive
          ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800"
      }`}
      title={getLabel()}
      aria-label={getLabel()}
    >
      {getIcon()}
    </button>
  );
}
