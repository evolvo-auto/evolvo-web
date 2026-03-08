import postgres from "postgres";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmailSignupRow = {
  email: string;
  submitted_at: Date | string;
};

type EmailSignupsStore = {
  ensureSchema(): Promise<void>;
  findSignupByEmail(email: string): Promise<EmailSignupRecord | undefined>;
  insertSignup(record: EmailSignupRecord): Promise<EmailSignupRecord | undefined>;
  listSignups(): Promise<EmailSignupRecord[]>;
};

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

let cachedEmailSignupsStore: EmailSignupsStore | undefined;

function toEmailSignupRecord(row: EmailSignupRow): EmailSignupRecord {
  return {
    email: row.email,
    submittedAt: new Date(row.submitted_at).toISOString(),
  };
}

function getDatabaseUrl(): string {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new EmailSignupStorageError(
      "Email signup storage is unavailable right now.",
    );
  }

  return databaseUrl;
}

function createEmailSignupsStore(): EmailSignupsStore {
  const sql = postgres(getDatabaseUrl(), {
    max: 1,
    prepare: false,
  });
  let schemaReadyPromise: Promise<void> | undefined;

  async function ensureSchema() {
    schemaReadyPromise ??= sql`
      CREATE TABLE IF NOT EXISTS email_signups (
        email TEXT PRIMARY KEY,
        submitted_at TIMESTAMPTZ NOT NULL
      )
    `
      .then(() => undefined)
      .catch((error: unknown) => {
        schemaReadyPromise = undefined;
        throw error;
      });

    await schemaReadyPromise;
  }

  return {
    async ensureSchema() {
      await ensureSchema();
    },
    async findSignupByEmail(email: string) {
      await ensureSchema();

      const [row] = await sql<EmailSignupRow[]>`
        SELECT email, submitted_at
        FROM email_signups
        WHERE email = ${email}
        LIMIT 1
      `;

      return row ? toEmailSignupRecord(row) : undefined;
    },
    async insertSignup(record: EmailSignupRecord) {
      await ensureSchema();

      const [row] = await sql<EmailSignupRow[]>`
        INSERT INTO email_signups (email, submitted_at)
        VALUES (${record.email}, ${record.submittedAt}::timestamptz)
        ON CONFLICT (email) DO NOTHING
        RETURNING email, submitted_at
      `;

      return row ? toEmailSignupRecord(row) : undefined;
    },
    async listSignups() {
      await ensureSchema();

      const rows = await sql<EmailSignupRow[]>`
        SELECT email, submitted_at
        FROM email_signups
        ORDER BY submitted_at ASC, email ASC
      `;

      return rows.map(toEmailSignupRecord);
    },
  };
}

function getEmailSignupsStore(): EmailSignupsStore {
  cachedEmailSignupsStore ??= createEmailSignupsStore();

  return cachedEmailSignupsStore;
}

function toStorageError(error: unknown): EmailSignupStorageError {
  if (error instanceof EmailSignupStorageError) {
    return error;
  }

  return new EmailSignupStorageError(
    "Email signup storage is unavailable right now.",
  );
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

export async function readEmailSignups(
  store: EmailSignupsStore = getEmailSignupsStore(),
): Promise<EmailSignupRecord[]> {
  try {
    return await store.listSignups();
  } catch (error) {
    throw toStorageError(error);
  }
}

export async function saveEmailSignup(
  email: unknown,
  store: EmailSignupsStore = getEmailSignupsStore(),
): Promise<EmailSignupResult> {
  const normalizedEmail = validateEmailAddress(email);

  try {
    const insertedSignup = await store.insertSignup({
      email: normalizedEmail,
      submittedAt: new Date().toISOString(),
    });

    if (insertedSignup) {
      return {
        record: insertedSignup,
        status: "created",
      };
    }

    const existingSignup = await store.findSignupByEmail(normalizedEmail);

    if (existingSignup) {
      return {
        record: existingSignup,
        status: "duplicate",
      };
    }
  } catch (error) {
    throw toStorageError(error);
  }

  throw new EmailSignupStorageError(
    "Email signup storage is unavailable right now.",
  );
}
