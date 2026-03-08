import { describe, expect, it } from "vitest";

import {
  formatPublishedAt,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "./posts";

describe("posts", () => {
  it("loads markdown post summaries sorted from newest to oldest", () => {
    const posts = getAllPosts();

    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]?.publishedAt >= posts[posts.length - 1]?.publishedAt).toBe(
      true,
    );

    for (const post of posts) {
      expect(post.title.length).toBeGreaterThan(0);
      expect(post.description.length).toBeGreaterThan(0);
      expect(post.slug.length).toBeGreaterThan(0);
      expect(post.tags.length).toBeGreaterThan(0);
    }
  });

  it("returns post slugs and resolves full post content by slug", () => {
    const [firstSlug] = getPostSlugs();

    expect(firstSlug).toBeDefined();

    const post = getPostBySlug(firstSlug);

    expect(post?.slug).toBe(firstSlug);
    expect(post?.content.length).toBeGreaterThan(0);
  });

  it("formats publication dates for display", () => {
    expect(formatPublishedAt("2026-03-05")).toBe("March 5, 2026");
  });
});
