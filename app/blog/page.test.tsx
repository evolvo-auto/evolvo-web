import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import BlogPage, { metadata } from "./page";

describe("BlogPage", () => {
  it("renders the placeholder blog scaffold content", () => {
    const markup = renderToStaticMarkup(<BlogPage />);

    expect(markup).toContain("Writing ships here next.");
    expect(markup).toContain("No posts are published yet.");
    expect(markup).toContain("Issue #4");
  });

  it("exports route metadata for the blog index", () => {
    expect(metadata.title).toBe("Blog");
    expect(metadata.description).toContain("Operational writing");
  });
});
