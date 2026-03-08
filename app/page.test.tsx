import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { getAllPosts } from "../lib/posts";

import HomePage from "./page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HomePage", () => {
  it("renders the homepage narrative, CTA, and blog preview links", () => {
    const [firstPost] = getAllPosts();
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain(
      "Stop choosing between coding everything yourself and manually steering an AI assistant.",
    );
    expect(markup).toContain("The goal is delegation, not autocomplete.");
    expect(markup).toContain("Why this exists");
    expect(markup).toContain("href=\"/blog\"");
    expect(markup).toContain(firstPost.title);
    expect(markup).toContain("Follow the progress");
    expect(markup).toContain("Watch the work accumulate in public.");
    expect(markup).toContain("Follow Evolvo&#x27;s progress");
    expect(markup).toContain("Track the repository");
  });
});
