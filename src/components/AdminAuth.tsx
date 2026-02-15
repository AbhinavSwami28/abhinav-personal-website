"use client";

import { useState, useEffect } from "react";
import { Lock, ArrowRight } from "lucide-react";

const STORAGE_KEY = "admin_authenticated";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated in this session
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

    // If no password is set in env, allow access (dev mode)
    if (!adminPassword) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      return;
    }

    if (password === adminPassword) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
    } else {
      setError("Wrong password. Try again.");
      setPassword("");
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900 mb-4">
            <Lock size={28} className="text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Enter the admin password to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          />
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            Enter
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
