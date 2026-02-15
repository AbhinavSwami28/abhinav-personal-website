import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getPostsByCategory } from "@/lib/posts";
import { getCategoryInfo, calculateReadTime } from "@/lib/types";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import ShareButtons from "@/components/ShareButtons";
import BlogCard from "@/components/BlogCard";
import AdBanner from "@/components/AdBanner";
import { format } from "date-fns";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.created_at,
      ...(post.cover_image && { images: [{ url: post.cover_image }] }),
    },
    twitter: {
      card: post.cover_image ? "summary_large_image" : "summary",
      title: post.title,
      description: post.excerpt,
      ...(post.cover_image && { images: [post.cover_image] }),
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const category = getCategoryInfo(post.category);
  const readTime = calculateReadTime(post.content);

  // Get related posts from the same category
  const relatedPosts = (await getPostsByCategory(post.category))
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Post Header */}
      <div className="relative overflow-hidden">
        {/* Background: cover image or gradient */}
        {post.cover_image ? (
          <>
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </>
        ) : (
          <>
            <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
            <div className="absolute inset-0 bg-black/30" />
          </>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Link
            href={`/${post.category}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to {category.label}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm">
              {category.icon} {category.label}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            {post.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {format(new Date(post.created_at), "MMMM d, yyyy")}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {readTime} min read
            </span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Top Ad */}
        <AdBanner adFormat="horizontal" className="mb-10" />

        {/* Markdown Content */}
        <article>
          <MarkdownRenderer content={post.content} />
        </article>

        {/* In-content Ad */}
        <AdBanner adFormat="rectangle" className="my-10" />

        {/* Share Buttons */}
        <div className="mt-10 pt-8 border-t border-gray-200 dark:border-slate-800">
          <ShareButtons title={post.title} slug={post.slug} />
        </div>

        {/* Navigation */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              href={`/${post.category}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <ArrowLeft size={16} />
              More in {category.label}
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              View all posts
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              More in {category.label}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdBanner adFormat="horizontal" />
      </div>
    </div>
  );
}
