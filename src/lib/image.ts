/**
 * Supabase image transformation helper.
 * Appends resize/quality params to Supabase Storage URLs.
 * Non-Supabase URLs are returned as-is.
 */

const SUPABASE_STORAGE_HOST = "supabase.co/storage/v1/object/public";

interface TransformOptions {
  width?: number;
  height?: number;
  quality?: number;
  resize?: "cover" | "contain" | "fill";
}

export function getImageUrl(
  url: string,
  options?: TransformOptions
): string {
  if (!url || !options) return url;

  // Only transform Supabase storage URLs
  if (!url.includes(SUPABASE_STORAGE_HOST)) return url;

  // Convert /object/public/ to /render/image/public/ for transforms
  const transformUrl = url.replace(
    "/storage/v1/object/public/",
    "/storage/v1/render/image/public/"
  );

  const params = new URLSearchParams();
  if (options.width) params.set("width", String(options.width));
  if (options.height) params.set("height", String(options.height));
  if (options.quality) params.set("quality", String(options.quality));
  if (options.resize) params.set("resize", options.resize);

  return `${transformUrl}?${params.toString()}`;
}

/** Thumbnail for blog cards — small and fast */
export function getThumbnailUrl(url: string): string {
  return getImageUrl(url, { width: 480, height: 300, quality: 60, resize: "cover" });
}

/** Full size for article headers */
export function getHeaderUrl(url: string): string {
  return getImageUrl(url, { width: 1200, height: 600, quality: 75, resize: "cover" });
}

/** OG image for social sharing */
export function getOgImageUrl(url: string): string {
  return getImageUrl(url, { width: 1200, height: 630, quality: 80, resize: "cover" });
}
