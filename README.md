# MAPL Website

The MAPL website is a Vue 3 and Vite static site with five hash-routed pages: Home, About, Publications, Teaching, and Join Us.

## Local setup

Use a Node.js version matching `^20.19.0 || >=22.12.0`.

```sh
npm ci
npm run browser:install
```

`npm ci` installs the lockfile-pinned dependencies. The second command installs the pinned Playwright Chromium build and is required once per Playwright cache.

## Quality assurance

Run all deterministic static and content checks with:

```sh
npm run qa:static
```

This command runs linting, Vue and Node TypeScript checks, every Node contract test, content validation, the route/link/media site audit, the production build, built-asset verification, and Node-engine verification. It exits nonzero if any step fails and writes machine-readable output to:

- `artifacts/static/results.json`
- `artifacts/static/content-validation.json`
- `artifacts/static/site-audit.json`
- `artifacts/static/*.log`

Run the desktop and mobile browser smoke suites with:

```sh
npm run qa:browser
```

Playwright builds the site, starts and stops a Vite preview server automatically, and does not require a manually running server. The tests use Chromium at 1440x900 and 390x844, do not navigate to third-party destinations, and write retained output to:

- `artifacts/browser/results.json`
- `artifacts/browser/junit.xml`
- `artifacts/browser/html/`
- `artifacts/browser/screenshots/`
- `artifacts/browser/test-results/` for failure screenshots and traces

The generated `artifacts/` and `dist/` directories are ignored by Git.
