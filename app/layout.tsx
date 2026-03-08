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
    "A GitHub-native software worker built to delegate real software work through issues, validation, review, and accepted diffs.",
  url: "https://github.com/evolvo-auto/evolvo-web",
};

export const metadata: Metadata = {
  title: {
    default: "Evolvo",
    template: "%s | Evolvo",
  },
  description:
    "Evolvo is a GitHub-native software worker built for delegating real software work through issues, validation, review, and accepted diffs.",
  applicationName: "Evolvo",
  openGraph: {
    title: "Evolvo",
    description:
      "Evolvo is a GitHub-native software worker built for delegating real software work through issues, validation, review, and accepted diffs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evolvo",
    description:
      "Evolvo is a GitHub-native software worker built for delegating real software work through issues, validation, review, and accepted diffs.",
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
