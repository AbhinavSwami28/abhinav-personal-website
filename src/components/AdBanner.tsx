"use client";

import { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  /** Optional ad slot ID from AdSense. If omitted, uses auto ad format. */
  adSlot?: string;
  adFormat?: "auto" | "horizontal" | "rectangle" | "vertical" | "fluid";
  /** For in-article ads */
  layoutKey?: string;
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
  layoutKey,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || adLoaded) return;

    // Only push ad if the ins element exists and hasn't been filled
    try {
      const adElement = adRef.current;
      if (adElement && !adElement.getAttribute("data-adsbygoogle-status")) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch {
      // AdSense script not loaded yet or blocked
    }
  }, [clientId, adLoaded]);

  // No AdSense configured — show placeholder in development
  if (!clientId) {
    return (
      <div
        className={`adsense-placeholder flex items-center justify-center py-6 px-4 ${className}`}
      >
        <p className="text-sm text-gray-400 dark:text-gray-600 text-center">
          Ad Space &mdash; Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID in .env.local
        </p>
      </div>
    );
  }

  // AdSense is configured — render the ad unit
  return (
    <div className={className}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        {...(adSlot && { "data-ad-slot": adSlot })}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
        {...(layoutKey && { "data-ad-layout-key": layoutKey })}
      />
    </div>
  );
}
