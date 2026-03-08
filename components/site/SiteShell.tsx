import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
] as const;

export default function SiteShell({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-stone-950 text-stone-100">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(251,146,60,0.18),_transparent_28%),linear-gradient(to_bottom,_rgba(255,255,255,0.03)_1px,_transparent_1px),linear-gradient(to_right,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:auto,3.75rem_3.75rem,3.75rem_3.75rem] bg-[position:center,center,center]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-[linear-gradient(to_bottom,_rgba(12,10,9,0.12),_rgba(12,10,9,0.92))]" />
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-5 sm:px-8 sm:py-8 lg:px-10">
        <header className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  aria-label="Evolvo home"
                  className="group inline-flex items-center gap-3 rounded-full pr-2 transition-colors"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-[1.25rem] border border-amber-500/30 bg-stone-900/90 shadow-[0_0_0_1px_rgba(245,158,11,0.08),0_12px_28px_rgba(0,0,0,0.3)]">
                    <Image
                      src="/icon.svg"
                      alt=""
                      aria-hidden="true"
                      width={44}
                      height={44}
                      unoptimized
                      className="h-11 w-11"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="font-mono text-[0.74rem] font-semibold uppercase tracking-[0.34em] text-stone-50 transition-colors group-hover:text-amber-200">
                      Evolvo
                    </span>
                    <span className="text-[0.68rem] uppercase tracking-[0.28em] text-stone-500 transition-colors group-hover:text-stone-300">
                      Accepted diffs over prompts
                    </span>
                  </span>
                </Link>
                <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                  Review-driven release
                </span>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-stone-300">
                Built for people who want to delegate software work instead of
                coding every step themselves or manually orchestrating an AI
                assistant. The site stays restrained so the workflow and
                repository evidence stay in focus.
              </p>
            </div>
            <nav
              aria-label="Primary"
              className="flex flex-wrap items-center gap-3 font-mono text-[0.72rem] uppercase tracking-[0.26em] text-stone-300"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-stone-800/80 px-4 py-2 transition-colors hover:border-amber-500/50 hover:text-stone-50"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-6 py-6 sm:py-8">
          {children}
        </main>
        <footer className="mt-6 rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 px-5 py-5 backdrop-blur sm:px-6">
          <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div className="space-y-3">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
                Shared shell
              </p>
              <p className="max-w-2xl text-sm leading-7 text-stone-300">
                Structured presentation, restrained contrast, and clear route
                framing. Evolvo earns attention by showing the work instead of
                decorating it.
              </p>
            </div>
            <div className="space-y-3 text-sm text-stone-300 md:justify-self-end">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
                Footing
              </p>
              <Link
                href="https://github.com/evolvo-auto/evolvo-web"
                className="inline-flex items-center gap-2 text-stone-100 transition-colors hover:text-amber-300"
              >
                GitHub repository
              </Link>
              <p>Built for bounded tasks, skeptical review, and accepted diffs.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
