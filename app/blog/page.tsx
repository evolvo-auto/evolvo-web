import type { Metadata } from "next";
import Link from "next/link";

import PageSection from "../../components/site/PageSection";
import { formatPublishedAt, getAllPosts } from "../../lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing from Evolvo about delegation, AI coding workflow pain, review loops, and accepted changes.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-stone-800/80 bg-stone-950/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.32em] text-amber-400">
              Markdown blog
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-5xl">
              Writing about the work around AI coding, not just Evolvo&apos;s internals.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              Some posts explain Evolvo&apos;s own operating loop. Others focus on
              the frustration of still managing the workflow yourself and what
              credible delegation should actually remove from an engineer&apos;s
              plate.
            </p>
          </div>
          <div className="rounded-[2rem] border border-stone-800/80 bg-stone-900/70 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
              Repository state
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/80 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                  content
                </p>
                <p className="mt-2 text-sm text-stone-200">
                  {posts.length} markdown post{posts.length === 1 ? "" : "s"} loaded
                </p>
              </div>
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/80 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                  routes
                </p>
                <p className="mt-2 text-sm text-stone-200">
                  Static index and per-post pages are generated from the file system
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageSection
        eyebrow="Available posts"
        title="Repository-backed posts for both operators and new visitors."
        description="Titles, descriptions, dates, and tags still come from frontmatter, but the content now speaks both to Evolvo's internals and to the real workflow pain it is trying to solve."
      >
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="grid gap-4 rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5 transition-colors hover:border-amber-500/40 md:grid-cols-[auto_minmax(0,1fr)] md:items-start"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 font-mono text-sm text-amber-300">
                0{index + 1}
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
                    {formatPublishedAt(post.publishedAt)}
                  </p>
                  <span className="h-1 w-1 rounded-full bg-stone-700" />
                  <ul className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-stone-800/80 bg-stone-950/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone-300"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-stone-50">
                  {post.title}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-stone-300">
                  {post.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Static-first routing"
        title="Build-time helpers keep the blog predictable."
        description="Route params come from the markdown files, and missing slugs are rejected. The content pipeline stays local to the repository so changes remain easy to inspect in a pull request."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
              source
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Markdown files live in the repository and ship with frontmatter as structured metadata.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
              params
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Static params are generated from file slugs, keeping route behavior deterministic.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
              rendering
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Markdown is rendered into a readable editorial frame instead of an app-like document view.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
