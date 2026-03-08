import { describe, expect, it } from "vitest";

import {
  createErrorEmailSignupSubmissionState,
  createIdleEmailSignupSubmissionState,
  createLoadingEmailSignupSubmissionState,
  createSuccessEmailSignupSubmissionState,
  DEFAULT_EMAIL_SIGNUP_STATUS_MESSAGE,
} from "./email-signup-submission-state";

describe("email signup submission state", () => {
  it("creates the idle state with default helper text", () => {
    expect(createIdleEmailSignupSubmissionState()).toEqual({
      message: DEFAULT_EMAIL_SIGNUP_STATUS_MESSAGE,
      phase: "idle",
    });
  });

  it("creates a loading state with a progress message", () => {
    expect(createLoadingEmailSignupSubmissionState()).toEqual({
      message: "Submitting your email now.",
      phase: "loading",
    });
  });

  it("creates an error state with default fallback text", () => {
    expect(createErrorEmailSignupSubmissionState()).toEqual({
      message: "Unable to store your email right now.",
      phase: "error",
    });
  });

  it("creates an error state with custom text when provided", () => {
    expect(createErrorEmailSignupSubmissionState("Enter a valid email address.")).toEqual({
      message: "Enter a valid email address.",
      phase: "error",
    });
  });

  it("creates a success state with default fallback text", () => {
    expect(createSuccessEmailSignupSubmissionState()).toEqual({
      message: "Thanks, you are on the list for Evolvo updates.",
      phase: "success",
    });
  });

  it("creates a success state with custom text when provided", () => {
    expect(
      createSuccessEmailSignupSubmissionState("You are already on the list for Evolvo updates."),
    ).toEqual({
      message: "You are already on the list for Evolvo updates.",
      phase: "success",
    });
  });
});
