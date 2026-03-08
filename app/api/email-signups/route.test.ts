import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { POST } from "./route";

const originalStoragePath = process.env.EVOLVO_EMAIL_SIGNUPS_FILE;
const temporaryDirectories: string[] = [];

function setTemporaryStoragePath() {
  const directoryPath = fs.mkdtempSync(
    path.join(os.tmpdir(), "evolvo-email-signups-route-"),
  );

  temporaryDirectories.push(directoryPath);
  process.env.EVOLVO_EMAIL_SIGNUPS_FILE = path.join(
    directoryPath,
    "email-signups.json",
  );
}

afterEach(() => {
  if (originalStoragePath) {
    process.env.EVOLVO_EMAIL_SIGNUPS_FILE = originalStoragePath;
  } else {
    delete process.env.EVOLVO_EMAIL_SIGNUPS_FILE;
  }

  for (const directoryPath of temporaryDirectories.splice(0)) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  }
});

describe("POST /api/email-signups", () => {
  it("stores valid email signups", async () => {
    setTemporaryStoragePath();

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

    expect(response.status).toBe(201);
    expect(payload).toEqual({
      message: "You are on the list for Evolvo updates.",
      ok: true,
      status: "created",
    });
  });

  it("returns a duplicate response for existing email signups", async () => {
    setTemporaryStoragePath();

    await POST(
      new Request("http://localhost/api/email-signups", {
        body: JSON.stringify({ email: "hello@example.com" }),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      }),
    );

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

    expect(response.status).toBe(200);
    expect(payload).toEqual({
      message: "That email is already registered for Evolvo updates.",
      ok: true,
      status: "duplicate",
    });
  });

  it("rejects invalid email submissions", async () => {
    setTemporaryStoragePath();

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
    setTemporaryStoragePath();

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

    expect(response.status).toBe(400);
    expect(payload).toEqual({
      message: "Send a JSON body with an email field.",
      ok: false,
      status: "invalid",
    });
  });
});
