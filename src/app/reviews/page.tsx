import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Reviews & Comparisons",
  description:
    "Honest product reviews and side-by-side comparisons to help you make informed decisions.",
};

export default function ReviewsPage() {
  return <CategoryPage category="reviews" />;
}
