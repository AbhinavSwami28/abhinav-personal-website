import { supabase, isSupabaseConfigured } from "./supabase";
import { samplePosts } from "./sampleData";
import { BlogPost, Category } from "./types";

// Helper: merge Supabase posts with sample data (sample data fills gaps)
function mergeWithSamples(dbPosts: BlogPost[]): BlogPost[] {
  if (dbPosts.length > 0) return dbPosts;
  // If no real posts yet, show sample data so the site isn't empty
  return samplePosts.filter((p) => p.published);
}

// ── Public queries ──

export async function getAllPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return samplePosts
      .filter((p) => p.published)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }

  const { data, error } = await supabase!
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts:", error);
    return samplePosts.filter((p) => p.published);
  }

  return mergeWithSamples(data || []).sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export async function getPostsByCategory(
  category: Category
): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return samplePosts
      .filter((p) => p.published && p.category === category)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }

  const { data, error } = await supabase!
    .from("posts")
    .select("*")
    .eq("category", category)
    .eq("published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching posts by category:", error);
    return samplePosts.filter((p) => p.published && p.category === category);
  }

  const posts = data || [];
  if (posts.length > 0) return posts;
  // Fallback to sample posts for this category
  return samplePosts
    .filter((p) => p.published && p.category === category)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) {
    return samplePosts.find((p) => p.slug === slug) || null;
  }

  const { data, error } = await supabase!
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    // Fallback to sample posts
    return samplePosts.find((p) => p.slug === slug) || null;
  }
  return data;
}

export async function getLatestPosts(limit: number = 4): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

// ── Admin queries ──

export async function getAllPostsAdmin(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return samplePosts.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  }

  const { data, error } = await supabase!
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin posts:", error);
    return [];
  }
  return data || [];
}

export async function createPost(
  post: Omit<BlogPost, "id" | "created_at" | "updated_at">
): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase!
    .from("posts")
    .insert({
      ...post,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating post:", error);
    return null;
  }
  return data;
}

export async function updatePost(
  id: string,
  post: Partial<BlogPost>
): Promise<BlogPost | null> {
  if (!isSupabaseConfigured()) return null;

  const { data, error } = await supabase!
    .from("posts")
    .update({ ...post, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating post:", error);
    return null;
  }
  return data;
}

export async function deletePost(id: string): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  const { error } = await supabase!.from("posts").delete().eq("id", id);
  if (error) {
    console.error("Error deleting post:", error);
    return false;
  }
  return true;
}
