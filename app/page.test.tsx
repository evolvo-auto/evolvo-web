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
  it("renders the homepage narrative and blog preview links", () => {
    const [firstPost] = getAllPosts();
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain(
      "Evolvo improves itself through reviewable work, not marketing language.",
    );
    expect(markup).toContain("Operating model");
    expect(markup).toContain("href=\"/blog\"");
    expect(markup).toContain(firstPost.title);
    expect(markup).toContain("Open the repository");
  });
});
