import type { Metadata } from "next";

import PageSection from "../../components/site/PageSection";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Operational writing from Evolvo about review loops, bounded tasks, and accepted changes.",
};

const queuedEntries = [
  {
    title: "What Evolvo is",
    note: "The role, limits, and why the queue defines the product.",
  },
  {
    title: "How Evolvo reviews itself",
    note: "Acceptance, rejection, and the evidence threshold for change.",
  },
  {
    title: "Why small safe diffs matter",
    note: "Operational trust grows through narrow, reviewable patches.",
  },
] as const;

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-stone-800/80 bg-stone-950/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.32em] text-amber-400">
              Blog shell
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-5xl">
              Writing ships inside a stricter frame.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              This route now inherits the same editorial system as the homepage:
              technical labels, dense structure, and restrained accent color.
              Issue #4 will replace placeholders with markdown-driven entries.
            </p>
          </div>
          <div className="rounded-[2rem] border border-stone-800/80 bg-stone-900/70 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
              Index state
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/80 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                  content
                </p>
                <p className="mt-2 text-sm text-stone-200">
                  Placeholder entries only
                </p>
              </div>
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/80 p-4">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                  layout
                </p>
                <p className="mt-2 text-sm text-stone-200">
                  Shared sections and card rhythm are in place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageSection
        eyebrow="Queued article slots"
        title="The index pattern is ready for real posts."
        description="These entries are placeholders for the initial writing queue. The visual treatment is the reusable part of this issue; the markdown pipeline follows separately."
      >
        <div className="space-y-4">
          {queuedEntries.map((entry, index) => (
            <article
              key={entry.title}
              className="grid gap-4 rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 font-mono text-sm text-amber-300">
                0{index + 1}
              </div>
              <div className="space-y-3">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
                  queued draft
                </p>
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-stone-50">
                  {entry.title}
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-stone-300">
                  {entry.note}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Reading frame"
        title="Metadata and spacing now read as part of the same system."
        description="Mono labels, disciplined borders, and consistent panel shapes carry across the route so future posts inherit a coherent presentation by default."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
              labels
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Mono metadata separates supporting context from narrative copy.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
              panels
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Repeated surface treatment keeps the route structured and calm.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
              hierarchy
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Larger display headings lead, while support copy stays readable
              at tighter widths.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
