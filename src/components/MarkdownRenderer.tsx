"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-img:rounded-xl prose-pre:bg-slate-900 prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:before:content-[''] prose-code:after:content-[''] prose-code:bg-indigo-50 dark:prose-code:bg-indigo-950 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-pre:border prose-pre:border-slate-200 dark:prose-pre:border-slate-700 prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-50/50 dark:prose-blockquote:bg-indigo-950/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-table:overflow-hidden prose-th:bg-gray-50 dark:prose-th:bg-slate-800 prose-th:px-4 prose-th:py-2 prose-td:px-4 prose-td:py-2">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
