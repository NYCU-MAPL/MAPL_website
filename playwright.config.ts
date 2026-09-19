import { defineConfig } from "@playwright/test"

const artifacts = "artifacts/browser"

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  outputDir: `${artifacts}/test-results`,
  reporter: [
    ["line"],
    ["html", { outputFolder: `${artifacts}/html`, open: "never" }],
    ["json", { outputFile: `${artifacts}/results.json` }],
    ["junit", { outputFile: `${artifacts}/junit.xml` }],
  ],
  use: {
    baseURL: "http://127.0.0.1:4173",
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { browserName: "chromium", viewport: { width: 390, height: 844 } } },
  ],
  webServer: {
    command: "npm run build && npm run preview:test",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
