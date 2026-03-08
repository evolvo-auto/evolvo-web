import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");
const publishedAtPattern = /^\d{4}-\d{2}-\d{2}$/;

type PostFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  slug: string;
  tags: string[];
};

export type PostSummary = PostFrontmatter;

export type Post = PostSummary & {
  content: string;
};

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function readRequiredString(
  record: Record<string, unknown>,
  field: "title" | "description" | "slug",
  fileSlug: string,
): string {
  const value = record[field];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(
      `Post "${fileSlug}" is missing required frontmatter field "${field}".`,
    );
  }

  return value.trim();
}

function normalizePublishedAt(value: unknown, fileSlug: string): string {
  if (typeof value === "string" && value.trim()) {
    const normalizedValue = value.trim();

    if (!publishedAtPattern.test(normalizedValue)) {
      throw new Error(
        `Post "${fileSlug}" has invalid publishedAt "${normalizedValue}". Expected YYYY-MM-DD.`,
      );
    }

    const parsed = new Date(`${normalizedValue}T00:00:00.000Z`);

    if (
      Number.isNaN(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== normalizedValue
    ) {
      throw new Error(
        `Post "${fileSlug}" has invalid publishedAt "${normalizedValue}". Expected a real calendar date in YYYY-MM-DD format.`,
      );
    }

    return normalizedValue;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error(
    `Post "${fileSlug}" is missing required frontmatter field "publishedAt".`,
  );
}

function parsePostFrontmatter(
  data: unknown,
  fileSlug: string,
): PostFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error(`Post "${fileSlug}" is missing frontmatter.`);
  }

  const record = data as Record<string, unknown>;
  const title = readRequiredString(record, "title", fileSlug);
  const description = readRequiredString(record, "description", fileSlug);

  const publishedAt = normalizePublishedAt(record.publishedAt, fileSlug);
  const slug = readRequiredString(record, "slug", fileSlug);

  if (slug !== fileSlug) {
    throw new Error(
      `Post "${fileSlug}" has mismatched slug frontmatter "${slug}". Expected "${fileSlug}".`,
    );
  }

  if (record.tags === undefined) {
    throw new Error(
      `Post "${fileSlug}" is missing required frontmatter field "tags".`,
    );
  }

  if (!isStringArray(record.tags) || record.tags.length === 0) {
    throw new Error(
      `Post "${fileSlug}" must provide a non-empty "tags" array.`,
    );
  }

  return {
    title,
    description,
    publishedAt,
    slug,
    tags: record.tags,
  };
}

function readMarkdownFile(filePath: string): Post {
  const fileSlug = path.basename(filePath).replace(/\.md$/, "");
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = parsePostFrontmatter(data, fileSlug);

  return {
    ...frontmatter,
    content: content.trim(),
  };
}

function assertUniqueSlugs(posts: PostSummary[]) {
  const slugs = new Map<string, string>();

  for (const post of posts) {
    const normalizedSlug = post.slug.toLowerCase();
    const existingPostSlug = slugs.get(normalizedSlug);

    if (existingPostSlug) {
      throw new Error(
        `Posts "${existingPostSlug}" and "${post.slug}" resolve to duplicate slug "${normalizedSlug}". Slugs must be unique.`,
      );
    }

    slugs.set(normalizedSlug, post.slug);
  }
}

export function getAllPosts(directoryPath = postsDirectory): PostSummary[] {
  const posts = fs
    .readdirSync(directoryPath)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => readMarkdownFile(path.join(directoryPath, fileName)))
    .sort(
      (left, right) =>
        right.publishedAt.localeCompare(left.publishedAt) ||
        left.slug.localeCompare(right.slug),
    )
    .map((post) => ({
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      slug: post.slug,
      tags: post.tags,
    }));

  assertUniqueSlugs(posts);

  return posts;
}

export function getPostBySlug(
  slug: string,
  directoryPath = postsDirectory,
): Post | undefined {
  const filePath = path.join(directoryPath, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return readMarkdownFile(filePath);
}

export function getPostSlugs(directoryPath = postsDirectory): string[] {
  return getAllPosts(directoryPath).map((post) => post.slug);
}

export function formatPublishedAt(publishedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}
