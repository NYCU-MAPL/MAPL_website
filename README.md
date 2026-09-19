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

## Continuous integration

The `CI` workflow runs for pull requests and pushes to `main`. It uses the lockfile through `npm ci`, installs the lockfile-pinned Playwright Chromium build with its Linux dependencies, then runs `npm run qa:static` and `npm run qa:browser`. Static and browser reports are uploaded even when a QA command fails; a final workflow step preserves the failed status.

Workflow policy can be audited locally with:

```sh
npm run qa:workflows
```

This checks triggers, immutable action pins, permissions, concurrency, deployment gates, the exact publication scope, and the relative-base/`.nojekyll` contract. A local bare-repository simulation builds the site, performs two normal history-preserving publications, and compares every published path and SHA-256 digest with `dist/`:

```sh
npm run deploy:dry-run
```

The simulation writes `artifacts/deployment/publish-tree.json` and never contacts or modifies the GitHub remote.

## GitHub Pages deployment

`Deploy gh-pages` is triggered only by completion of the named `CI` workflow. Its read-only validation job additionally requires a successful `push` run from this repository on `main`, checks out `workflow_run.head_sha`, and repeats static and browser QA before uploading only `dist/` as a short-lived artifact. A separate write-only job downloads that artifact, rejects symlinks and forbidden paths, confirms the validated SHA is still the remote `main` tip immediately before publication, and updates `gh-pages` with a normal fast-forward push. The write-capable job never checks out or executes repository code. Pull requests, fork runs, failed checks, stale main revisions, and manual refs have no publication path.

An administrator must configure the repository after the first successful publication:

1. In **Settings > Pages > Build and deployment**, choose **Deploy from a branch**.
2. Select the `gh-pages` branch and `/ (root)` folder, then save.
3. In **Settings > Actions > General**, allow GitHub Actions and permit the workflow `GITHUB_TOKEN` to write repository contents. The CI workflow remains explicitly read-only; only the deployment job requests `contents: write`.
4. Keep branch protection and required checks on `main`; do not configure Pages to publish from `main` or from the repository root.

The current authenticated account has repository write access but not administration access, and the Pages API currently reports no configured Pages site. These settings are therefore documented requirements, not changes claimed by this commit.

Vite uses `base: './'`, the application uses hash history, and `public/.nojekyll` is copied into every build. Relative assets therefore work both from a repository Pages URL such as `https://nycu-mapl.github.io/MAPL_website/` and when the same `dist/` tree is served at the existing `/content/` path without rewrite rules.

GitHub Pages does not automatically replace the existing `https://mapl.cs.nycu.edu.tw/content/` hosting. The maintainers can keep that server mapped to a separately copied `dist/`, redirect `/content/` to the repository Pages URL, or migrate the domain to Pages. A custom-domain migration requires verified DNS and repository Pages administration. Before enabling one, add its verified `CNAME` as `public/CNAME`; otherwise the exact-`dist/` publisher will correctly remove a UI-created branch-only `CNAME` on its next deployment.
