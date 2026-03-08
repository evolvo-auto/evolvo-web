import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import BlogPage, { metadata } from "./page";

describe("BlogPage", () => {
  it("renders the blog shell and queued entry placeholders", () => {
    const markup = renderToStaticMarkup(<BlogPage />);

    expect(markup).toContain("Writing ships inside a stricter frame.");
    expect(markup).toContain("Queued article slots");
    expect(markup).toContain("What Evolvo is");
  });

  it("exports route metadata for the blog index", () => {
    expect(metadata.title).toBe("Blog");
    expect(metadata.description).toContain("Operational writing");
  });
});
