import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import PageSection from "./PageSection";

describe("PageSection", () => {
  it("renders the shared section framing and content", () => {
    const markup = renderToStaticMarkup(
      <PageSection
        eyebrow="Shared pattern"
        title="Structured section"
        description="Reusable editorial framing for route content."
      >
        <div>section body</div>
      </PageSection>,
    );

    expect(markup).toContain("Shared pattern");
    expect(markup).toContain("Structured section");
    expect(markup).toContain("Reusable editorial framing");
    expect(markup).toContain("section body");
  });

  it("supports additional class names for route-specific layout tweaks", () => {
    const markup = renderToStaticMarkup(
      <PageSection eyebrow="Eyebrow" title="Title" className="ring-1">
        <div>body</div>
      </PageSection>,
    );

    expect(markup).toContain("ring-1");
  });
});
