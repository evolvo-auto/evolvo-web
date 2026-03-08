import {
  EmailSignupStorageError,
  EmailSignupValidationError,
  saveEmailSignup,
} from "../../../lib/email-signups";

type EmailSignupRequest = {
  email?: unknown;
};

export async function POST(request: Request) {
  let body: EmailSignupRequest;

  try {
    body = (await request.json()) as EmailSignupRequest;
  } catch {
    return Response.json(
      {
        message: "Send a JSON body with an email field.",
        ok: false,
        status: "invalid",
      },
      { status: 400 },
    );
  }

  try {
    const result = saveEmailSignup(body?.email);

    if (result.status === "duplicate") {
      return Response.json({
        message: "That email is already registered for Evolvo updates.",
        ok: true,
        status: "duplicate",
      });
    }

    return Response.json(
      {
        message: "You are on the list for Evolvo updates.",
        ok: true,
        status: "created",
      },
      { status: 201 },
    );
  } catch (error) {
    if (error instanceof EmailSignupValidationError) {
      return Response.json(
        {
          message: error.message,
          ok: false,
          status: "invalid",
        },
        { status: 400 },
      );
    }

    if (error instanceof EmailSignupStorageError) {
      return Response.json(
        {
          message: "Email signup storage is unavailable right now.",
          ok: false,
          status: "error",
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        message: "Unable to store your email right now.",
        ok: false,
        status: "error",
      },
      { status: 500 },
    );
  }
}
