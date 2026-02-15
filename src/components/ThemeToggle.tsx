"use client";

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import { Sun, Moon, Flashlight, Monitor, ChevronDown } from "lucide-react";

interface ThemeToggleProps {
  onFlashlightToggle: (active: boolean) => void;
  flashlightActive: boolean;
}

const THEME_OPTIONS = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
  { id: "flashlight", label: "Flashlight", icon: Flashlight },
] as const;

export default function ThemeToggle({
  onFlashlightToggle,
  flashlightActive,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-slate-800 animate-pulse" />
    );
  }

  const currentIcon = () => {
    if (flashlightActive) return <Flashlight size={16} />;
    if (theme === "system") return <Monitor size={16} />;
    if (resolvedTheme === "dark") return <Moon size={16} />;
    return <Sun size={16} />;
  };

  const activeId = flashlightActive ? "flashlight" : theme || "system";

  const handleSelect = (id: string) => {
    if (id === "flashlight") {
      onFlashlightToggle(true);
    } else {
      onFlashlightToggle(false);
      setTheme(id);
    }
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-sm font-medium transition-colors ${
          flashlightActive
            ? "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800"
        }`}
        aria-label="Change theme"
      >
        {currentIcon()}
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden z-[100]">
          {THEME_OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isActive = activeId === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 font-medium"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800"
                }`}
              >
                <Icon size={16} />
                <span>{opt.label}</span>
                {opt.id === "flashlight" && (
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    Fun
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
