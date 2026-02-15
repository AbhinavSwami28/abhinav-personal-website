import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Download, FileText, ExternalLink } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent dark:from-indigo-900/20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Welcome to my corner of the internet
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight leading-[1.1]">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Abhinav Swami
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Software developer, writer, and curious mind. I build things with{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                React, Go &amp; Python
              </span>{" "}
              and write about{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                tech, geopolitics, finance
              </span>
              , and{" "}
              <span className="font-medium text-gray-900 dark:text-white">
                coding
              </span>
              .
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="https://docs.google.com/document/d/1_blT56EpawZs4oJQv7wiDVuOxd7MTU9fm6q3clxEEsE/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
              >
                <ExternalLink size={18} />
                View Resume
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <FileText size={18} />
                Read the Blog
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-gray-600 dark:text-gray-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>

          {/* Profile Image */}
          <div className="shrink-0">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-20 blur-lg" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-75" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-900 bg-gradient-to-br from-indigo-400 to-cyan-400">
                {/*
                  To use your own image:
                  1. Place your photo at public/profile.jpg (or .png)
                  2. Uncomment the Image tag below and remove the placeholder div
                */}
                <Image
                  src="/profile.png"
                  alt="Abhinav Swami"
                  fill
                  className="object-cover"
                  priority
                />
                {/* Placeholder — remove this when you add your photo */}
                {/* <div className="w-full h-full flex items-center justify-center text-white">
                  <span className="text-6xl sm:text-7xl lg:text-8xl font-bold opacity-80">
                    A
                  </span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
