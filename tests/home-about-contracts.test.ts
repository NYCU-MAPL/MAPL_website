import assert from "node:assert/strict"
import test from "node:test"

import { parseMembers } from "../src/lib/content/parse-members.ts"
import { parseNews } from "../src/lib/content/parse-news.ts"
import {
  buildAboutPresentation,
  buildHomePresentation,
  memberProfileLinks,
} from "../src/lib/presentation/home-about.ts"
import type { Publication } from "../src/lib/content/types.ts"

const publication = {
  id: "featured-publication",
  title: "Featured publication",
  authors: ["Researcher"],
  venue: "Research venue",
  year: 2026,
  summary: "Publication summary.",
  topic: "learned-image-compression",
  type: "conference",
  featured: true,
  image: { src: "media/publications/featured.png", alt: "Featured research" },
} satisfies Publication

test("places a newly inserted highest-date news item first", () => {
  // Given
  const news = parseNews([
    { id: "older", date: "2026-01", title: "Older", summary: "Older item." },
    { id: "newest", date: "2099-12", title: "Newest", summary: "Newest item." },
  ], "home-news.json")

  // When
  const presentation = buildHomePresentation(news, [publication])

  // Then
  assert.equal(presentation.news.kind, "populated")
  if (presentation.news.kind === "populated") {
    assert.equal(presentation.news.items[0]?.id, "newest")
  }
})

test("returns an intentional empty news state", () => {
  // Given
  const news = parseNews([], "empty-news.json")

  // When
  const presentation = buildHomePresentation(news, [publication])

  // Then
  assert.deepEqual(presentation.news, { kind: "empty" })
})

test("groups current members in semantic order", () => {
  // Given
  const members = parseMembers([
    { id: "undergrad", name: "Undergrad", status: "current", role: "undergraduate-student", group: "undergraduate-students" },
    { id: "advisor", name: "Advisor", status: "advisor", role: "advisor", group: "advisor" },
    { id: "masters", name: "Masters", status: "current", role: "masters-student", group: "masters-students" },
    { id: "visitor", name: "Visitor", status: "current", role: "visiting-researcher", group: "visiting-researchers" },
    { id: "phd", name: "PhD", status: "current", role: "phd-student", group: "phd-students" },
  ], "grouped-members.json")

  // When
  const presentation = buildAboutPresentation(members)

  // Then
  assert.deepEqual(
    presentation.currentGroups.map(({ group }) => group),
    ["visiting-researchers", "phd-students", "masters-students", "undergraduate-students"],
  )
  assert.deepEqual(presentation.currentGroups.map(({ count }) => count), [1, 1, 1, 1])
})

test("keeps a required-only member renderable without empty links", () => {
  // Given
  const [member] = parseMembers([
    { id: "required-only", name: "Required Only", status: "current", role: "phd-student", group: "phd-students" },
  ], "required-only-member.json")

  // When
  assert.ok(member)
  const presentation = buildAboutPresentation([member])

  // Then
  assert.equal(presentation.currentGroups[0]?.members[0]?.name, "Required Only")
  assert.deepEqual(memberProfileLinks(member), [])
})

test("returns an intentional empty alumni state", () => {
  // Given
  const members = parseMembers([
    { id: "advisor", name: "Advisor", status: "advisor", role: "advisor", group: "advisor" },
  ], "empty-alumni.json")

  // When
  const presentation = buildAboutPresentation(members)

  // Then
  assert.deepEqual(presentation.alumni, { kind: "empty" })
})

test("orders alumni groups and records from newest to oldest", () => {
  // Given
  const members = parseMembers([
    { id: "masters-2024", name: "Masters 2024", status: "alumni", role: "alumnus", group: "alumni", graduationYear: 2024 },
    { id: "phd-2022", name: "PhD 2022", status: "alumni", role: "alumnus", group: "phd-graduates", graduationYear: 2022 },
    { id: "masters-2025", name: "Masters 2025", status: "alumni", role: "alumnus", group: "alumni", graduationYear: 2025 },
  ], "ordered-alumni.json")

  // When
  const presentation = buildAboutPresentation(members)

  // Then
  assert.equal(presentation.alumni.kind, "populated")
  if (presentation.alumni.kind === "populated") {
    assert.deepEqual(presentation.alumni.groups.map(({ group }) => group), ["phd-graduates", "alumni"])
    assert.deepEqual(presentation.alumni.groups[1]?.members.map(({ id }) => id), ["masters-2025", "masters-2024"])
  }
})

test("emits only verified optional profile links", () => {
  // Given
  const member = parseMembers([{
    id: "linked",
    name: "Linked Member",
    status: "advisor",
    role: "advisor",
    group: "advisor",
    website: "https://example.com/profile",
  }], "linked-member.json")[0]

  // When
  const links = member === undefined ? [] : memberProfileLinks(member)

  // Then
  assert.deepEqual(links, [{ label: "Website", href: "https://example.com/profile" }])
})
