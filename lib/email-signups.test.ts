import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  EmailSignupStorageError,
  EmailSignupValidationError,
  normalizeEmail,
  readEmailSignups,
  saveEmailSignup,
  validateEmailAddress,
} from "./email-signups";

const temporaryPaths: string[] = [];

function createTemporaryFilePath(fileName: string) {
  const directoryPath = fs.mkdtempSync(
    path.join(os.tmpdir(), "evolvo-email-signups-"),
  );
  const filePath = path.join(directoryPath, fileName);

  temporaryPaths.push(directoryPath);

  return filePath;
}

afterEach(() => {
  for (const directoryPath of temporaryPaths.splice(0)) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  }
});

describe("email signups", () => {
  it("normalizes and validates email addresses", () => {
    expect(normalizeEmail("  HELLO@EXAMPLE.COM  ")).toBe("hello@example.com");
    expect(validateEmailAddress("  HELLO@EXAMPLE.COM  ")).toBe(
      "hello@example.com",
    );
    expect(() => validateEmailAddress("not-an-email")).toThrow(
      EmailSignupValidationError,
    );
  });

  it("stores new signups and skips duplicate emails", () => {
    const filePath = createTemporaryFilePath("email-signups.json");

    expect(saveEmailSignup("first@example.com", filePath).status).toBe(
      "created",
    );
    expect(saveEmailSignup("FIRST@example.com", filePath).status).toBe(
      "duplicate",
    );
    expect(readEmailSignups(filePath)).toEqual([
      expect.objectContaining({
        email: "first@example.com",
      }),
    ]);
  });

  it("fails clearly when the storage file is malformed", () => {
    const filePath = createTemporaryFilePath("email-signups.json");

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "{not-json");

    expect(() => readEmailSignups(filePath)).toThrow(EmailSignupStorageError);
  });
});
