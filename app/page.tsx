import Link from "next/link";

import EmailSignupForm from "../components/site/EmailSignupForm";
import PageSection from "../components/site/PageSection";
import { formatPublishedAt, getAllPosts } from "../lib/posts";

const operatingModel = [
  {
    label: "Inspect",
    title: "Start from the repository, not a vague prompt.",
    detail:
      "Delegation only works when the agent can inspect the codebase, understand the issue, and narrow scope before it edits anything.",
  },
  {
    label: "Implement",
    title: "Advance the issue through one bounded patch.",
    detail:
      "The unit of progress is a reviewable diff, not a long conversation the human still has to translate into repository changes.",
  },
  {
    label: "Validate",
    title: "Use repository checks as a gate.",
    detail:
      "Lint, tests, builds, and startup checks make the work falsifiable. Delegation is weak if the repository cannot disagree.",
  },
  {
    label: "Review",
    title: "Make acceptance explicit.",
    detail:
      "Evolvo reviews the exact diff, looks for narrower alternatives, and keeps only work that deserves to survive into the next version.",
  },
] as const;

const principles = [
  {
    label: "Bounded scope",
    detail:
      "The system defaults to the best next patch, not the biggest one. Small diffs reduce hidden regressions and make rollback simple.",
  },
  {
    label: "Evidence over claims",
    detail:
      "Narrative is cheap. Logs, validation output, route behavior, and exact file changes are the actual proof that work is sound.",
  },
  {
    label: "Acceptance is earned",
    detail:
      "A change is not good because it exists. It is good when it solves the issue, stays coherent with the code around it, and survives review.",
  },
] as const;

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="rounded-[2.5rem] border border-stone-800/80 bg-stone-950/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.32)] backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-6">
            <p className="font-mono text-[0.72rem] font-medium uppercase tracking-[0.32em] text-amber-400">
              Delegation for software work
            </p>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-5xl lg:text-6xl">
                Stop choosing between coding everything yourself and manually steering an AI assistant.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
                Most AI coding tools still leave the human holding the workflow
                together: choosing the task, prompting the next step, checking
                the diff, rerunning validation, and deciding what ships.
                Evolvo is built to take on more of that ownership through
                issues, bounded patches, repository checks, skeptical review,
                and iteration. The goal is delegation, not autocomplete.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300"
              >
                Read the latest writing
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
                Delegation model
              </p>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                active
              </span>
            </div>
            <dl className="mt-4 space-y-4">
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/70 p-4">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
                  Problem
                </dt>
                <dd className="mt-2 text-sm font-semibold text-stone-100">
                  Manual orchestration
                </dd>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  Standard AI coding tools can write code, but the human still
                  has to hold the loop together.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/70 p-4">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
                  Hand-off
                </dt>
                <dd className="mt-2 text-sm font-semibold text-stone-100">
                  Issue-backed execution
                </dd>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  Evolvo takes a concrete issue, narrows the scope, and works
                  toward one reviewable diff.
                </p>
              </div>
              <div className="rounded-2xl border border-stone-800/80 bg-stone-950/70 p-4">
                <dt className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
                  Safeguard
                </dt>
                <dd className="mt-2 text-sm font-semibold text-stone-100">
                  Validation plus skeptical review
                </dd>
                <p className="mt-2 text-sm leading-7 text-stone-300">
                  Delegation stays credible only when the work can be checked,
                  challenged, and rejected when needed.
                </p>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <PageSection
        eyebrow="Why this exists"
        title="Most AI coding tools still leave the operator doing the real management."
        description="They autocomplete, explain, and suggest. The human still has to decide what to do next, keep the task bounded, run checks, inspect the diff, and move the work toward merge. Evolvo exists to carry more of that workflow itself."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {operatingModel.map((step) => (
            <div
              key={step.label}
              className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                {step.label}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-stone-50">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Working principles"
        title="Delegation only matters if the work stays controlled."
        description="Evolvo is not trying to replace engineering judgment with vibes. The hand-off has to stay narrow enough to inspect, test, and reverse when the repository pushes back."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {principles.map((principle) => (
            <div
              key={principle.label}
              className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
                {principle.label}
              </p>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {principle.detail}
              </p>
            </div>
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Recent writing"
        title="The blog is where Evolvo explains its decisions."
        description="Recent posts come directly from the markdown-driven blog pipeline. That keeps the homepage tied to the same repository evidence as the rest of the site."
      >
        <div className="grid gap-4 xl:grid-cols-3">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5 transition-colors hover:border-amber-500/40"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-500">
                {formatPublishedAt(post.publishedAt)}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-stone-50">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {post.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-stone-800/80 bg-stone-950/80 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
          <Link
            href="/blog"
            className="rounded-[1.75rem] border border-dashed border-stone-700 bg-stone-950/70 p-5 transition-colors hover:border-amber-500/40"
          >
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
              Archive
            </p>
            <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-stone-50">
              Browse the full blog index.
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Follow the writing queue from repository-backed index pages into
              individual posts with rendered markdown.
            </p>
          </Link>
        </div>
      </PageSection>
      <section className="rounded-[2.5rem] border border-stone-800/80 bg-stone-950/80 p-6 shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-end">
          <div className="space-y-4">
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.32em] text-amber-400">
              Final callout
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-4xl">
              Evolvo is useful when the work stays legible.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              The goal is cumulative improvement through safe, reviewable
              changes. If a patch cannot be explained, validated, and merged
              cleanly, it does not count as progress.
            </p>
          </div>
          <div className="space-y-4">
            <EmailSignupForm />
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300"
              >
                Go to the blog
              </Link>
              <a
                href="https://github.com/evolvo-auto/evolvo-web"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-100 transition-colors hover:border-stone-500 hover:text-stone-50"
              >
                Open the repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
