import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import "./globals.css";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
] as const;

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Evolvo",
  description:
    "A GitHub-native software worker that improves itself through small, reviewable changes.",
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
    <html lang="en">
      <body className="min-h-screen bg-stone-950 text-stone-100 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6 py-8 sm:px-10">
          <header className="flex items-center justify-between border-b border-stone-800 pb-4">
            <Link
              href="/"
              className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-200"
            >
              Evolvo
            </Link>
            <nav aria-label="Primary" className="flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-stone-300 transition-colors hover:text-stone-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          <div className="flex flex-1 flex-col">{children}</div>
          <footer className="border-t border-stone-800 pt-4 text-sm text-stone-400">
            Small, reviewable diffs for a self-improving software worker.
          </footer>
        </div>
        <Script id="evolvo-site-jsonld" type="application/ld+json">
          {JSON.stringify(siteJsonLd)}
        </Script>
      </body>
    </html>
  );
}
