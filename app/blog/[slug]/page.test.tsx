import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

import { formatPublishedAt, getAllPosts } from "../../../lib/posts";

import BlogPostPage, {
  dynamicParams,
  generateMetadata,
  generateStaticParams,
} from "./page";

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

describe("BlogPostPage", () => {
  it("renders a markdown-driven post route", async () => {
    const [firstPost] = getAllPosts();

    const page = await BlogPostPage({
      params: Promise.resolve({ slug: firstPost.slug }),
    });
    const markup = renderToStaticMarkup(page);

    expect(markup).toContain(firstPost.title);
    expect(markup).toContain(formatPublishedAt(firstPost.publishedAt));
    expect(markup).toContain(firstPost.tags[0]);
    expect(markup).toContain("Back to blog");
  });

  it("generates static params for the available markdown posts", () => {
    const params = generateStaticParams();

    expect(params).toEqual(
      expect.arrayContaining(
        getAllPosts().map((post) => ({
          slug: post.slug,
        })),
      ),
    );
    expect(dynamicParams).toBe(false);
  });

  it("exposes per-post metadata from markdown frontmatter", async () => {
    const [firstPost] = getAllPosts();

    await expect(
      generateMetadata({
        params: Promise.resolve({ slug: firstPost.slug }),
      }),
    ).resolves.toEqual({
      title: firstPost.title,
      description: firstPost.description,
    });
  });
});
