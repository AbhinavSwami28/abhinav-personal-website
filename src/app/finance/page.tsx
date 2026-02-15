import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Finance & Investing",
  description:
    "Personal finance insights, investment strategies, and lessons learned from real experience.",
};

export default function FinancePage() {
  return <CategoryPage category="finance" />;
}
