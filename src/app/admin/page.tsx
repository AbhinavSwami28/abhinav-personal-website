"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BlogPost, CATEGORIES, getCategoryInfo } from "@/lib/types";
import AdminAuth from "@/components/AdminAuth";
import { isSupabaseConfigured } from "@/lib/supabase";
import { format } from "date-fns";
import {
  Plus,
  Edit3,
  Trash2,
  Eye,
  AlertCircle,
  FileText,
  Database,
} from "lucide-react";

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { getAllPostsAdmin } = await import("@/lib/posts");
        const data = await getAllPostsAdmin();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const { deletePost } = await import("@/lib/posts");
    const success = await deletePost(id);
    if (success) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  return (
    <AdminAuth>
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Manage your blog posts
            </p>
          </div>
          <Link
            href="/admin/write"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25"
          >
            <Plus size={18} />
            New Post
          </Link>
        </div>

        {/* Supabase Status */}
        {!supabaseReady && (
          <div className="mb-6 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <AlertCircle
              size={20}
              className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
            />
            <div>
              <p className="font-medium text-amber-800 dark:text-amber-200">
                Supabase not connected
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                You&apos;re viewing sample data. To create, edit, and delete
                posts, add your Supabase credentials to{" "}
                <code className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-xs">
                  .env.local
                </code>{" "}
                and restart the dev server.
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <FileText size={16} />
              <span className="text-sm font-medium">Total Posts</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {posts.length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Eye size={16} />
              <span className="text-sm font-medium">Published</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {posts.filter((p) => p.published).length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Edit3 size={16} />
              <span className="text-sm font-medium">Drafts</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {posts.filter((p) => !p.published).length}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Database size={16} />
              <span className="text-sm font-medium">Database</span>
            </div>
            <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
              {supabaseReady ? (
                <span className="text-emerald-600">Connected</span>
              ) : (
                <span className="text-amber-600">Sample Data</span>
              )}
            </p>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800">
            <h2 className="font-semibold text-gray-900 dark:text-white">
              All Posts
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500 dark:text-gray-400">
              Loading posts...
            </div>
          ) : posts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText
                size={48}
                className="mx-auto text-gray-300 dark:text-gray-600"
              />
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                No posts yet.
              </p>
              <Link
                href="/admin/write"
                className="mt-4 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-medium"
              >
                <Plus size={16} />
                Write your first post
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-slate-800">
              {posts.map((post) => {
                const cat = getCategoryInfo(post.category);
                return (
                  <div
                    key={post.id}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cat.bgColor} ${cat.color}`}
                        >
                          {cat.icon} {cat.label}
                        </span>
                        {!post.published && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400">
                            Draft
                          </span>
                        )}
                      </div>
                      <h3 className="mt-1 font-medium text-gray-900 dark:text-white truncate">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(post.created_at), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-slate-700 transition-colors"
                        title="View post"
                      >
                        <Eye size={16} />
                      </Link>
                      {supabaseReady && (
                        <>
                          <Link
                            href={`/admin/write?edit=${post.id}`}
                            className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:text-indigo-400 dark:hover:bg-indigo-950 transition-colors"
                            title="Edit post"
                          >
                            <Edit3 size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-950 transition-colors"
                            title="Delete post"
                          >
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
    </AdminAuth>
  );
}
