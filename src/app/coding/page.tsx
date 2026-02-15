import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";

export const metadata: Metadata = {
  title: "Coding & Tech",
  description:
    "Programming tutorials, tech deep-dives, and developer tools — from a working developer.",
};

export default function CodingPage() {
  return <CategoryPage category="coding" />;
}
