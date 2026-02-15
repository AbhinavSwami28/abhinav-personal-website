import Link from "next/link";
import Image from "next/image";
import { BlogPost, getCategoryInfo, calculateReadTime } from "@/lib/types";
import { format } from "date-fns";
import { Clock, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const category = getCategoryInfo(post.category);
  const readTime = calculateReadTime(post.content);

  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full flex flex-col rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-slate-700 transition-all duration-300">
        {/* Cover Image or Gradient Header */}
        <div className="relative h-32 sm:h-40 overflow-hidden">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${category.gradient}`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-4 right-4 text-6xl sm:text-7xl opacity-50">
                  {category.icon}
                </div>
              </div>
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 ${category.color}`}
            >
              {category.label}
            </span>
          </div>
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-gray-700 dark:text-gray-300">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
            {post.title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 flex-1">
            {post.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
            <time dateTime={post.created_at}>
              {format(new Date(post.created_at), "MMM d, yyyy")}
            </time>
            <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600" />
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {readTime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
