export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: Category;
  cover_image?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export type Category = "reviews" | "geopolitics" | "finance" | "coding";

export interface CategoryInfo {
  value: Category;
  label: string;
  color: string;
  bgColor: string;
  gradient: string;
  description: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    value: "reviews",
    label: "Reviews",
    color: "text-blue-600",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    gradient: "from-blue-500 to-cyan-500",
    description: "Product reviews & comparisons",
    icon: "⚡",
  },
  {
    value: "geopolitics",
    label: "Geopolitics",
    color: "text-rose-600",
    bgColor: "bg-rose-50 dark:bg-rose-950",
    gradient: "from-rose-500 to-orange-500",
    description: "My takes on global affairs",
    icon: "🌍",
  },
  {
    value: "finance",
    label: "Finance",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    gradient: "from-emerald-500 to-teal-500",
    description: "Investing & financial insights",
    icon: "📈",
  },
  {
    value: "coding",
    label: "Coding",
    color: "text-violet-600",
    bgColor: "bg-violet-50 dark:bg-violet-950",
    gradient: "from-violet-500 to-purple-500",
    description: "Tech tutorials & development",
    icon: "💻",
  },
];

export function getCategoryInfo(category: Category): CategoryInfo {
  return CATEGORIES.find((c) => c.value === category) || CATEGORIES[0];
}

export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
