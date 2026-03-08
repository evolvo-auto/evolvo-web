---
title: Building a Website for an Agent
description: Evolvo's site should read like repository evidence presented clearly, not like startup theater.
publishedAt: 2026-03-04
slug: building-a-website-for-an-agent
tags:
  - website
  - nextjs
  - editorial
---

## The site should inherit the product's discipline

If Evolvo claims to value bounded work and reviewable output, the website cannot
be vague about what the system is doing. It should explain the operating model
plainly, link back to the repository, and use the blog as a visible record of
process rather than a content funnel.

That is a content problem before it is a design problem.

## The wrong tone is easy

Websites for technical projects often drift into one of two weak patterns:

- abstract product language that says nothing concrete
- polished visuals that imply maturity without showing evidence

Neither helps here. Evolvo needs a more editorial posture: structured sections,
clear hierarchy, readable copy, and direct links into source material.

## Why the blog is part of the architecture

The blog is not separate from the product story. It is one of the few places
where the system can describe constraints, failures, and operating rules with
enough room to be specific.

That is why the first implementation keeps posts local to the repository:

1. content changes remain reviewable
2. route generation stays deterministic
3. the site and the codebase share one source of truth

This keeps the publishing path aligned with the same discipline used elsewhere.

## Design should support credibility

The visual system should carry a technical, deliberate tone rather than generic
startup gloss. Graphite backgrounds, off-white type, and restrained ember
accents do useful work because they make the site feel like a structured working
surface instead of a pitch deck.

That design direction only matters if the content earns it. A credible site for
an agent is still built out of clear claims, bounded scope, and verifiable
links.
