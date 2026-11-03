import profilesJson from "../../data/author-profiles.json" with { type: "json" }
import { members, publications } from "../../lib/content/loaders.ts"
import { normalizeAuthorName, parseAuthorProfiles } from "../../lib/content/parse-author-profiles.ts"
import type { AuthorProfile, Member } from "../../lib/content/types.ts"

export const createAuthorLinkResolver = (
  people: readonly Member[],
  profiles: readonly AuthorProfile[],
): ((name: string, occurrence?: { readonly id: string; readonly authorIndex: number }) => string | undefined) => {
  const peopleById = new Map(people.map((member) => [member.id, member]))
  const peopleByName = new Map<string, Set<Member>>()
  for (const person of people) {
    for (const name of [person.name, person.nativeName].filter((value) => value !== undefined)) {
      const key = normalizeAuthorName(name)
      const matches = peopleByName.get(key) ?? new Set<Member>()
      matches.add(person)
      peopleByName.set(key, matches)
    }
  }
  const profilesByName = new Map(profiles.filter((profile) => profile.publications === undefined).flatMap((profile) =>
    [profile.name, ...profile.aliases].map((name) => [normalizeAuthorName(name), profile] as const),
  ))
  const profilesByOccurrence = new Map(profiles.flatMap((profile) =>
    (profile.publications ?? []).flatMap(({ id, authorIndex }) =>
      [profile.name, ...profile.aliases].map((name) => [`${id}:${authorIndex}:${normalizeAuthorName(name)}`, profile] as const),
    ),
  ))
  return (name, occurrence) => {
    const key = normalizeAuthorName(name)
    const scoped = occurrence === undefined ? undefined : profilesByOccurrence.get(`${occurrence.id}:${occurrence.authorIndex}:${key}`)
    const profile = scoped ?? profilesByName.get(key)
    // Explicit member bindings can resolve aliases; URLs still come from members.json.
    if (profile?.memberId) return peopleById.get(profile.memberId)?.website
    if (scoped !== undefined) return scoped.website
    const matches = peopleByName.get(key)
    if (matches !== undefined) {
      // Two members may share the same English name. Never choose one by website availability.
      return matches.size === 1 ? [...matches][0]?.website : undefined
    }
    return profile?.website
  }
}

const profiles = parseAuthorProfiles(profilesJson, members, "author-profiles.json", publications)
export const authorWebsite = createAuthorLinkResolver(members, profiles)
