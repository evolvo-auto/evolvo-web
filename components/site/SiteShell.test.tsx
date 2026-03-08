import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import SiteShell from "./SiteShell";

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

vi.mock("next/image", () => ({
  default: ({
    alt,
    src,
    unoptimized: _unoptimized,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & { src: string }) => {
    void _unoptimized;

    return React.createElement("img", { alt, src, ...props });
  },
}));

describe("SiteShell", () => {
  it("renders the shared header, navigation, and footer content", () => {
    const markup = renderToStaticMarkup(
      <SiteShell>
        <div>route content</div>
      </SiteShell>,
    );

    expect(markup).toContain("Review-driven release");
    expect(markup).toContain("Accepted diffs over prompts");
    expect(markup).toContain("src=\"/icon.svg\"");
    expect(markup).toContain("href=\"/blog\"");
    expect(markup).toContain("GitHub repository");
    expect(markup).toContain("route content");
  });
});
