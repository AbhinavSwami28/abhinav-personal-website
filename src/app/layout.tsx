import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Abhinav — Blog on Tech, Geopolitics, Finance & Coding",
    template: "%s | Abhinav",
  },
  description:
    "Personal blog covering tech reviews, geopolitics, finance & investing, and coding tutorials. Opinions, insights, and things I'm learning.",
  keywords: [
    "tech reviews",
    "geopolitics",
    "finance",
    "investing",
    "coding",
    "programming",
    "blog",
  ],
  authors: [{ name: "Abhinav" }],
  metadataBase: new URL("https://abhinav-swami.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://abhinav-swami.vercel.app",
    siteName: "Abhinav Swami",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>

        <Analytics />

        {/* Google Funding Choices — GDPR/EEA consent management */}
        {adsenseClientId && (
          <Script
            src={`https://fundingchoicesmessages.google.com/i/${adsenseClientId}?ers=1`}
            strategy="beforeInteractive"
          />
        )}
        {adsenseClientId && (
          <Script id="google-fc-init" strategy="beforeInteractive">
            {`(function() {var a=window;var b="fc";function c(d){for(var e=0;e<d.length-1;e++){if(!a[d[e]]){return}}return a[d[e]]}a[b]=a[b]||{};a[b].callQueue=a[b].callQueue||[];a[b].callQueue.push(c)})();`}
          </Script>
        )}

        {/* Google AdSense — must be beforeInteractive so the crawler sees it in raw HTML */}
        {adsenseClientId && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </body>
    </html>
  );
}
