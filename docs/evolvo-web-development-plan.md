# Evolvo Web Development Plan

## Goal

Build the first public-facing Evolvo website as a focused Next.js application with a strong homepage, a markdown-driven blog, and five initial posts authored in Evolvo's voice. The first useful release should communicate what Evolvo is, how it works, and why its output is trustworthy without drifting into vague brand language.

## Product Shape

- Home page
- Blog index
- Individual blog post pages
- Shared site navigation and footer

## Delivery Constraints

- Use Next.js with the App Router.
- Use Tailwind CSS for all styling.
- Do not use CSS modules.
- Do not use inline styles.
- Avoid custom CSS rules; if Next.js setup requires a global stylesheet for Tailwind import, keep it limited to Tailwind wiring only.
- Keep the initial version small, static-first, and easy to review.

## Site Direction

### Visual Identity

The site should feel disciplined, technical, and editorial rather than startup-marketing polished. Evolvo's identity is built on incremental improvement, review, and evidence, so the design should reflect precision instead of hype.

- Palette: graphite and near-black foundations, warm off-white surfaces, muted steel grays, and a single sharp accent in ember/orange for emphasis
- Typography: a strong grotesk or geometric sans for display copy paired with a readable mono or technical secondary face for metadata and labels
- Layout tone: structured grids, dense but readable spacing, sharp section hierarchy, and deliberate contrast
- Interaction feel: restrained, fast, and clear; no decorative animations that dilute the "working system" identity

### Voice And Messaging

Evolvo should sound exact, skeptical, and earned.

- Primary tone: clear, measured, technically literate
- Messaging posture: "show the work" instead of "trust the brand"
- Copy style: short claims backed by process, constraints, or concrete behavior
- Blog voice: first-person from Evolvo's perspective, reflective but operational

## Information Architecture

### Routes

- `/` home page
- `/blog` blog index
- `/blog/[slug]` individual markdown-driven blog posts

### Shared Navigation

- Primary nav: Home, Blog
- Footer: short site statement, GitHub link, and lightweight copyright/site metadata

## Homepage Plan

The homepage should explain Evolvo in one pass while still working as a showcase.

### Core Sections

1. Hero
   - One-line positioning statement
   - Short supporting paragraph
   - Primary CTA to the blog
   - Secondary CTA to the repository/GitHub presence
2. Operating Model
   - Explain inspect -> implement -> review -> accept/reject loop
   - Present this as the mechanism behind trust
3. Working Principles
   - Narrow scope
   - Evidence over claims
   - Safe, reviewable diffs
4. Recent Writing / Blog Preview
   - Surface the latest three posts from markdown content
5. Final Callout
   - Short summary of what Evolvo is building toward

## Blog Plan

### Content Architecture

- Store posts as markdown files with frontmatter
- Required frontmatter:
  - `title`
  - `description`
  - `publishedAt`
  - `slug`
  - `tags`
- Keep content local to the repository for the first version
- Parse markdown at build time and generate static blog routes

### Rendering Approach

- Use a small markdown pipeline with frontmatter parsing and safe HTML rendering
- Support headings, lists, blockquotes, code blocks, and links
- Keep the post template editorial and readable instead of overly app-like

### Blog UX

- Blog index with title, summary, date, and tag metadata
- Post page with strong reading width, clear typography, and back navigation
- Adjacent or related post links if this can be added without widening scope too much

## Initial Blog Post Set

The first five posts should introduce Evolvo through substance rather than announcement copy.

1. `what-evolvo-is`
   - Define the agent's role and boundaries
2. `why-small-safe-diffs-matter`
   - Explain the preference for incremental, reviewable changes
3. `how-evolvo-reviews-itself`
   - Describe acceptance, rejection, and validation behavior
4. `building-a-website-for-an-agent`
   - Reflect on the design and communication challenges of this project
5. `the-queue-is-the-product`
   - Explain why issue quality and sequencing matter to Evolvo

## Technical Plan

### Stack

- Next.js
- TypeScript
- Tailwind CSS
- Markdown parsing library for frontmatter and content rendering
- Optional utility packages only where directly justified by delivery

### Project Structure

Keep the first version simple and avoid premature package extraction.

- `app/`
  - route segments, layouts, and pages
- `components/`
  - reusable UI primitives and section components
- `content/posts/`
  - markdown blog posts
- `lib/`
  - pure local helpers for markdown loading and post metadata

### Styling Approach

- Tailwind utility classes in components and pages
- Reusable visual tokens expressed through Tailwind theme configuration where needed
- No CSS modules
- No inline styles
- No standalone authored CSS for component styling

### Build Expectations

The repository should support a clean first-run developer workflow.

- `dev` starts the Next.js app locally
- `build` produces a production build successfully
- `start` serves the production build
- `lint` checks the codebase

## Delivery Sequence

### Phase 1: Foundation

- Initialize the Next.js app with TypeScript and Tailwind
- Set up the App Router structure
- Confirm lint/build/dev/start behavior
- Establish the base layout shell and shared metadata

### Phase 2: Visual System And Shell

- Apply the chosen visual direction
- Implement reusable layout primitives
- Build header, footer, spacing system, and common typography treatment

### Phase 3: Homepage

- Build the home page sections
- Write Evolvo-authored homepage copy aligned with the chosen voice
- Add blog preview integration

### Phase 4: Markdown Blog

- Implement markdown loading helpers
- Add blog index and post routes
- Render post metadata and body content

### Phase 5: Initial Content And Polish

- Write and add the five initial blog posts
- Verify navigation between home and blog
- Tighten metadata, empty states, and reading experience

## Definition Of Done For The First Useful Version

- The site runs as a Next.js application
- Styling is done with Tailwind utilities and configuration rather than ad hoc CSS
- The home page communicates Evolvo clearly
- The blog is markdown-driven
- Five initial posts exist in the repository and render correctly
- Navigation between core routes is clear
- Local `dev`, `build`, `start`, and `lint` flows work

## Issue Breakdown

The project should be seeded with no more than five open follow-up issues so the queue stays bounded and actionable.

### GitHub Issue #1

**Title:** Bootstrap the Next.js and Tailwind foundation for evolvo-web

- Initialize a Next.js App Router project with TypeScript
- Configure Tailwind as the only styling system
- Add the base layout, metadata, and route skeleton for home and blog
- Ensure `dev`, `build`, `start`, and `lint` scripts work

### GitHub Issue #5

**Title:** Implement the shared site shell and visual system for Evolvo's web identity

- Translate the chosen palette, typography, spacing, and component treatment into reusable UI structure
- Build the header, footer, navigation, and shared page container patterns
- Keep styling fully inside Tailwind utilities/theme decisions

### GitHub Issue #3

**Title:** Build the evolvo-web homepage content and showcase layout

- Implement the homepage sections from this plan
- Write homepage copy in Evolvo's voice
- Include clear CTA paths into the blog and repository presence

### GitHub Issue #4

**Title:** Implement the markdown-driven blog architecture and routes

- Add local markdown content loading and frontmatter parsing
- Build the blog index and individual post pages
- Render post metadata, markdown content, and route generation cleanly

### GitHub Issue #2

**Title:** Write and publish the initial five Evolvo blog posts

- Create the five planned markdown posts
- Ensure each post has coherent frontmatter, summaries, and body content
- Verify the blog preview and blog index surface the content correctly

## Sequencing Notes

- GitHub Issue #1 should land before any other issue.
- GitHub Issue #5 should land before or alongside GitHub Issue #3 so the homepage is built on the real visual system.
- GitHub Issue #4 should land before GitHub Issue #2 because the content needs a rendering pipeline.
- GitHub Issue #2 is the final content pass for the first useful version.
