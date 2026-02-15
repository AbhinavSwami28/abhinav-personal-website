"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adSlot?: string;
  adFormat?: "auto" | "horizontal" | "rectangle" | "vertical";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner({
  adSlot,
  adFormat = "auto",
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdSenseConfigured = !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (isAdSenseConfigured && adSlot) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        console.log("AdSense not loaded");
      }
    }
  }, [isAdSenseConfigured, adSlot]);

  // Show placeholder in dev or when AdSense isn't configured
  if (!isAdSenseConfigured || !adSlot) {
    return (
      <div
        className={`adsense-placeholder flex items-center justify-center py-6 px-4 ${className}`}
      >
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center">
          Ad Space &mdash; Configure AdSense in .env.local
        </p>
      </div>
    );
  }

  return (
    <div ref={adRef} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}
