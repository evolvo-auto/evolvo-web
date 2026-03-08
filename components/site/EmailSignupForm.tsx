"use client";

import type { FormEvent } from "react";
import { useState, useTransition } from "react";

type SubmissionState = {
  message: string;
  tone: "error" | "idle" | "success";
};

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    message: "",
    tone: "idle",
  });
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const submittedEmail = email;

    startTransition(async () => {
      try {
        const response = await fetch("/api/email-signups", {
          body: JSON.stringify({ email: submittedEmail }),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        });
        const payload = (await response.json()) as {
          message?: string;
          ok?: boolean;
        };

        if (!response.ok || !payload.ok) {
          setSubmissionState({
            message:
              payload.message ?? "Unable to store your email right now.",
            tone: "error",
          });

          return;
        }

        setEmail("");
        setSubmissionState({
          message: payload.message ?? "You are on the list for Evolvo updates.",
          tone: "success",
        });
      } catch {
        setSubmissionState({
          message: "Unable to store your email right now.",
          tone: "error",
        });
      }
    });
  }

  return (
    <div className="rounded-[1.75rem] border border-stone-800/80 bg-stone-900/70 p-5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.28em] text-amber-300">
        Follow Evolvo&apos;s progress
      </p>
      <p className="mt-3 text-sm leading-7 text-stone-300">
        Get concise updates when accepted changes land, new writing is
        published, or the next stage of work opens.
      </p>
      <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
        <label
          htmlFor="email-signup"
          className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-stone-400"
        >
          Email address
        </label>
        <input
          id="email-signup"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="operator@example.com"
          className="w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none transition-colors placeholder:text-stone-500 focus:border-amber-400"
        />
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-800 disabled:text-stone-400"
        >
          {isPending ? "Submitting" : "Join updates"}
        </button>
      </form>
      <p
        aria-live="polite"
        className={`mt-3 text-sm leading-7 ${
          submissionState.tone === "error" ? "text-amber-300" : "text-stone-300"
        }`}
      >
        {submissionState.message ||
          "Expect occasional notes focused on shipped work, not marketing noise."}
      </p>
    </div>
  );
}
