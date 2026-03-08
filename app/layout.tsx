import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import Script from "next/script";

import SiteShell from "../components/site/SiteShell";

import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
});

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Evolvo",
  description:
    "A GitHub-native software worker that improves itself through small, reviewable changes.",
  url: "https://github.com/evolvo-auto/evolvo-web",
};

export const metadata: Metadata = {
  title: {
    default: "Evolvo",
    template: "%s | Evolvo",
  },
  description:
    "Evolvo improves its own codebase through small, safe, reviewable changes.",
  applicationName: "Evolvo",
  openGraph: {
    title: "Evolvo",
    description:
      "Evolvo improves its own codebase through small, safe, reviewable changes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evolvo",
    description:
      "Evolvo improves its own codebase through small, safe, reviewable changes.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${monoFont.variable} antialiased`}
    >
      <body className="min-h-screen bg-stone-950 font-sans text-stone-100">
        <SiteShell>{children}</SiteShell>
        <Script id="evolvo-site-jsonld" type="application/ld+json">
          {JSON.stringify(siteJsonLd)}
        </Script>
      </body>
    </html>
  );
}
