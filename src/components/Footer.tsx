import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              Abhinav<span className="text-indigo-600">.</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Personal blog covering tech reviews, geopolitics, finance, and
              coding. Opinions are my own.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Categories
            </h3>
            <ul className="mt-3 space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.value}>
                  <Link
                    href={`/${cat.value}`}
                    className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="mt-3 space-y-2">
              {/* <li>
                <Link
                  href="/portfolio"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Portfolio
                </Link>
              </li> */}
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <a
                  href="https://docs.google.com/document/d/1_blT56EpawZs4oJQv7wiDVuOxd7MTU9fm6q3clxEEsE/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Resume
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Connect
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://github.com/AbhinavSwami28"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/abhinav-swami-068722257/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:swami.abhinav28@gmail.com"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/swami._.baba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Abhinav. All rights reserved.
            Built with Next.js & Supabase.
          </p>
        </div>
      </div>
    </footer>
  );
}
