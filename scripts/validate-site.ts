import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { pathToFileURL } from "node:url"

import { auditSiteManifest, parseSiteAuditFixture, SiteAuditInputError } from "./site-audit/audit.ts"
import { buildProductionManifest } from "./site-audit/production-manifest.ts"
import type { SiteAuditReport } from "./site-audit/types.ts"

const root = resolve(import.meta.dirname, "..")
const argument = (name: string): string | undefined => {
  const index = process.argv.indexOf(name)
  return index === -1 ? undefined : process.argv[index + 1]
}
const output = resolve(root, argument("--output") ?? "artifacts/static/site-audit.json")
const fixture = argument("--fixture")
const publicRoot = resolve(root, argument("--public-root") ?? "public")

const run = async (): Promise<SiteAuditReport> => {
  const manifest = fixture === undefined
    ? await buildProductionManifest(pathToFileURL(`${root}/`))
    : parseSiteAuditFixture(JSON.parse(await readFile(resolve(root, fixture), "utf8")), fixture)
  return auditSiteManifest(manifest, publicRoot)
}

try {
  const report = await run()
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8")
  console.log(JSON.stringify(report, null, 2))
  if (report.violations.length > 0) process.exitCode = 1
} catch (error) {
  if (error instanceof SiteAuditInputError || error instanceof SyntaxError) {
    console.error(error.message)
    process.exitCode = 1
  } else {
    throw error
  }
}
