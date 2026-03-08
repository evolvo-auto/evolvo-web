"use client";

import type { FormEvent } from "react";
import { useState } from "react";

import {
  createErrorEmailSignupSubmissionState,
  createIdleEmailSignupSubmissionState,
  createLoadingEmailSignupSubmissionState,
  createSuccessEmailSignupSubmissionState,
  type EmailSignupSubmissionState,
} from "./email-signup-submission-state";

export default function EmailSignupForm() {
  const [email, setEmail] = useState("");
  const [submissionState, setSubmissionState] = useState<EmailSignupSubmissionState>(
    createIdleEmailSignupSubmissionState(),
  );
  const isLoading = submissionState.phase === "loading";
  const isError = submissionState.phase === "error";
  const isSuccess = submissionState.phase === "success";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading || isSuccess) {
      return;
    }

    const submittedEmail = email;
    setSubmissionState(createLoadingEmailSignupSubmissionState());

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
        setSubmissionState(createErrorEmailSignupSubmissionState(payload.message));

        return;
      }

      setSubmissionState(createSuccessEmailSignupSubmissionState(payload.message));
    } catch {
      setSubmissionState(createErrorEmailSignupSubmissionState());
    }
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
      {isSuccess ? (
        <div className="mt-5 rounded-2xl border border-amber-500/40 bg-stone-950 p-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-amber-300">
            Signup confirmed
          </p>
          <p className="mt-2 text-sm leading-7 text-stone-200">
            {submissionState.message}
          </p>
        </div>
      ) : (
        <form className="mt-5 space-y-3" onSubmit={handleSubmit} aria-busy={isLoading}>
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
            disabled={isLoading}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);

              if (isError) {
                setSubmissionState(createIdleEmailSignupSubmissionState());
              }
            }}
            aria-invalid={isError || undefined}
            aria-describedby="email-signup-status"
            placeholder="operator@example.com"
            className="w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-sm text-stone-100 outline-none transition-colors placeholder:text-stone-500 focus:border-amber-400 disabled:cursor-not-allowed disabled:opacity-70"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center rounded-full border border-amber-400 bg-amber-400 px-5 py-3 font-mono text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-stone-950 transition-colors hover:bg-amber-300 disabled:cursor-not-allowed disabled:border-stone-700 disabled:bg-stone-800 disabled:text-stone-400"
          >
            {isLoading ? "Submitting..." : "Join updates"}
          </button>
        </form>
      )}
      <p
        id="email-signup-status"
        role={isError ? "alert" : "status"}
        aria-live={isError ? "assertive" : "polite"}
        aria-atomic="true"
        className={`mt-3 text-sm leading-7 ${
          isError ? "text-amber-300" : "text-stone-300"
        }`}
      >
        {submissionState.message}
      </p>
    </div>
  );
}
