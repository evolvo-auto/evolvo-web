import { beforeEach, describe, expect, it, vi } from "vitest";

const {
  MockEmailSignupStorageError,
  MockEmailSignupValidationError,
  saveEmailSignup,
} = vi.hoisted(() => {
  class MockEmailSignupValidationError extends Error {}
  class MockEmailSignupStorageError extends Error {}

  return {
    MockEmailSignupStorageError,
    MockEmailSignupValidationError,
    saveEmailSignup: vi.fn(),
  };
});

vi.mock("../../../lib/email-signups", () => ({
  EmailSignupStorageError: MockEmailSignupStorageError,
  EmailSignupValidationError: MockEmailSignupValidationError,
  saveEmailSignup,
}));

import { POST } from "./route";

describe("POST /api/email-signups", () => {
  beforeEach(() => {
    saveEmailSignup.mockReset();
  });

  it("stores valid email signups", async () => {
    saveEmailSignup.mockResolvedValue({
      record: {
        email: "hello@example.com",
        submittedAt: "2026-03-08T00:00:00.000Z",
      },
      status: "created",
    });

    const response = await POST(
      new Request("http://localhost/api/email-signups", {
        body: JSON.stringify({ email: "hello@example.com" }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );
    const payload = (await response.json()) as {
      message: string;
      ok: boolean;
      status: string;
    };

    expect(saveEmailSignup).toHaveBeenCalledWith("hello@example.com");
    expect(response.status).toBe(201);
    expect(payload).toEqual({
      message: "Thanks, you are on the list for Evolvo updates.",
      ok: true,
      status: "created",
    });
  });

  it("returns a duplicate response for existing email signups", async () => {
    saveEmailSignup.mockResolvedValue({
      record: {
        email: "hello@example.com",
        submittedAt: "2026-03-08T00:00:00.000Z",
      },
      status: "duplicate",
    });

    const response = await POST(
      new Request("http://localhost/api/email-signups", {
        body: JSON.stringify({ email: "HELLO@example.com" }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );
    const payload = (await response.json()) as {
      message: string;
      ok: boolean;
      status: string;
    };

    expect(saveEmailSignup).toHaveBeenCalledWith("HELLO@example.com");
    expect(response.status).toBe(200);
    expect(payload).toEqual({
      message: "You are already on the list for Evolvo updates.",
      ok: true,
      status: "duplicate",
    });
  });

  it("rejects invalid email submissions", async () => {
    saveEmailSignup.mockRejectedValue(
      new MockEmailSignupValidationError("Enter a valid email address."),
    );

    const response = await POST(
      new Request("http://localhost/api/email-signups", {
        body: JSON.stringify({ email: "not-an-email" }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );
    const payload = (await response.json()) as {
      message: string;
      ok: boolean;
      status: string;
    };

    expect(response.status).toBe(400);
    expect(payload).toEqual({
      message: "Enter a valid email address.",
      ok: false,
      status: "invalid",
    });
  });

  it("rejects malformed JSON payloads", async () => {
    const response = await POST(
      new Request("http://localhost/api/email-signups", {
        body: "{not-json",
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );
    const payload = (await response.json()) as {
      message: string;
      ok: boolean;
      status: string;
    };

    expect(saveEmailSignup).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
    expect(payload).toEqual({
      message: "Send a JSON body with an email field.",
      ok: false,
      status: "invalid",
    });
  });

  it("returns a storage error when persistence fails", async () => {
    saveEmailSignup.mockRejectedValue(
      new MockEmailSignupStorageError("Email signup storage is unavailable right now."),
    );

    const response = await POST(
      new Request("http://localhost/api/email-signups", {
        body: JSON.stringify({ email: "hello@example.com" }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );
    const payload = (await response.json()) as {
      message: string;
      ok: boolean;
      status: string;
    };

    expect(response.status).toBe(500);
    expect(payload).toEqual({
      message: "Email signup storage is unavailable right now.",
      ok: false,
      status: "error",
    });
  });
});
