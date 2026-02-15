import type { Metadata } from "next";
import AdBanner from "@/components/AdBanner";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Projects I've built — from full-stack web apps to personal tools. Check out my work.",
};

interface Project {
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  gradient: string;
  icon: string;
  liveUrl?: string;
  githubUrl?: string;
  status: "live" | "in-progress" | "completed";
}

const PROJECTS: Project[] = [
  {
    title: "Personal Website & Blog",
    description:
      "The site you're on right now — a full-featured blog with AdSense monetization.",
    longDescription:
      "A modern personal website with blog functionality, markdown editor, Google AdSense integration, and Supabase backend. Features categories for Reviews, Geopolitics, Finance, and Coding with SEO optimization and responsive design.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Google AdSense"],
    gradient: "from-indigo-500 to-cyan-500",
    icon: "🌐",
    status: "live",
  },
  {
    title: "Movie Ticket Booking App",
    description:
      "A full-stack movie ticket booking system with partner and admin dashboards.",
    longDescription:
      "Complete movie ticket booking platform featuring user-facing ticket browsing and booking, a partner dashboard for managing theatres and shows, and an admin panel for oversight. Built with role-based access control and real-time seat management.",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
    gradient: "from-rose-500 to-orange-500",
    icon: "🎬",
    status: "completed",
  },
  // ── Add your projects below ──
  // Uncomment and customize these, or add your own:
  //
  // {
  //   title: "Your Next Project",
  //   description: "Short tagline about what it does.",
  //   longDescription: "Detailed explanation of the project, features, and impact.",
  //   techStack: ["React", "Python", "PostgreSQL"],
  //   gradient: "from-emerald-500 to-teal-500",
  //   icon: "🚀",
  //   liveUrl: "https://yourproject.com",
  //   githubUrl: "https://github.com/you/project",
  //   status: "live",
  // },
];

function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = {
    live: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200",
    "in-progress":
      "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
    completed:
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };
  const labels = {
    live: "Live",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
      )}
      {labels[status]}
    </span>
  );
}

export default function PortfolioPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Portfolio
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl">
            Things I&apos;ve built. From full-stack web apps to personal tools
            — here&apos;s what I&apos;ve been working on.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://docs.google.com/document/d/1_blT56EpawZs4oJQv7wiDVuOxd7MTU9fm6q3clxEEsE/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors"
            >
              <ExternalLink size={16} />
              View Resume
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Github size={16} />
              GitHub Profile
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <AdBanner adFormat="horizontal" className="mb-10" />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {PROJECTS.map((project, index) => (
            <article
              key={index}
              className="group flex flex-col rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300"
            >
              {/* Gradient Header */}
              <div
                className={`h-36 sm:h-44 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute bottom-4 right-6 text-7xl sm:text-8xl opacity-60">
                    {project.icon}
                  </div>
                </div>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <StatusBadge status={project.status} />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                  {project.longDescription}
                </p>

                {/* Tech Stack Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="mt-5 flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors"
                    >
                      <Github size={14} />
                      Source Code
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More Projects CTA */}
        <div className="mt-12 text-center p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-slate-800">
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            More projects coming soon
          </p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            I&apos;m always building. Check out my GitHub for the latest, or add
            your own projects in{" "}
            <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-xs">
              src/app/portfolio/page.tsx
            </code>
          </p>
        </div>

        {/* Resume CTA */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/50 dark:to-cyan-950/50 border border-indigo-100 dark:border-indigo-900">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Like what you see?
              </h2>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Grab my resume for the full picture — experience, skills, and
                education.
              </p>
            </div>
            <a
              href="https://docs.google.com/document/d/1_blT56EpawZs4oJQv7wiDVuOxd7MTU9fm6q3clxEEsE/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
            >
              <ExternalLink size={18} />
              View Resume
            </a>
          </div>
        </div>

        <AdBanner adFormat="horizontal" className="mt-10" />
      </div>
    </div>
  );
}
