import { Category, getCategoryInfo } from "@/lib/types";
import { getPostsByCategory } from "@/lib/posts";
import BlogCard from "./BlogCard";
import AdBanner from "./AdBanner";

interface CategoryPageProps {
  category: Category;
}

export default async function CategoryPage({ category }: CategoryPageProps) {
  const info = getCategoryInfo(category);
  const posts = await getPostsByCategory(category);

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className={`bg-gradient-to-br ${info.gradient} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <span className="text-5xl sm:text-6xl">{info.icon}</span>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {info.label}
          </h1>
          <p className="mt-3 text-lg text-white/80 max-w-xl">
            {info.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Ad Banner */}
        <AdBanner adFormat="horizontal" className="mb-8" />

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              No posts in this category yet. Check back soon!
            </p>
          </div>
        )}

        {/* Bottom Ad */}
        <AdBanner adFormat="horizontal" className="mt-12" />
      </div>
    </div>
  );
}
