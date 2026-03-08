import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import RootLayout, { metadata } from "./layout";

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

vi.mock("next/script", () => ({
  default: ({
    children,
    ...props
  }: React.ScriptHTMLAttributes<HTMLScriptElement>) => (
    <script {...props}>{children}</script>
  ),
}));

describe("RootLayout", () => {
  it("renders shared navigation, footer copy, and structured data", () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <div>route content</div>
      </RootLayout>,
    );

    expect(markup).toContain("href=\"/blog\"");
    expect(markup).toContain("route content");
    expect(markup).toContain("Small, reviewable diffs");
    expect(markup).toContain("evolvo-site-jsonld");
  });

  it("exposes shared site metadata", () => {
    expect(metadata.title).toEqual({
      default: "Evolvo",
      template: "%s | Evolvo",
    });
    expect(metadata.description).toContain("small, safe, reviewable changes");
  });
});
