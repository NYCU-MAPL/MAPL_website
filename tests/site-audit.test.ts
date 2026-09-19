import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { auditSiteManifest, parseSiteAuditFixture } from "../scripts/site-audit/audit.ts"
import { buildProductionManifest } from "../scripts/site-audit/production-manifest.ts"
import type { SiteManifest } from "../scripts/site-audit/types.ts"

const readFixture = async (name: string): Promise<SiteManifest> => {
  const source = `tests/fixtures/${name}`
  return parseSiteAuditFixture(
    JSON.parse(await readFile(new URL(`./fixtures/${name}`, import.meta.url), "utf8")),
    source,
  )
}

test("reports precise violations when route, asset, path, and external-link fixtures are broken", async () => {
  // Given
  const publicRoot = await mkdtemp(join(tmpdir(), "mapl-site-audit-"))
  try {
    const fixture = await readFixture("site-audit-broken.json")

    // When
    const report = await auditSiteManifest(fixture, publicRoot)

    // Then
    assert.deepEqual(report.violations, [
      {
        rule: "empty-external-link",
        source: "tests/fixtures/site-audit-broken.json:entries[3].value",
        value: "",
        detail: "external link must not be empty",
      },
      {
        rule: "invalid-external-link",
        source: "tests/fixtures/site-audit-broken.json:entries[4].value",
        value: "not-a-url",
        detail: "external link must be an absolute HTTPS or mailto URL",
      },
      {
        rule: "missing-local-asset",
        source: "tests/fixtures/site-audit-broken.json:entries[1].value",
        value: "media/publications/missing.png",
        detail: "local asset does not exist under public/",
      },
      {
        rule: "root-absolute-local-path",
        source: "tests/fixtures/site-audit-broken.json:entries[2].value",
        value: "/media/news/root-absolute.png",
        detail: "local paths must be relative to the deployment base",
      },
      {
        rule: "unknown-internal-route",
        source: "tests/fixtures/site-audit-broken.json:entries[0].value",
        value: "#/missing",
        detail: "internal route is not declared by the application",
      },
    ])
  } finally {
    await rm(publicRoot, { recursive: true })
  }
})

test("names the missing media value and source file when an asset fixture is broken", async () => {
  // Given
  const publicRoot = await mkdtemp(join(tmpdir(), "mapl-site-audit-"))
  try {
    const fixture = await readFixture("site-audit-broken-asset.json")

    // When
    const report = await auditSiteManifest(fixture, publicRoot)

    // Then
    assert.deepEqual(report.violations, [{
      rule: "missing-local-asset",
      source: "tests/fixtures/site-audit-broken-asset.json:entries[0].value",
      value: "media/publications/does-not-exist.png",
      detail: "local asset does not exist under public/",
    }])
  } finally {
    await rm(publicRoot, { recursive: true })
  }
})

test("names the hash value and source file when an internal-route fixture is broken", async () => {
  // Given
  const fixture = await readFixture("site-audit-broken-route.json")

  // When
  const report = await auditSiteManifest(fixture, new URL("../public", import.meta.url).pathname)

  // Then
  assert.deepEqual(report.violations, [{
    rule: "unknown-internal-route",
    source: "tests/fixtures/site-audit-broken-route.json:entries[0].value",
    value: "#/not-a-route",
    detail: "internal route is not declared by the application",
  }])
})

test("accepts declared routes, valid links, and existing relative assets", async () => {
  // Given
  const publicRoot = await mkdtemp(join(tmpdir(), "mapl-site-audit-"))
  try {
    await mkdir(join(publicRoot, "media", "news"), { recursive: true })
    await writeFile(join(publicRoot, "media", "news", "valid.png"), "fixture")
    const fixture = parseSiteAuditFixture({
      routes: ["#/", "#/about"],
      entries: [
        { kind: "internal-route", source: "valid.route", value: "#/about" },
        { kind: "local-asset", source: "valid.asset", value: "media/news/valid.png" },
        { kind: "external-link", source: "valid.web", value: "https://example.com/path" },
        { kind: "external-link", source: "valid.mail", value: "mailto:lab@example.com" },
      ],
    }, "valid-manifest.json")

    // When
    const report = await auditSiteManifest(fixture, publicRoot)

    // Then
    assert.deepEqual(report.violations, [])
    assert.deepEqual(report.summary, { entries: 4, routes: 2, violations: 0 })
  } finally {
    await rm(publicRoot, { recursive: true })
  }
})

test("audits the production route, link, and asset manifest without violations", async () => {
  // Given
  const root = new URL("..", import.meta.url)
  const manifest = await buildProductionManifest(root)

  // When
  const report = await auditSiteManifest(manifest, new URL("../public", import.meta.url).pathname)

  // Then
  assert.deepEqual(report.violations, [])
  assert.equal(report.summary.routes, 5)
  assert.ok(report.summary.entries > 50)
})
