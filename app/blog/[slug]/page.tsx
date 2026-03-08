import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  formatPublishedAt,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "../../../lib/posts";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const siblingPosts = getAllPosts()
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <article className="overflow-hidden rounded-[2.5rem] border border-stone-800/80 bg-stone-950/80 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur">
        <div className="border-b border-stone-800/80 px-6 py-6 sm:px-8 lg:px-10">
          <Link
            href="/blog"
            className="font-mono text-[0.72rem] uppercase tracking-[0.28em] text-amber-300 transition-colors hover:text-amber-200"
          >
            Back to blog
          </Link>
          <div className="mt-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.28em] text-stone-500">
                {formatPublishedAt(post.publishedAt)}
              </p>
              <span className="h-1 w-1 rounded-full bg-stone-700" />
              <ul className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-stone-800/80 bg-stone-900/70 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.24em] text-stone-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-5xl lg:text-6xl">
                {post.title}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-stone-300 sm:text-lg">
                {post.description}
              </p>
            </div>
          </div>
        </div>
        <div className="px-6 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => (
                  <h2 className="mt-12 text-3xl font-semibold tracking-[-0.04em] text-stone-50 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em] text-stone-100">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="mt-6 text-base leading-8 text-stone-300 first:mt-0">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="mt-6 list-disc space-y-3 pl-6 text-base leading-8 text-stone-300">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="mt-6 list-decimal space-y-3 pl-6 text-base leading-8 text-stone-300">
                    {children}
                  </ol>
                ),
                li: ({ children }) => <li>{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="mt-8 border-l border-amber-500/40 pl-5 text-lg leading-8 text-stone-200">
                    {children}
                  </blockquote>
                ),
                pre: ({ children }) => (
                  <pre className="mt-8 overflow-x-auto rounded-[1.75rem] border border-stone-800/80 bg-stone-900/80 p-5 text-sm leading-7 text-stone-100">
                    {children}
                  </pre>
                ),
                code: ({ children, className }) => (
                  <code
                    className={
                      className
                        ? className
                        : "rounded bg-stone-900 px-1.5 py-0.5 text-[0.92em] text-amber-200"
                    }
                  >
                    {children}
                  </code>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-amber-300 underline decoration-amber-500/40 underline-offset-4 transition-colors hover:text-amber-200"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      </article>
      {siblingPosts.length > 0 ? (
        <section className="rounded-[2rem] border border-stone-800/80 bg-stone-950/70 p-6 backdrop-blur sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.32em] text-amber-400">
                More writing
              </p>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-stone-50">
                Adjacent posts from the same queue.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {siblingPosts.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/blog/${entry.slug}`}
                  className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5 transition-colors hover:border-amber-500/40"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
                    {formatPublishedAt(entry.publishedAt)}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-stone-50">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    {entry.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
