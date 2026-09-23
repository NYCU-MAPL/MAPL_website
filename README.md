# MAPL Website

The MAPL website is a Vue 3 and Vite static site with five hash-routed pages: Home, About, Publications, Teaching, and Join Us.

## Local development

Use a Node.js version matching `^20.19.0 || >=22.12.0`.

```sh
npm ci
npm run dev
```

Build and preview the production site locally with:

```sh
npm run build
npm run preview
```

Check Vue and Node TypeScript configuration with:

```sh
npm run check
```

Validate the site's content data with:

```sh
npm run validate:content
```

## GitHub Pages deployment

The `Deploy gh-pages` workflow runs on pushes to `main`. It installs the lockfile-pinned dependencies, builds the site, verifies `dist/.nojekyll`, and publishes the complete `dist/` tree to the `gh-pages` branch. The workflow publishes directly and does not require a separate CI workflow or local deployment simulation.

The repository must be configured in **Settings > Pages > Build and deployment** to deploy from the `gh-pages` branch and the `/ (root)` folder. Vite uses `base: './'`, the application uses hash history, and `public/.nojekyll` is copied into every build so the generated site works from the repository Pages URL and the existing `/content/` path.
