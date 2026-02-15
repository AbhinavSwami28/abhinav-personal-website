"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CATEGORIES, type Category } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase";
import { createPost } from "@/lib/posts";
import { uploadImage } from "@/lib/storage";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import AdminAuth from "@/components/AdminAuth";
import {
  Save,
  Eye,
  Edit3,
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ImagePlus,
  X,
  Loader2,
} from "lucide-react";
import Link from "next/link";

export default function WritePage() {
  const router = useRouter();
  const supabaseReady = isSupabaseConfigured();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<Category>("coding");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Mobile: toggle between edit and preview
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const generateSlug = useCallback((text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }, []);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setSlug(generateSlug(value));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (jpg, png, webp, etc.)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const url = await uploadImage(file, slug || undefined);
      if (url) {
        setCoverImage(url);
      } else {
        setError("Failed to upload image. Make sure Supabase is connected.");
      }
    } catch {
      setError("Error uploading image.");
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!content.trim()) {
      setError("Content is required");
      return;
    }
    if (!supabaseReady) {
      setError("Connect Supabase to save posts. See .env.local.example");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const post = await createPost({
        title: title.trim(),
        slug: slug || generateSlug(title),
        excerpt: excerpt.trim() || title.trim(),
        category,
        content,
        cover_image: coverImage || undefined,
        published,
      });

      if (post) {
        setSaved(true);
        setTimeout(() => {
          router.push("/admin");
        }, 1500);
      } else {
        setError("Failed to save post. Please try again.");
      }
    } catch {
      setError("An error occurred while saving.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminAuth>
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-200 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Write a Post
            </h1>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-gray-600 dark:text-gray-400">Publish</span>
            </label>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saved ? (
                <>
                  <CheckCircle size={18} />
                  Saved!
                </>
              ) : saving ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  Save Post
                </>
              )}
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {!supabaseReady && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 flex items-start gap-3">
            <AlertCircle
              size={18}
              className="text-amber-600 dark:text-amber-400 mt-0.5 shrink-0"
            />
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Supabase not connected — you can write and preview markdown here,
              but saving requires Supabase. See{" "}
              <code className="px-1 py-0.5 rounded bg-amber-100 dark:bg-amber-900 text-xs">
                .env.local.example
              </code>{" "}
              for setup instructions.
            </p>
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 flex items-center gap-2">
            <AlertCircle
              size={18}
              className="text-red-600 dark:text-red-400 shrink-0"
            />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {/* Cover Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cover Image
          </label>
          {coverImage ? (
            <div className="relative rounded-xl overflow-hidden border border-gray-300 dark:border-slate-700 bg-gray-100 dark:bg-slate-800">
              <div className="relative h-48 sm:h-56">
                <Image
                  src={coverImage}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => setCoverImage("")}
                className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full py-8 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 bg-white dark:bg-slate-900 transition-colors flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400"
            >
              {uploading ? (
                <>
                  <Loader2 size={24} className="animate-spin text-indigo-500" />
                  <span className="text-sm">Uploading...</span>
                </>
              ) : (
                <>
                  <ImagePlus size={24} />
                  <span className="text-sm font-medium">
                    Click to upload a cover image
                  </span>
                  <span className="text-xs text-gray-400">
                    JPG, PNG, or WebP — max 5MB
                  </span>
                </>
              )}
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Your awesome post title..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Excerpt
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief summary for the blog card..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Slug
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated-from-title"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        {/* Mobile Tab Toggle */}
        <div className="flex lg:hidden gap-1 mb-4 p-1 rounded-xl bg-gray-200 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab("edit")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "edit"
                ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Edit3 size={14} />
            Write
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === "preview"
                ? "bg-white dark:bg-slate-700 text-gray-900 dark:text-white shadow-sm"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            <Eye size={14} />
            Preview
          </button>
        </div>

        {/* Editor + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[500px]">
          {/* Editor */}
          <div className={`${activeTab === "preview" ? "hidden lg:block" : ""}`}>
            <div className="h-full flex flex-col rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <Edit3 size={14} />
                  Markdown Editor
                </div>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`# Your Post Title\n\nStart writing your post in markdown...\n\n## Section Heading\n\nYour content here. You can use:\n- **Bold text**\n- *Italic text*\n- [Links](https://example.com)\n- \`inline code\`\n- Code blocks with triple backticks\n- Tables, lists, blockquotes, and more!\n\nTo add images in content, use:\n![Alt text](image-url-here)`}
                className="flex-1 w-full p-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none markdown-editor"
              />
            </div>
          </div>

          {/* Preview */}
          <div className={`${activeTab === "edit" ? "hidden lg:block" : ""}`}>
            <div className="h-full flex flex-col rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <Eye size={14} />
                  Preview
                </div>
              </div>
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-gray-400 dark:text-gray-600 italic">
                    Start writing to see the preview...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AdminAuth>
  );
}
