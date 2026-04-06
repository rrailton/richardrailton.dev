# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio site built with **Astro + Tailwind CSS**, hosted on GitHub Pages at https://richardrailton.dev. Outputs static HTML — no server-side runtime in production.

## Architecture

- `src/pages/` — Astro page routes (`index.astro`, `resume.astro`, `projects/[slug].astro`)
- `src/components/` — Astro components (Hero, About, Timeline, Projects, Contact, etc.)
- `src/data/content.ts` — centralised content data
- `src/layouts/BaseLayout.astro` — shared page layout
- `src/styles/global.css` — global styles
- `src/lib/utils.ts` — utility functions
- `astro.config.mjs` — Astro config with MDX, sitemap, and Tailwind integrations
- `tailwind.config.mjs` — Tailwind configuration
- `CNAME` — sets the custom domain for GitHub Pages. Do not edit.

### Legacy files

- `index.html` / `style.css` — original static resume, kept for reference
- `_old/` — archived content

## Build & Dev

- `npm run dev` — start Astro dev server
- `npm run build` — build static output to `dist/`
- `npm run preview` — preview the built site

## Content Conventions

Commented-out content (`<!-- -->`) in source files is intentionally hidden — do not remove it without confirmation.
