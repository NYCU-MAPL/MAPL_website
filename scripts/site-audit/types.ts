export const SITE_ENTRY_KINDS = ["internal-route", "local-asset", "external-link"] as const

export type SiteEntryKind = (typeof SITE_ENTRY_KINDS)[number]

export type SiteManifestEntry = {
  readonly kind: SiteEntryKind
  readonly source: string
  readonly value: string
}

export type SiteManifest = {
  readonly routes: readonly string[]
  readonly entries: readonly SiteManifestEntry[]
}

export const SITE_AUDIT_RULES = [
  "empty-external-link",
  "invalid-external-link",
  "missing-local-asset",
  "root-absolute-local-path",
  "unknown-internal-route",
] as const

export type SiteAuditRule = (typeof SITE_AUDIT_RULES)[number]

export type SiteAuditViolation = {
  readonly rule: SiteAuditRule
  readonly source: string
  readonly value: string
  readonly detail: string
}

export type SiteAuditReport = {
  readonly summary: {
    readonly entries: number
    readonly routes: number
    readonly violations: number
  }
  readonly violations: readonly SiteAuditViolation[]
}
