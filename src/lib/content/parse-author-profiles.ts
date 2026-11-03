import {
  arrayValue,
  fail,
  objectValue,
  parseId,
  parseUrl,
  requiredString,
  requiredInteger,
  strictKeys,
} from "./primitives.ts"
import type { AuthorProfile, Member, Publication } from "./types.ts"

// Ignore typography differences, but never infer identities from initials or surnames.
export const normalizeAuthorName = (name: string): string => name
  .normalize("NFKD")
  .replace(/\p{M}/gu, "")
  .toLowerCase()
  .replace(/[^\p{L}\p{N}]/gu, "")

export const parseAuthorProfiles = (
  input: unknown,
  members: readonly Member[],
  source: string,
  publications: readonly Publication[] = [],
): readonly AuthorProfile[] => {
  const memberIds = new Set(members.map(({ id }) => id))
  const publicationsById = new Map(publications.map((publication) => [publication.id, publication]))
  const names = new Set<string>()
  const occurrences = new Set<string>()
  return arrayValue(input, { source }).map((value, record) => {
    const context = { source, record }
    const object = objectValue(value, context)
    strictKeys(object, ["name", "aliases", "memberId", "website", "sourceUrl", "publications"], context)
    const name = requiredString(object, "name", context)
    const aliases = "aliases" in object ? arrayValue(object["aliases"], context).map((alias) => {
      if (typeof alias !== "string" || alias.trim().length === 0) {
        return fail(context, "aliases", "must contain non-empty names")
      }
      return alias.trim()
    }) : []
    const profileNames = new Set<string>()
    for (const label of [name, ...aliases]) {
      const key = normalizeAuthorName(label)
      if (key.length === 0 || profileNames.has(key)) fail(context, "name", `has an empty or duplicate author identity: ${label}`)
      profileNames.add(key)
    }
    const scopedPublications = "publications" in object ? arrayValue(object["publications"], context).map((value) => {
      const scope = objectValue(value, context, "publications")
      strictKeys(scope, ["id", "authorIndex"], context)
      const id = parseId(scope, context)
      const authorIndex = requiredInteger(scope, "authorIndex", context)
      const publication = publicationsById.get(id)
      if (publication === undefined) return fail(context, "publications", `unknown publication: ${id}`)
      const author = publication.authors[authorIndex]
      if (authorIndex < 0 || author === undefined || !profileNames.has(normalizeAuthorName(author))) {
        return fail(context, "publications", `authorIndex does not match this author in ${id}`)
      }
      const key = `${id}:${authorIndex}`
      if (occurrences.has(key)) fail(context, "publications", `duplicate author binding: ${key}`)
      occurrences.add(key)
      return { id, authorIndex }
    }) : undefined
    if (scopedPublications?.length === 0) fail(context, "publications", "must contain at least one author occurrence")
    if (scopedPublications === undefined) {
      for (const key of profileNames) {
        if (names.has(key)) fail(context, "name", `duplicate author identity: ${name}`)
        names.add(key)
      }
    }
    const memberId = "memberId" in object ? parseId({ id: object["memberId"] }, context) : undefined
    const website = parseUrl(object, "website", context)
    const sourceUrl = parseUrl(object, "sourceUrl", context)
    if ((memberId === undefined) === (website === undefined)) {
      fail(context, "website", "must provide either a memberId or an external website")
    }
    if (memberId !== undefined && !memberIds.has(memberId)) fail(context, "memberId", "does not reference a member")
    if (website !== undefined && sourceUrl === undefined) fail(context, "sourceUrl", "is required for an external website")
    return {
      name,
      aliases,
      ...(memberId === undefined ? {} : { memberId }),
      ...(website === undefined ? {} : { website }),
      ...(sourceUrl === undefined ? {} : { sourceUrl }),
      ...(scopedPublications === undefined ? {} : { publications: scopedPublications }),
    }
  })
}
