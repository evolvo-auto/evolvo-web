import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import {
  formatPublishedAt,
  getAllPosts,
  getPostBySlug,
  getPostSlugs,
} from "./posts";

const temporaryDirectories: string[] = [];

function createPostsDirectory(files: Record<string, string>): string {
  const directoryPath = fs.mkdtempSync(path.join(os.tmpdir(), "evolvo-posts-"));

  temporaryDirectories.push(directoryPath);

  for (const [fileName, fileContents] of Object.entries(files)) {
    fs.writeFileSync(path.join(directoryPath, fileName), fileContents);
  }

  return directoryPath;
}

afterEach(() => {
  for (const directoryPath of temporaryDirectories.splice(0)) {
    fs.rmSync(directoryPath, { recursive: true, force: true });
  }
});

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

  it("sorts posts with the same publication date by slug for stable ordering", () => {
    const directoryPath = createPostsDirectory({
      "beta-note.md": `---
title: Beta note
description: Second by slug
publishedAt: 2026-03-08
slug: beta-note
tags:
  - ordering
---

Body`,
      "alpha-note.md": `---
title: Alpha note
description: First by slug
publishedAt: 2026-03-08
slug: alpha-note
tags:
  - ordering
---

Body`,
    });

    expect(getAllPosts(directoryPath).map((post) => post.slug)).toEqual([
      "alpha-note",
      "beta-note",
    ]);
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

  it("fails when a required frontmatter field is missing", () => {
    const directoryPath = createPostsDirectory({
      "missing-title.md": `---
description: Missing a title
publishedAt: 2026-03-05
slug: missing-title
tags:
  - validation
---

Body`,
    });

    expect(() => getAllPosts(directoryPath)).toThrow(
      'Post "missing-title" is missing required frontmatter field "title".',
    );
  });

  it("fails when publishedAt is not a strict calendar date", () => {
    const directoryPath = createPostsDirectory({
      "invalid-date.md": `---
title: Invalid date
description: Uses the wrong date format
publishedAt: 2026/03/05
slug: invalid-date
tags:
  - validation
---

Body`,
    });

    expect(() => getAllPosts(directoryPath)).toThrow(
      'Post "invalid-date" has invalid publishedAt "2026/03/05". Expected YYYY-MM-DD.',
    );
  });

  it("fails when two posts resolve to the same slug", () => {
    const directoryPath = createPostsDirectory({
      "case-study.md": `---
title: Lowercase slug
description: First post
publishedAt: 2026-03-05
slug: case-study
tags:
  - validation
---

Body`,
      "Case-Study.md": `---
title: Uppercase slug
description: Second post
publishedAt: 2026-03-06
slug: Case-Study
tags:
  - validation
---

Body`,
    });

    expect(() => getAllPosts(directoryPath)).toThrow(
      'Posts "Case-Study" and "case-study" resolve to duplicate slug "case-study". Slugs must be unique.',
    );
  });
});
