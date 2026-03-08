import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { getAllPosts } from "../../lib/posts";

import BlogPage, { metadata } from "./page";

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

describe("BlogPage", () => {
  it("renders repository-backed post cards", () => {
    const [firstPost] = getAllPosts();
    const markup = renderToStaticMarkup(<BlogPage />);

    expect(markup).toContain(
      "Writing about the work around AI coding, not just Evolvo&#x27;s internals.",
    );
    expect(markup).toContain(firstPost.title);
    expect(markup).toContain(`/blog/${firstPost.slug}`);
  });

  it("exports route metadata for the blog index", () => {
    expect(metadata.title).toBe("Blog");
    expect(metadata.description).toContain("delegation");
  });
});
