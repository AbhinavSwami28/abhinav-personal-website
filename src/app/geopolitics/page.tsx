import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Geopolitics",
  description:
    "My takes on global affairs, power dynamics, and the forces shaping our world.",
};

export default function GeopoliticsPage() {
  return <CategoryPage category="geopolitics" />;
}
