import { stat } from "node:fs/promises"
import { resolve } from "node:path"

import {
  SITE_ENTRY_KINDS,
  type SiteAuditReport,
  type SiteAuditViolation,
  type SiteEntryKind,
  type SiteManifest,
  type SiteManifestEntry,
} from "./types.ts"

export class SiteAuditInputError extends Error {
  readonly source: string

  constructor(source: string, detail: string) {
    super(`${source}: ${detail}`)
    this.name = "SiteAuditInputError"
    this.source = source
  }
}

const isObject = (value: unknown): value is Readonly<Record<string, unknown>> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const isEntryKind = (value: string): value is SiteEntryKind =>
  SITE_ENTRY_KINDS.some((kind) => kind === value)

const parseEntry = (value: unknown, source: string, index: number): SiteManifestEntry => {
  if (!isObject(value)) throw new SiteAuditInputError(source, `entries[${index}] must be an object`)
  const kind = value["kind"]
  const entrySource = value["source"]
  const entryValue = value["value"]
  if (typeof kind !== "string" || !isEntryKind(kind)) {
    throw new SiteAuditInputError(source, `entries[${index}].kind is unsupported`)
  }
  if (typeof entrySource !== "string" || entrySource.length === 0) {
    throw new SiteAuditInputError(source, `entries[${index}].source must be a non-empty string`)
  }
  if (typeof entryValue !== "string") {
    throw new SiteAuditInputError(source, `entries[${index}].value must be a string`)
  }
  return { kind, source: entrySource, value: entryValue }
}

export const parseSiteAuditFixture = (value: unknown, source: string): SiteManifest => {
  if (!isObject(value)) throw new SiteAuditInputError(source, "manifest must be an object")
  const routes = value["routes"]
  const entries = value["entries"]
  if (!Array.isArray(routes) || !routes.every((route) => typeof route === "string")) {
    throw new SiteAuditInputError(source, "routes must contain only strings")
  }
  if (!Array.isArray(entries)) throw new SiteAuditInputError(source, "entries must be an array")
  return {
    routes,
    entries: entries.map((entry, index) => parseEntry(entry, source, index)),
  }
}

const externalLinkViolation = (entry: SiteManifestEntry): SiteAuditViolation | undefined => {
  if (entry.value.trim().length === 0) {
    return { rule: "empty-external-link", source: entry.source, value: entry.value, detail: "external link must not be empty" }
  }
  try {
    const url = new URL(entry.value)
    const validHttps = url.protocol === "https:" && url.hostname.length > 0
    const validMail = url.protocol === "mailto:" && url.pathname.includes("@")
    if (validHttps || validMail) return undefined
  } catch (error) {
    if (!(error instanceof TypeError)) throw error
  }
  return {
    rule: "invalid-external-link",
    source: entry.source,
    value: entry.value,
    detail: "external link must be an absolute HTTPS or mailto URL",
  }
}

const assetViolation = async (
  entry: SiteManifestEntry,
  publicRoot: string,
): Promise<SiteAuditViolation | undefined> => {
  if (entry.value.startsWith("/")) {
    return {
      rule: "root-absolute-local-path",
      source: entry.source,
      value: entry.value,
      detail: "local paths must be relative to the deployment base",
    }
  }
  try {
    const info = await stat(resolve(publicRoot, entry.value))
    if (info.isFile()) return undefined
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error
  }
  return {
    rule: "missing-local-asset",
    source: entry.source,
    value: entry.value,
    detail: "local asset does not exist under public/",
  }
}

export const auditSiteManifest = async (
  manifest: SiteManifest,
  publicRoot: string,
): Promise<SiteAuditReport> => {
  const routes = new Set(manifest.routes)
  const violations: SiteAuditViolation[] = []
  for (const entry of manifest.entries) {
    if (entry.kind === "internal-route" && !routes.has(entry.value)) {
      violations.push({
        rule: "unknown-internal-route",
        source: entry.source,
        value: entry.value,
        detail: "internal route is not declared by the application",
      })
    }
    if (entry.kind === "local-asset") {
      const violation = await assetViolation(entry, publicRoot)
      if (violation !== undefined) violations.push(violation)
    }
    if (entry.kind === "external-link") {
      const violation = externalLinkViolation(entry)
      if (violation !== undefined) violations.push(violation)
    }
  }
  const sorted = violations.toSorted((left, right) =>
    left.rule.localeCompare(right.rule) || left.source.localeCompare(right.source),
  )
  return {
    summary: { entries: manifest.entries.length, routes: manifest.routes.length, violations: sorted.length },
    violations: sorted,
  }
}
