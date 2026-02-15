"use client";

import { useState } from "react";
import { Link2, Twitter, Linkedin, Check, Share2 } from "lucide-react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  // Build the full URL (works both in dev and production)
  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `/blog/${slug}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const input = document.createElement("input");
      input.value = getUrl();
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`${title}`);
    const url = encodeURIComponent(getUrl());
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: getUrl(),
        });
      } catch {
        // User cancelled or share failed
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mr-1">
        Share:
      </span>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          copied
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700"
        }`}
        title="Copy link"
      >
        {copied ? <Check size={14} /> : <Link2 size={14} />}
        {copied ? "Copied!" : "Link"}
      </button>

      {/* Twitter/X */}
      <button
        onClick={shareToTwitter}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 transition-colors"
        title="Share on Twitter/X"
      >
        <Twitter size={14} />
        <span className="hidden sm:inline">Twitter</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={shareToLinkedIn}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin size={14} />
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* Native Share (mobile) */}
      {typeof navigator !== "undefined" && "share" in navigator && (
        <button
          onClick={handleNativeShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-gray-400 dark:hover:bg-slate-700 transition-colors sm:hidden"
          title="Share"
        >
          <Share2 size={14} />
        </button>
      )}
    </div>
  );
}
