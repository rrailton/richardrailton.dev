# richardrailton.dev

Personal site of Richard Railton, hosted on GitHub Pages.

**Live site:** [richardrailton.dev](https://richardrailton.dev)

## Tech Stack

- [Astro](https://astro.build/) static site generator
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Chart.js](https://www.chartjs.org/) for the skills radar chart
- [TypeScript](https://www.typescriptlang.org/)
- GitHub Pages hosting with custom domain
- GitHub Actions for CI/CD (`.github/workflows/deploy.yml`)

## Structure

```
src/
├── components/   # Astro components (Hero, Timeline, Projects, etc.)
├── data/         # Site content and configuration
├── layouts/      # Base page layout
├── lib/          # Utility functions
├── pages/        # Routes (index, resume, project detail pages)
└── styles/       # Global CSS
```

## Local Development

```bash
npm install
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
```
