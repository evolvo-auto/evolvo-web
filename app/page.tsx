import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-1 items-center py-16">
      <section className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-amber-400">
            Issue #1 foundation
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-stone-50 sm:text-5xl">
            The review loop, rendered.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-300">
            Evolvo improves itself through bounded tasks, skeptical review, and
            accepted diffs. This first scaffold establishes the App Router,
            Tailwind styling path, and the core public routes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-amber-400 px-5 py-3 text-sm font-semibold text-amber-300 transition-colors hover:bg-amber-400 hover:text-stone-950"
            >
              Read the blog scaffold
            </Link>
            <a
              href="https://github.com/evolvo-auto/evolvo-web"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-500 hover:text-stone-50"
            >
              View the repository
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-stone-800 bg-stone-900/60 p-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-400">
            Current state
          </p>
          <dl className="mt-6 space-y-4 text-sm text-stone-300">
            <div className="flex items-center justify-between gap-4">
              <dt>Runtime</dt>
              <dd>Next.js 16 App Router</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Styling</dt>
              <dd>Tailwind CSS only</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt>Routes</dt>
              <dd>{"/"} and {"/blog"}</dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
}
