import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Abhinav's Blog",
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
    <html lang="en">
      <head>
        {/* Google AdSense Script — only loads when configured */}
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
