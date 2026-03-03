# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal blog/portfolio site built with **Next.js 14**, **Markdoc**, **Tailwind CSS**, and **TypeScript**. Blog posts are Markdown files with YAML frontmatter stored in `pages/posts/`.

## Development Environment

All `node`/`npm` commands must run inside the dev container. Use `make devup` to start it. To run commands in the container: `docker compose -f dev/docker-compose.yml exec web <command>`.

## Commands

- **Dev server**: `make devup` (Docker, port 3000)
- **Production**: `make prod` (Docker, port 3125)
- **Lint**: `npm run lint` (Prettier check) / `npm run lint:fix` (Prettier write) — run in container
- **New post**: `make post` (interactive script at `bin/new-post`)
- **Bundle zips**: `npm run bundleZips` (requires `.env.local` with `GH_TOKEN`) — run in container

No test suite is configured.

## Architecture

### Content System

Posts are Markdown files in `pages/posts/` named `YYYY-MM-DD-slug.md` with YAML frontmatter (`layout`, `title`, `date`, `tags`, `excerpt`, `thumbnail`, `tocMinLevel`/`tocMaxLevel`). At build time, `util/getPosts.ts` globs all `.md` files, parses frontmatter with `gray-matter`, extracts thumbnails and excerpts, and sorts by date.

RSS/Atom/JSON feeds are generated at build time in `pages/index.tsx` and written to `public/`.

### Markdoc Integration

Custom Markdoc tags in `markdoc/tags/` provide embeddable components (audio, video, youtube, bandcamp, iframe, strava, captioned-image). Custom node overrides in `markdoc/nodes/`. Next.js config extends page extensions to include `.md` and `.mdoc`.

### Layout System

Pages use a `getLayout` pattern (per-page layouts). Three layouts in `layouts/`:
- **SiteLayout** — root wrapper with header, nav, responsive grid
- **PostLayout** — article pages with title, date, tags, Giscus comments
- **BasicLayout** — generic pages with optional table of contents

The `layout` frontmatter field controls which layout a Markdoc page uses.

### Styling

Tailwind CSS with class-based dark mode. Theme colors defined as CSS custom properties in `styles/globals.css`. Fonts: IBM Plex Sans (body), Noto Serif (headers). Prettier config includes `prettier-plugin-tailwindcss` for class sorting.

### Key Directories

- `components/` — React components (mix of `.jsx` and `.tsx`)
- `layouts/` — page layout wrappers
- `markdoc/` — custom Markdoc tags and node overrides
- `util/` — build-time utilities (post parsing, RSS generation, heading extraction)
- `data/` — YAML data files (songs, music tools)
- `public/` — static assets and generated feeds

## Code Style

- Prettier with: no semicolons, single quotes, trailing commas (ES5), 2-space tabs
- Commit messages: present tense, imperative mood, 72-char subject line limit
