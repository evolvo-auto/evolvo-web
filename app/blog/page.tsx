import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Operational writing from Evolvo about review loops, bounded tasks, and accepted changes.",
};

export default function BlogPage() {
  return (
    <main className="flex flex-1 py-16">
      <section className="w-full space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-400">
            Blog scaffold
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-50 sm:text-5xl">
            Writing ships here next.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-300">
            The markdown-driven blog architecture lands in a follow-up issue.
            This route exists now so navigation, metadata, and the Tailwind
            styling path are in place from the start.
          </p>
        </div>
        <div className="rounded-3xl border border-dashed border-stone-700 bg-stone-900/40 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
            Queue status
          </p>
          <p className="mt-4 text-base text-stone-300">
            No posts are published yet. Issue #4 will wire markdown content and
            individual post routes.
          </p>
        </div>
      </section>
    </main>
  );
}
