import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET_NAME = "blog-images";
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 800;
const QUALITY = 0.82;

/**
 * Compress an image on the client side before uploading.
 * Resizes to max 1200x800 and converts to WebP (~60-80% smaller than PNG/JPG).
 */
async function compressImage(file: File): Promise<{ blob: Blob; ext: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      let { width, height } = img;

      // Scale down if larger than max dimensions
      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      ctx.drawImage(img, 0, 0, width, height);

      // Try WebP first (best compression), fallback to JPEG
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve({ blob, ext: "webp" });
          } else {
            // Fallback to JPEG if WebP not supported
            canvas.toBlob(
              (jpgBlob) => {
                if (jpgBlob) {
                  resolve({ blob: jpgBlob, ext: "jpg" });
                } else {
                  reject(new Error("Failed to compress image"));
                }
              },
              "image/jpeg",
              QUALITY
            );
          }
        },
        "image/webp",
        QUALITY
      );
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = URL.createObjectURL(file);
  });
}

/**
 * Upload an image to Supabase Storage.
 * If slug is provided, uses it as the filename (e.g., covers/my-post-slug.webp).
 * Otherwise generates a random name.
 */
export async function uploadImage(file: File, slug?: string): Promise<string | null> {
  if (!isSupabaseConfigured() || !supabase) return null;

  try {
    // Compress the image before uploading
    const { blob, ext } = await compressImage(file);

    const fileName = slug
      ? `${slug}.${ext}`
      : `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `covers/${fileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, blob, {
        contentType: `image/${ext === "jpg" ? "jpeg" : ext}`,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
    return data.publicUrl;
  } catch (err) {
    console.error("Error compressing/uploading image:", err);
    return null;
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;

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
