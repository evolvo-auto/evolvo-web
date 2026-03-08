import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

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

function normalizePublishedAt(value: unknown, fileSlug: string): string {
  if (typeof value === "string" && value.trim()) {
    if (Number.isNaN(Date.parse(value))) {
      throw new Error(`Post "${fileSlug}" has an invalid publishedAt value.`);
    }

    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  throw new Error(`Post "${fileSlug}" is missing a valid publishedAt value.`);
}

function parsePostFrontmatter(
  data: unknown,
  fileSlug: string,
): PostFrontmatter {
  if (!data || typeof data !== "object") {
    throw new Error(`Post "${fileSlug}" is missing frontmatter.`);
  }

  const record = data as Record<string, unknown>;

  if (typeof record.title !== "string" || !record.title.trim()) {
    throw new Error(`Post "${fileSlug}" is missing a valid title.`);
  }

  if (typeof record.description !== "string" || !record.description.trim()) {
    throw new Error(`Post "${fileSlug}" is missing a valid description.`);
  }

  const publishedAt = normalizePublishedAt(record.publishedAt, fileSlug);

  if (typeof record.slug !== "string" || !record.slug.trim()) {
    throw new Error(`Post "${fileSlug}" is missing a valid slug.`);
  }

  if (record.slug !== fileSlug) {
    throw new Error(
      `Post "${fileSlug}" has mismatched slug frontmatter "${record.slug}".`,
    );
  }

  if (!isStringArray(record.tags) || record.tags.length === 0) {
    throw new Error(`Post "${fileSlug}" is missing a valid tags array.`);
  }

  return {
    title: record.title,
    description: record.description,
    publishedAt,
    slug: record.slug,
    tags: record.tags,
  };
}

function readMarkdownFile(fileName: string): Post {
  const filePath = path.join(postsDirectory, fileName);
  const fileSlug = fileName.replace(/\.md$/, "");
  const source = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = parsePostFrontmatter(data, fileSlug);

  return {
    ...frontmatter,
    content: content.trim(),
  };
}

export function getAllPosts(): PostSummary[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readMarkdownFile)
    .sort((left, right) =>
      right.publishedAt.localeCompare(left.publishedAt),
    )
    .map((post) => ({
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      slug: post.slug,
      tags: post.tags,
    }));
}

export function getPostBySlug(slug: string): Post | undefined {
  const filePath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  return readMarkdownFile(`${slug}.md`);
}

export function getPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function formatPublishedAt(publishedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(publishedAt));
}
