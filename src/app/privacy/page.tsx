import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Abhinav Swami's personal blog.",
};

export default function PrivacyPage() {
  const siteUrl = "https://abhinav-swami.vercel.app";
  const siteName = "Abhinav Swami's Blog";
  const contactEmail = "swami.abhinav28@gmail.com";
  const lastUpdated = "February 16, 2026";

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
          Last updated: {lastUpdated}
        </p>

        <div className="markdown-content">
          <h2>Introduction</h2>
          <p>
            Welcome to {siteName} (<a href={siteUrl}>{siteUrl}</a>). Your privacy
            is important to me. This Privacy Policy explains how I collect, use, and
            protect your information when you visit my website.
          </p>

          <h2>Information I Collect</h2>

          <h3>Information You Provide</h3>
          <p>
            I do not require you to create an account or provide personal information
            to read my blog. If you contact me via email, I will only use your email
            address to respond to your inquiry.
          </p>

          <h3>Automatically Collected Information</h3>
          <p>When you visit my website, certain information may be collected automatically:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Pages visited and time spent</li>
            <li>Referring website</li>
            <li>IP address (anonymized)</li>
          </ul>
          <p>
            This information is collected through cookies and similar technologies
            by third-party services described below.
          </p>

          <h2>Third-Party Services</h2>

          <h3>Google AdSense</h3>
          <p>
            This website uses Google AdSense to display advertisements. Google AdSense
            may use cookies and web beacons to serve ads based on your prior visits to
            this website or other websites on the internet. Google&apos;s use of advertising
            cookies enables it and its partners to serve ads based on your visit to this
            site and/or other sites on the internet.
          </p>
          <p>
            You may opt out of personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>. Alternatively, you can opt out of third-party vendor cookies by visiting{" "}
            <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
              aboutads.info
            </a>.
          </p>

          <h3>Supabase</h3>
          <p>
            I use Supabase as my backend service for storing blog post content and images.
            Supabase does not collect personal information from visitors. You can review{" "}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">
              Supabase&apos;s Privacy Policy
            </a>{" "}
            for more details.
          </p>

          <h3>Vercel</h3>
          <p>
            This website is hosted on Vercel. Vercel may collect anonymous usage data
            and log information for performance and security purposes. See{" "}
            <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
              Vercel&apos;s Privacy Policy
            </a>{" "}
            for details.
          </p>

          <h2>Cookies</h2>
          <p>This website uses cookies for the following purposes:</p>
          <ul>
            <li>
              <strong>Essential cookies:</strong> To remember your theme preference
              (light/dark mode)
            </li>
            <li>
              <strong>Advertising cookies:</strong> Used by Google AdSense to serve
              relevant advertisements
            </li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling cookies
            may affect certain functionality of the website.
          </p>

          <h2>Data Retention</h2>
          <p>
            I do not store any personal data from visitors. Any data collected by
            third-party services (Google AdSense, Vercel) is subject to their
            respective data retention policies.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            This website is not directed at children under the age of 13. I do not
            knowingly collect personal information from children.
          </p>

          <h2>Your Rights</h2>
          <p>Depending on your jurisdiction, you may have the right to:</p>
          <ul>
            <li>Access the personal data held about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of personalized advertising</li>
            <li>Lodge a complaint with a data protection authority</li>
          </ul>

          <h2>Changes to This Policy</h2>
          <p>
            I may update this Privacy Policy from time to time. Any changes will be
            posted on this page with an updated revision date.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact me at:{" "}
            <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800">
          <Link
            href="/"
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
