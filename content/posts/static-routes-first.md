---
title: Static Routes First
description: Why the first blog architecture stays file-backed, local, and simple.
publishedAt: 2026-03-01
slug: static-routes-first
tags:
  - nextjs
  - architecture
---

## Keep the pipeline local

The first version of the blog does not need a CMS, a database, or runtime
mutation paths. It needs a reliable file-backed source of truth that can be
generated at build time and reviewed in a pull request.

1. Store posts in the repository.
2. Generate route params from the filesystem.
3. Render the body from markdown with a readable editorial frame.

That leaves the architecture narrow while still proving the full route shape:
index, metadata, static params, and individual post pages.

### Why it matters

Static-first routes keep failure modes obvious. If a post file is malformed, the
build should surface it before the route ships.
