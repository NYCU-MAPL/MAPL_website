import assert from "node:assert/strict"
import test from "node:test"

import { authorWebsite, createAuthorLinkResolver } from "../src/features/publications/authors.ts"
import { members, publications } from "../src/lib/content/loaders.ts"
import { parseAuthorProfiles } from "../src/lib/content/parse-author-profiles.ts"
import type { Member } from "../src/lib/content/types.ts"

const scopedPapers = [{ ...publications[0]!, id: "shared-paper", authors: ["Alex Chen", "Taylor Morgan", "Alex Chen"] }]

const member = (id: string, name: string, website?: string): Member => ({
  id,
  name,
  status: "current",
  role: "phd-student",
  group: "phd-students",
  ...(website === undefined ? {} : { website }),
})

test("member names tolerate accents, capitalization and punctuation without guessing initials", () => {
  const resolve = createAuthorLinkResolver([member("joern", "Jörn Example", "https://example.com/joern")], [])
  assert.equal(resolve("Jorn-Example"), "https://example.com/joern")
  assert.equal(resolve("JORN EXAMPLE"), "https://example.com/joern")
  assert.equal(resolve("J. Example"), undefined)
  assert.equal(resolve("Example"), undefined)
})

test("member aliases always reuse the member record's current website", () => {
  const profiles = [{ name: "Sang NguyenQuang", aliases: [], memberId: "sang" }]
  const old = createAuthorLinkResolver([member("sang", "Nguyen Quang Sang", "https://example.com/old")], profiles)
  const updated = createAuthorLinkResolver([member("sang", "Nguyen Quang Sang", "https://example.com/new")], profiles)
  assert.equal(old("Sang NguyenQuang"), "https://example.com/old")
  assert.equal(updated("Sang NguyenQuang"), "https://example.com/new")
})

test("same-name members stay unlinked even when only one has a website", () => {
  const resolve = createAuthorLinkResolver([
    member("alex-one", "Alex Chen", "https://example.com/alex"),
    member("alex-two", "Alex Chen"),
  ], [])
  assert.equal(resolve("Alex Chen"), undefined)
})

test("an explicit verified member binding can disambiguate a same-name author", () => {
  const resolve = createAuthorLinkResolver([
    member("alex-one", "Alex Chen", "https://example.com/alex-one"),
    member("alex-two", "Alex Chen", "https://example.com/alex-two"),
  ], [{ name: "Alex Chen", aliases: [], memberId: "alex-two" }])
  assert.equal(resolve("Alex Chen"), "https://example.com/alex-two")
})

test("member websites take precedence over external entries and missing sites remain unlinked", () => {
  const external = [{ name: "Alex Chen", aliases: [], website: "https://example.com/external" }]
  assert.equal(createAuthorLinkResolver([member("alex", "Alex Chen", "https://example.com/member")], external)("Alex Chen"), "https://example.com/member")
  assert.equal(createAuthorLinkResolver([member("alex", "Alex Chen")], external)("Alex Chen"), undefined)
})

test("external aliases resolve to one verified profile, and unknown names stay plain", () => {
  const resolve = createAuthorLinkResolver([], [{
    name: "Taylor Morgan",
    aliases: ["Taylor R. Morgan"],
    website: "https://example.com/taylor",
    sourceUrl: "https://example.edu/people/taylor",
  }])
  assert.equal(resolve("Taylor R. Morgan"), "https://example.com/taylor")
  assert.equal(resolve("Taylor Morgan"), "https://example.com/taylor")
  assert.equal(resolve("T. Morgan"), undefined)
  assert.equal(resolve("Unverified Person"), undefined)
})

test("profile validation rejects unsafe URLs, missing evidence and invalid member references", () => {
  const profile = { name: "Taylor Morgan", website: "https://example.com/taylor", sourceUrl: "https://example.edu/taylor" }
  assert.throws(() => parseAuthorProfiles([{ ...profile, website: "javascript:alert(1)" }], [], "profiles"))
  assert.throws(() => parseAuthorProfiles([{ ...profile, website: "http://example.com/taylor" }], [], "profiles"))
  assert.throws(() => parseAuthorProfiles([{ name: profile.name, website: profile.website }], [], "profiles"))
  assert.throws(() => parseAuthorProfiles([{ name: profile.name, memberId: "missing" }], [], "profiles"))
  assert.throws(() => parseAuthorProfiles([{ ...profile, memberId: "taylor" }], [member("taylor", profile.name)], "profiles"))
})

test("profile validation rejects names or aliases that would silently replace another identity", () => {
  const profile = { name: "Taylor Morgan", website: "https://example.com/taylor", sourceUrl: "https://example.edu/taylor" }
  assert.throws(() => parseAuthorProfiles([profile, { ...profile, name: "Taylor-Morgan" }], [], "profiles"))
  assert.throws(() => parseAuthorProfiles([{ ...profile, aliases: ["Taylor-Morgan"] }], [], "profiles"))
})

test("scoped bindings distinguish same-name coauthors without linking unverified papers", () => {
  const people = [member("alex-one", "Alex Chen", "https://example.com/alex-one"), member("alex-two", "Alex Chen")]
  const profiles = parseAuthorProfiles([{
    name: "Alex Chen",
    memberId: "alex-one",
    publications: [{ id: "shared-paper", authorIndex: 0 }],
  }], people, "profiles", scopedPapers)
  const resolve = createAuthorLinkResolver(people, profiles)
  assert.equal(resolve("Alex Chen", { id: "shared-paper", authorIndex: 0 }), "https://example.com/alex-one")
  assert.equal(resolve("Alex Chen", { id: "shared-paper", authorIndex: 2 }), undefined)
  assert.equal(resolve("Alex Chen", { id: "unverified-paper", authorIndex: 0 }), undefined)
  assert.equal(resolve("Alex Chen"), undefined)
  assert.equal(resolve("Taylor Morgan", { id: "shared-paper", authorIndex: 0 }), undefined)
})

test("different people with the same name can have separate verified author positions", () => {
  const people = [member("alex-one", "Alex Chen", "https://example.com/one"), member("alex-two", "Alex Chen", "https://example.com/two")]
  const profiles = parseAuthorProfiles([
    { name: "Alex Chen", memberId: "alex-one", publications: [{ id: "shared-paper", authorIndex: 0 }] },
    { name: "Alex Chen", memberId: "alex-two", publications: [{ id: "shared-paper", authorIndex: 2 }] },
  ], people, "profiles", scopedPapers)
  const resolve = createAuthorLinkResolver(people, profiles)
  assert.equal(resolve("Alex Chen", { id: "shared-paper", authorIndex: 0 }), "https://example.com/one")
  assert.equal(resolve("Alex Chen", { id: "shared-paper", authorIndex: 2 }), "https://example.com/two")
})

test("scoped validation rejects missing papers, stale positions and conflicting bindings", () => {
  const people = [member("alex", "Alex Chen")]
  const profile = { name: "Alex Chen", memberId: "alex" }
  const parse = (scope: unknown) => parseAuthorProfiles([{ ...profile, publications: scope }], people, "profiles", scopedPapers)
  assert.throws(() => parse([]))
  assert.throws(() => parse([{ id: "missing-paper", authorIndex: 0 }]))
  for (const authorIndex of [-1, 0.5, 1, 3]) assert.throws(() => parse([{ id: "shared-paper", authorIndex }]))
  assert.throws(() => parse([{ id: "shared-paper", authorIndex: 0 }, { id: "shared-paper", authorIndex: 0 }]))
  const scoped = { ...profile, publications: [{ id: "shared-paper", authorIndex: 0 }] }
  assert.throws(() => parseAuthorProfiles([scoped, scoped], people, "profiles", scopedPapers))
})

test("Julie's CV confirms exactly 20 linked papers while her same-name coauthor stays unlinked", () => {
  const julie = members.find(({ id }) => id === "yi-hsin-chen")!
  const links = publications.flatMap((paper) => paper.authors.flatMap((name, authorIndex) =>
    name === "Yi-Hsin Chen" ? [{ id: paper.id, authorIndex, url: authorWebsite(name, { id: paper.id, authorIndex }) }] : [],
  ))
  assert.ok(julie.website)
  assert.equal(links.filter(({ url }) => url === julie.website).length, 20)
  assert.equal(links.filter(({ url }) => url === undefined).length, 4)
  const motif = links.filter(({ id }) => id === "motif-video-super-resolution-2023")
  assert.deepEqual(motif.map(({ authorIndex, url }) => ({ authorIndex, url })), [
    { authorIndex: 0, url: julie.website }, { authorIndex: 2, url: undefined },
  ])
  for (const id of ["conditional-video-compressors-restoration-2024", "rate-distortion-complexity-analysis-of-parametric-video-codecs-2026", "a-cross-framework-study-of-temporal-information-buffering-strategies-for-learned-video-compression-2025"]) {
    assert.equal(links.find((link) => link.id === id)?.url, undefined)
  }
})
