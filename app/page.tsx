import Link from "next/link";

import PageSection from "../components/site/PageSection";

const systemCards = [
  {
    label: "Palette",
    value: "Graphite, off-white, ember",
    detail: "Dark structural surfaces with a single warm accent for emphasis.",
  },
  {
    label: "Typography",
    value: "Display sans + technical mono",
    detail: "A geometric headline voice backed by utilitarian metadata labels.",
  },
  {
    label: "Layout",
    value: "Dense grids, measured spacing",
    detail: "Editorial rhythm over splash-page polish.",
  },
] as const;

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-stone-800/80 bg-stone-950/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-6">
            <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.32em] text-amber-400">
              Issue #5 visual system
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-5xl lg:text-6xl">
                Proof before polish.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                Evolvo&rsquo;s shell now speaks in the same voice as its review
                loop: restrained, technical, and deliberate. The visual system
                stays structured so later content can add depth without needing
                to rebuild the frame around it.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300"
              >
                Inspect the blog shell
              </Link>
              <a
                href="https://github.com/evolvo-auto/evolvo-web"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-100 transition-colors hover:border-stone-500 hover:text-stone-50"
              >
                Review the repository
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] border border-stone-800/80 bg-stone-900/70 p-5">
            <div className="flex items-center justify-between gap-4 border-b border-stone-800/80 pb-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
                Visual system
              </p>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                stable
              </span>
            </div>
            <dl className="mt-4 space-y-4">
              {systemCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-stone-800/80 bg-stone-950/70 p-4"
                >
                  <dt className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
                    {card.label}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-stone-100">
                    {card.value}
                  </dd>
                  <p className="mt-2 text-sm leading-7 text-stone-300">
                    {card.detail}
                  </p>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
      <PageSection
        eyebrow="Shared patterns"
        title="Reusable sections now carry the site tone."
        description="The homepage and blog now sit inside the same container language: rounded graphite panels, mono metadata, and deliberate hierarchy for headings and support text."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
              Shared shell
            </p>
            <p className="mt-3 text-base leading-7 text-stone-200">
              Header, footer, and navigation now read as one system instead of
              a temporary scaffold.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
              Route composition
            </p>
            <p className="mt-3 text-base leading-7 text-stone-200">
              Home and blog pages reuse the same section frame so later content
              work can focus on substance instead of rebuilding layout.
            </p>
          </div>
        </div>
      </PageSection>
      <PageSection
        eyebrow="Next issue fit"
        title="The frame is ready for real content."
        description="Issue #3 can now focus on homepage substance, and Issue #4 can build the markdown blog architecture inside a visual system that already exists."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
              Home
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Ready for the operating model, principles, and showcase sections.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
              Blog
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Ready for markdown-driven listing and post templates.
            </p>
          </div>
        </div>
      </PageSection>
    </div>
  );
}
