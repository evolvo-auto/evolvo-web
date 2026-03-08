import { describe, expect, it } from "vitest";

import {
  EmailSignupStorageError,
  EmailSignupValidationError,
  normalizeEmail,
  readEmailSignups,
  saveEmailSignup,
  validateEmailAddress,
} from "./email-signups";

type EmailSignupRecord = {
  email: string;
  submittedAt: string;
};

function createInMemoryStore(initialRecords: EmailSignupRecord[] = []) {
  const records = [...initialRecords];

  return {
    async ensureSchema() {
      return undefined;
    },
    async findSignupByEmail(email: string) {
      return records.find((record) => record.email === email);
    },
    async insertSignup(record: EmailSignupRecord) {
      if (records.some((existingRecord) => existingRecord.email === record.email)) {
        return undefined;
      }

      records.push(record);

      return record;
    },
    async listSignups() {
      return [...records];
    },
  };
}

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

  it("stores new signups and skips duplicate emails", async () => {
    const store = createInMemoryStore();

    expect((await saveEmailSignup("first@example.com", store)).status).toBe(
      "created",
    );
    expect((await saveEmailSignup("FIRST@example.com", store)).status).toBe(
      "duplicate",
    );
    expect(await readEmailSignups(store)).toEqual([
      expect.objectContaining({
        email: "first@example.com",
      }),
    ]);
  });

  it("wraps store failures as storage errors", async () => {
    const failingStore = {
      async ensureSchema() {
        throw new Error("database offline");
      },
      async findSignupByEmail() {
        return undefined;
      },
      async insertSignup() {
        return undefined;
      },
      async listSignups() {
        throw new Error("database offline");
      },
    };

    await expect(saveEmailSignup("first@example.com", failingStore)).rejects.toThrow(
      EmailSignupStorageError,
    );
    await expect(readEmailSignups(failingStore)).rejects.toThrow(
      EmailSignupStorageError,
    );
  });
});
