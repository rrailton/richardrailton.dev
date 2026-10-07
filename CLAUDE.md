# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio site built with **Astro + Tailwind CSS**, hosted on GitHub Pages at https://richardrailton.dev. Outputs static HTML — no server-side runtime in production.

## Architecture

- `src/pages/` — Astro page routes (`index.astro`, `resume.astro`, `projects/[slug].astro`)
- `src/components/` — Astro components (Hero, About, Timeline, Projects, Contact, etc.)
- `src/data/content.ts` — centralised content data
- `src/layouts/BaseLayout.astro` — shared page layout
- `src/styles/global.css` — global styles and Tailwind 4 setup (`@import "tailwindcss"`, `@theme` fonts, class-based `dark` variant, typography plugin). There is no `tailwind.config` file.
- `src/lib/utils.ts` — utility functions
- `astro.config.mjs` — Astro config with MDX and sitemap integrations; Tailwind 4 is wired in via the `@tailwindcss/vite` plugin
- `CNAME` — sets the custom domain for GitHub Pages. Do not edit.

### Legacy files

- `index.html` / `style.css` — original static resume, kept for reference
- `_old/` — archived content

## Build & Dev

- `npm run dev` — start Astro dev server
- `npm run build` — build static output to `dist/`
- `npm run preview` — preview the built site

## Visual regression check

`npm run visual-diff` builds `origin/main` and the working tree, screenshots every page of both in headless Chromium (light and dark, 1280 and 390 wide), and reports pixel differences. Pass another baseline with `npm run visual-diff -- <ref>`. Images and diff masks land in `.visual-diff/` (gitignored). Run it before pushing dependency upgrades or styling changes.

- Needs the Playwright browser once per machine: `npx playwright install chromium`. The `playwright` version is pinned; bumping it means re-running that install.
- Both builds use the local `src/data/contributions.json`, fetched via `gh` if missing, so the contributions grid is compared too.
- CI installs the `playwright` package but never downloads or runs the browser.

## Content Conventions

Commented-out content (`<!-- -->`) in source files is intentionally hidden — do not remove it without confirmation.

## CI / GitHub Actions

The deploy workflow (`.github/workflows/deploy.yml`) runs on every push to `main`, on a daily schedule, and can be triggered manually. Current action versions (all Node 24-compatible):

- `actions/checkout@v6`
- `actions/setup-node@v6`
- `actions/upload-pages-artifact@v5`
- `actions/deploy-pages@v5`

When upgrading actions, prefer the latest major version that targets Node 24+.

## npm Security

- `.npmrc` has `ignore-scripts=true` — blocks postinstall attacks. If a new dependency needs lifecycle scripts, add it to an allowlist rather than disabling this setting.
- Dependencies are pinned to exact versions in `package.json` (no `^` or `~`). When upgrading, update both `package.json` and run `npm install` to update the lockfile.
- CI runs `npm audit --audit-level=high` — the build fails on high/critical vulnerabilities.
- CI runs `npm rebuild sharp` after install since ignore-scripts prevents sharp's postinstall from running.
