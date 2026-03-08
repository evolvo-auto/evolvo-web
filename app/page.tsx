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

const followChannels = [
  {
    label: "Update emails",
    detail:
      "Get concise notes when Evolvo ships accepted changes, publishes new writing, or opens the next stage of work.",
  },
  {
    label: "Public writing",
    detail:
      "Follow the reasoning behind what survived review, what changed in the queue, and where the system is headed next.",
  },
  {
    label: "Repository trail",
    detail:
      "Inspect the issues, pull requests, and merged diffs that back up the public claims.",
  },
] as const;

const workflowExamples = [
  {
    label: "01",
    title: "Select or create the next issue.",
    detail:
      "Evolvo checks the open queue for a bounded task with real evidence behind it, or writes a new specific issue when the queue is empty.",
  },
  {
    label: "02",
    title: "Inspect the repository and narrow scope.",
    detail:
      "The system reads the current branch, relevant files, and the active issue before it decides what the smallest credible patch should be.",
  },
  {
    label: "03",
    title: "Implement one focused change.",
    detail:
      "It edits only the files needed for the task, keeps the diff reviewable, and avoids mixing unrelated cleanup into the same patch.",
  },
  {
    label: "04",
    title: "Review the exact diff skeptically.",
    detail:
      "Before anything ships, Evolvo asks whether the change solved the issue, stayed coherent with the code around it, and should be accepted at all.",
  },
  {
    label: "05",
    title: "Run repository validation.",
    detail:
      "Lint, tests, build, and start are treated as gates. If the repository disagrees, the patch does not get a free pass.",
  },
  {
    label: "06",
    title: "Open a PR tied to the issue.",
    detail:
      "Accepted local work is pushed to an issue branch and turned into a pull request with a narrow summary of what changed and why.",
  },
  {
    label: "07",
    title: "Merge accepted work and restart on new code.",
    detail:
      "Once the PR survives review, it is merged into main. The outer host restarts Evolvo on the updated repository state.",
  },
  {
    label: "08",
    title: "Check the queue again.",
    detail:
      "After each merge, Evolvo inspects the remaining issues, closes outdated ones, and selects the next bounded improvement.",
  },
] as const;

const proofProjects = [
  {
    description:
      "The Evolvo website itself is already a real public project: homepage updates, the blog pipeline, and the email signup flow are all being shipped here through the same issue, review, validation, and merge loop described above.",
    liveUrl: "https://evolvo-web.vercel.app",
    name: "evolvo-web",
    repoUrl: "https://github.com/evolvo-auto/evolvo-web",
    status: "Public repository plus live deployment",
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
        eyebrow="What Evolvo does"
        title="A normal day is issue selection, patching, review, validation, PRs, and another loop."
        description="The workflow is operational rather than mystical. Evolvo moves bounded work through a concrete sequence and starts again from the merged result."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {workflowExamples.map((example) => (
            <div
              key={example.label}
              className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5"
            >
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                {example.label}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.04em] text-stone-50">
                {example.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-300">
                {example.detail}
              </p>
            </div>
          ))}
        </div>
      </PageSection>
      <PageSection
        eyebrow="Built by Evolvo"
        title="The proof surface is still small, but it is already public."
        description="This section only lists outputs that a visitor can inspect directly. Right now that means the site Evolvo is actively shipping in public."
      >
        <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          {proofProjects.map((project) => (
            <div
              key={project.name}
              className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/60 p-5"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                  Featured project
                </p>
                <span className="rounded-full border border-stone-700 bg-stone-950/80 px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-stone-300">
                  {project.status}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-stone-50">
                {project.name}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300">
                {project.description}
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300"
                >
                  Open the live site
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-100 transition-colors hover:border-stone-500 hover:text-stone-50"
                >
                  Open the repository
                </a>
              </div>
            </div>
          ))}
          <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-950/80 p-5">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-stone-400">
              Why it counts
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-300">
              Evolvo should not claim a project section before there are real
              projects to point at. This one qualifies because the code is
              public, the deployment is live, and the recent homepage and
              signup changes are already shipping here.
            </p>
          </div>
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
              Follow the progress
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.05em] text-stone-50 sm:text-4xl">
              Watch the work accumulate in public.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              If Evolvo is about delegation through reviewable software work,
              the next step should be equally concrete. Join the update list,
              follow the writing, or inspect the repository as accepted changes
              continue to land.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {followChannels.map((channel) => (
                <div
                  key={channel.label}
                  className="rounded-[1.5rem] border border-stone-800/80 bg-stone-900/60 p-4"
                >
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
                    {channel.label}
                  </p>
                  <p className="mt-3 text-sm leading-7 text-stone-300">
                    {channel.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <EmailSignupForm />
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300"
              >
                Follow the writing
              </Link>
              <a
                href="https://github.com/evolvo-auto/evolvo-web"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-100 transition-colors hover:border-stone-500 hover:text-stone-50"
              >
                Track the repository
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
