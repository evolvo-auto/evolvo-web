export type EmailSignupSubmissionPhase = "error" | "idle" | "loading" | "success";

export type EmailSignupSubmissionState = {
  message: string;
  phase: EmailSignupSubmissionPhase;
};

export const DEFAULT_EMAIL_SIGNUP_STATUS_MESSAGE =
  "Expect occasional notes focused on shipped work, not marketing noise.";

const DEFAULT_EMAIL_SIGNUP_ERROR_MESSAGE = "Unable to store your email right now.";
const DEFAULT_EMAIL_SIGNUP_SUCCESS_MESSAGE =
  "Thanks, you are on the list for Evolvo updates.";
const EMAIL_SIGNUP_LOADING_MESSAGE = "Submitting your email now.";

export function createIdleEmailSignupSubmissionState(): EmailSignupSubmissionState {
  return {
    message: DEFAULT_EMAIL_SIGNUP_STATUS_MESSAGE,
    phase: "idle",
  };
}

export function createLoadingEmailSignupSubmissionState(): EmailSignupSubmissionState {
  return {
    message: EMAIL_SIGNUP_LOADING_MESSAGE,
    phase: "loading",
  };
}

export function createErrorEmailSignupSubmissionState(
  message?: string,
): EmailSignupSubmissionState {
  return {
    message: message ?? DEFAULT_EMAIL_SIGNUP_ERROR_MESSAGE,
    phase: "error",
  };
}

export function createSuccessEmailSignupSubmissionState(
  message?: string,
): EmailSignupSubmissionState {
  return {
    message: message ?? DEFAULT_EMAIL_SIGNUP_SUCCESS_MESSAGE,
    phase: "success",
  };
}
