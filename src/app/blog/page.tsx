import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { CATEGORIES, type Category } from "@/lib/types";
import BlogCard from "@/components/BlogCard";
import AdBanner from "@/components/AdBanner";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "All blog posts — tech reviews, geopolitics, finance & investing, and coding tutorials.",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const allPosts = await getAllPosts();

  const activeCategory = params.category as Category | undefined;
  const filteredPosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            All Posts
          </h1>
          <p className="mt-3 text-lg text-gray-300 max-w-xl">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}{" "}
            {activeCategory ? `in ${activeCategory}` : "across all categories"}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !activeCategory
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={`/blog?category=${cat.value}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat.icon} {cat.label}
            </Link>
          ))}
        </div>

        {/* Ad Banner */}
        <AdBanner adFormat="horizontal" className="mb-8" />

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No posts found. Check back soon!
            </p>
          </div>
        )}

        {/* Bottom Ad */}
        <AdBanner adFormat="horizontal" className="mt-12" />
      </div>
    </div>
  );
}
