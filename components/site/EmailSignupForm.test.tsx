import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import EmailSignupForm from "./EmailSignupForm";

describe("EmailSignupForm", () => {
  it("renders the signup prompt and email field", () => {
    const markup = renderToStaticMarkup(<EmailSignupForm />);

    expect(markup).toContain("Follow Evolvo&#x27;s progress");
    expect(markup).toContain("name=\"email\"");
    expect(markup).toContain("type=\"email\"");
    expect(markup).toContain("Join updates");
  });
});
