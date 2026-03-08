import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

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
  it("renders the foundation messaging and route links", () => {
    const markup = renderToStaticMarkup(<HomePage />);

    expect(markup).toContain("The review loop, rendered.");
    expect(markup).toContain("href=\"/blog\"");
    expect(markup).toContain("https://github.com/evolvo-auto/evolvo-web");
  });
});
