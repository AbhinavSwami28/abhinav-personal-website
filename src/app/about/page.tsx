import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/types";
import AdBanner from "@/components/AdBanner";
import { Download, Github, Twitter, Linkedin, Mail, MapPin, Briefcase, GraduationCap, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Abhinav Swami — BITS Pilani grad, software developer, tech enthusiast, geopolitics nerd, investor, and writer.",
};

const TECH_STACK = [
  { name: "React", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
  { name: "TypeScript", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
  { name: "Next.js", color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
  { name: "Golang", color: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200" },
  { name: "Python", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  { name: "Node.js", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  { name: "PostgreSQL", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" },
  { name: "Supabase", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
  { name: "Tailwind CSS", color: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200" },
  { name: "Docker", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            About Me
          </h1>
          <p className="mt-4 text-lg text-indigo-100 max-w-2xl">
            Developer by day, curious mind always.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Profile Image */}
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 opacity-75" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-white dark:border-slate-900">
                <Image
                  src="/profile.png"
                  alt="Abhinav Swami"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Abhinav Swami
            </h2>
            <p className="mt-1 text-lg text-indigo-600 dark:text-indigo-400 font-medium">
              Software Developer & Writer
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} />
                Full-Stack Developer
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap size={14} />
                BITS Pilani
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} />
                India
              </span>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              I&apos;m a software developer working with{" "}
              <strong className="text-gray-900 dark:text-white">React, TypeScript, Golang, and Python</strong>.
              By day I build products that people actually use. By night (and weekends),
              I write about the things that fascinate me — from global politics to
              investment strategies to the latest tech.
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-400 leading-relaxed">
              I started this site because I believe in learning in public. Writing forces
              me to think clearly, and sharing those thoughts helps others (and future me)
              along the way.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://docs.google.com/document/d/1_blT56EpawZs4oJQv7wiDVuOxd7MTU9fm6q3clxEEsE/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
              >
                <ExternalLink size={16} />
                View Resume
              </a>
              <a
                href="#connect"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 font-medium border border-gray-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
              >
                <Mail size={16} />
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        <AdBanner adFormat="horizontal" className="mt-12" />

        {/* Education */}
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Education
          </h2>
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
            {/* Graduation Photo */}
            <div className="relative flex justify-center bg-gradient-to-b from-sky-100 to-sky-50 dark:from-slate-800 dark:to-slate-900">
              <Image
                src="/graduation.jpg"
                alt="Abhinav Swami at BITS Pilani Graduation"
                width={400}
                height={600}
                className="w-full max-w-md h-auto"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <p className="text-white/80 text-sm font-medium">Graduation Day</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  BITS Pilani
                </h3>
              </div>
            </div>
            {/* Education Details */}
            <div className="p-6 bg-white dark:bg-slate-900">
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                  <GraduationCap size={24} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                    Birla Institute of Technology and Science, Pilani
                  </h3>
                  <a
                    href="https://www.bits-pilani.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium mt-1 transition-colors"
                  >
                    bits-pilani.ac.in
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${tech.color}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* What I Write About */}
        <div className="mt-14">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            What I Write About
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.value}
                href={`/${cat.value}`}
                className="group p-5 rounded-xl border border-gray-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-800 hover:shadow-md transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="mt-2 font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Connect */}
        <div id="connect" className="mt-14 scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to chat, collaborate, or tell me I&apos;m wrong about something?
            Always open to conversations.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:swami.abhinav28@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-sm font-medium"
            >
              <Mail size={16} />
              swami.abhinav28@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/abhinav-swami-068722257/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-sm font-medium"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            <a
              href="https://github.com/AbhinavSwami28"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-sm font-medium"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800 transition-all text-sm font-medium"
            >
              <Twitter size={16} />
              Twitter / X
            </a>
          </div>
        </div>

        <AdBanner adFormat="horizontal" className="mt-12" />
      </div>
    </div>
  );
}
