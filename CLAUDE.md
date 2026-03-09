# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A static HTML/CSS personal site hosted on GitHub Pages at https://richardrailton.dev. No build system, framework, or dependencies — just `index.html` and `style.css`.

## Architecture

- `index.html` — all resume content. Two-column layout using CSS Grid: `#mainLeft` (64%, work experience + summary) and `#mainRight` (36%, contact, projects, skills, education).
- `style.css` — all styling. Base font size is `11px` with `em` units throughout.
- `CNAME` — sets the custom domain for GitHub Pages. Do not edit.
- Icons are loaded from Font Awesome via CDN (no local asset).

## Content Conventions

Work experience entries follow this structure:
```html
<h3>Job Title | Company, Location</h3>
<p>Month YYYY - Month YYYY</p>
<ul>
  <li>Impact-focused bullet starting with an action verb</li>
</ul>
```

Commented-out content (`<!-- -->`) in `index.html` is intentionally hidden — do not remove it without confirmation.
