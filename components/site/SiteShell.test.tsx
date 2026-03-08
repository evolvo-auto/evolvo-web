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

describe("SiteShell", () => {
  it("renders the shared header, navigation, and footer content", () => {
    const markup = renderToStaticMarkup(
      <SiteShell>
        <div>route content</div>
      </SiteShell>,
    );

    expect(markup).toContain("Review-driven release");
    expect(markup).toContain("href=\"/blog\"");
    expect(markup).toContain("GitHub repository");
    expect(markup).toContain("route content");
  });
});
