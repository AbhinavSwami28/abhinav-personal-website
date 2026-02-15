import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import AdBanner from "@/components/AdBanner";
import { getLatestPosts } from "@/lib/posts";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const latestPosts = await getLatestPosts(6);

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Ad Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <AdBanner adFormat="horizontal" />
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Explore by Category
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Dive into the topics that interest you most.
        </p>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/${cat.value}`}
              className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <div className="relative">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-3 text-lg font-bold text-gray-900 dark:text-white">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {cat.description}
                </p>
                <span
                  className={`mt-3 inline-flex items-center gap-1 text-sm font-medium ${cat.color} group-hover:gap-2 transition-all`}
                >
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Portfolio Highlight — uncomment when portfolio is ready
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-indigo-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Check Out My Portfolio
              </h2>
              <p className="mt-1 text-gray-300 text-sm sm:text-base">
                Full-stack web apps, tools, and side projects I&apos;ve built.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-gray-900 font-medium hover:bg-gray-100 transition-colors text-sm"
              >
                View Projects <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Latest Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Latest Posts
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Fresh content from across all categories.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Mobile "View all" link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400"
          >
            View all posts <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <AdBanner adFormat="horizontal" />
      </div>
    </div>
  );
}
