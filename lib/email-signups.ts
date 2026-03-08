import fs from "node:fs";
import path from "node:path";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type EmailSignupRecord = {
  email: string;
  submittedAt: string;
};

export type EmailSignupResult = {
  record: EmailSignupRecord;
  status: "created" | "duplicate";
};

export class EmailSignupValidationError extends Error {}

export class EmailSignupStorageError extends Error {}

function getEmailSignupsFilePath() {
  if (process.env.EVOLVO_EMAIL_SIGNUPS_FILE) {
    return path.resolve(process.env.EVOLVO_EMAIL_SIGNUPS_FILE);
  }

  return path.join(process.cwd(), "data", "email-signups.json");
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function validateEmailAddress(value: unknown): string {
  if (typeof value !== "string") {
    throw new EmailSignupValidationError("Enter a valid email address.");
  }

  const normalizedEmail = normalizeEmail(value);

  if (
    normalizedEmail.length === 0 ||
    normalizedEmail.length > 254 ||
    !emailPattern.test(normalizedEmail)
  ) {
    throw new EmailSignupValidationError("Enter a valid email address.");
  }

  return normalizedEmail;
}

function isEmailSignupRecord(value: unknown): value is EmailSignupRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.email === "string" &&
    typeof record.submittedAt === "string" &&
    !Number.isNaN(Date.parse(record.submittedAt))
  );
}

export function readEmailSignups(
  filePath = getEmailSignupsFilePath(),
): EmailSignupRecord[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    throw new EmailSignupStorageError(
      `Email signup storage at "${filePath}" is not valid JSON.`,
    );
  }

  if (!Array.isArray(parsed) || !parsed.every(isEmailSignupRecord)) {
    throw new EmailSignupStorageError(
      `Email signup storage at "${filePath}" has an invalid shape.`,
    );
  }

  return parsed;
}

export function saveEmailSignup(
  email: unknown,
  filePath = getEmailSignupsFilePath(),
): EmailSignupResult {
  const normalizedEmail = validateEmailAddress(email);
  const existingSignups = readEmailSignups(filePath);
  const existingSignup = existingSignups.find(
    (signup) => signup.email === normalizedEmail,
  );

  if (existingSignup) {
    return {
      record: existingSignup,
      status: "duplicate",
    };
  }

  const record = {
    email: normalizedEmail,
    submittedAt: new Date().toISOString(),
  } satisfies EmailSignupRecord;

  fs.mkdirSync(path.dirname(filePath), { recursive: true });

  const temporaryFilePath = `${filePath}.tmp`;

  fs.writeFileSync(
    temporaryFilePath,
    JSON.stringify([...existingSignups, record], null, 2) + "\n",
  );
  fs.renameSync(temporaryFilePath, filePath);

  return {
    record,
    status: "created",
  };
}
