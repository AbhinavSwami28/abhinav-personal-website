import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET_NAME = "blog-images";

export async function uploadImage(file: File): Promise<string | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  // Generate a unique filename
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
  const filePath = `covers/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading image:", error);
    return null;
  }

  // Get the public URL
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteImage(url: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;

  // Extract file path from URL
  const parts = url.split(`${BUCKET_NAME}/`);
  if (parts.length < 2) return false;
  const filePath = parts[1];

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) {
    console.error("Error deleting image:", error);
    return false;
  }
  return true;
}
