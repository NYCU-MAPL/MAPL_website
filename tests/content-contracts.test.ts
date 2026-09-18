import assert from "node:assert/strict"
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { join } from "node:path"
import test from "node:test"

import { ContentValidationError } from "../src/lib/content/errors.ts"
import { parseMembers } from "../src/lib/content/parse-members.ts"
import { parseNews } from "../src/lib/content/parse-news.ts"
import { parsePublications } from "../src/lib/content/parse-publications.ts"
import { loadContentCollections } from "../src/lib/content/loaders.ts"
import { auditMedia } from "../scripts/content/media-audit.ts"

const readFixture = async (name: string): Promise<unknown> =>
  JSON.parse(await readFile(new URL(`./fixtures/${name}`, import.meta.url), "utf8"))

const rejectsFixture = async (
  parser: (value: unknown, source: string) => unknown,
  fixture: string,
  field: string,
): Promise<void> => {
  const input = await readFixture(fixture)
  assert.throws(
    () => parser(input, fixture),
    (error: unknown) =>
      error instanceof ContentValidationError &&
      error.source === fixture &&
      error.field === field,
  )
}

const newsRecord = (date: string): readonly Readonly<Record<string, unknown>>[] => [{
  id: "calendar-test",
  date,
  title: "Calendar test",
  summary: "Calendar validation fixture.",
}]

const memberRecord = (
  status: string,
  role: string,
  group: string,
  graduationYear?: number,
): Readonly<Record<string, unknown>> => ({
  id: "membership-test",
  name: "Membership Test",
  status,
  role,
  group,
  ...(graduationYear === undefined ? {} : { graduationYear }),
})

test("rejects duplicate IDs when news records repeat an ID", async () => {
  await rejectsFixture(parseNews, "duplicate-news-ids.json", "id")
})

test("rejects a publication when its mandatory image is missing", async () => {
  await rejectsFixture(parsePublications, "publication-missing-image.json", "image")
})

test("rejects a publication when its mandatory summary is missing", async () => {
  await rejectsFixture(parsePublications, "publication-missing-summary.json", "summary")
})

test("rejects an empty URL when a URL field is present", async () => {
  await rejectsFixture(parseNews, "news-empty-url.json", "url")
})

test("rejects a malformed URL when a URL field is present", async () => {
  await rejectsFixture(parseNews, "news-invalid-url.json", "url")
})

test("rejects an unknown member role", async () => {
  await rejectsFixture(parseMembers, "member-unknown-role.json", "role")
})

for (const date of ["2026-02-31", "2025-02-29"]) {
  test(`rejects impossible calendar date ${date}`, () => {
    assert.throws(
      () => parseNews(newsRecord(date), "calendar-test.json"),
      (error: unknown) => error instanceof ContentValidationError && error.field === "date",
    )
  })
}

for (const [status, role, group, field] of [
  ["current", "alumnus", "alumni", "role"],
  ["advisor", "advisor", "alumni", "group"],
  ["current", "masters-student", "phd-students", "group"],
] as const) {
  test(`rejects mismatched member tuple ${status}/${role}/${group}`, () => {
    assert.throws(
      () => parseMembers([memberRecord(status, role, group)], "membership-test.json"),
      (error: unknown) => error instanceof ContentValidationError && error.field === field,
    )
  })
}

test("accepts every supported member tuple", () => {
  const records = [
    memberRecord("advisor", "advisor", "advisor"),
    memberRecord("current", "visiting-researcher", "visiting-researchers"),
    memberRecord("current", "phd-student", "phd-students"),
    memberRecord("current", "masters-student", "masters-students"),
    memberRecord("current", "undergraduate-student", "undergraduate-students"),
    memberRecord("alumni", "alumnus", "phd-graduates", 2024),
    memberRecord("alumni", "alumnus", "alumni", 2023),
  ].map((record, index) => ({ ...record, id: `supported-${index}` }))

  assert.equal(parseMembers(records, "supported-members.json").length, records.length)
})

test("rejects unknown member fields", () => {
  const input = [{ ...memberRecord("current", "phd-student", "phd-students"), biography: "Unexpected" }]
  assert.throws(
    () => parseMembers(input, "unknown-member-field.json"),
    (error: unknown) => error instanceof ContentValidationError && error.field === "biography",
  )
})

test("sorts members deterministically and omits absent optional fields", () => {
  const input = [
    { id: "zoe", name: "Zoe", status: "current", role: "phd-student", group: "phd-students" },
    { id: "amy", name: "Amy", status: "current", role: "phd-student", group: "phd-students" },
    { id: "older", name: "Older", status: "alumni", role: "alumnus", group: "alumni", graduationYear: 2020 },
    { id: "newer", name: "Newer", status: "alumni", role: "alumnus", group: "alumni", graduationYear: 2024 },
  ]

  const parsed = parseMembers(input, "member-order.json")
  assert.deepEqual(parsed.map(({ id }) => id), ["amy", "zoe", "newer", "older"])
  assert.deepEqual(Object.keys(parsed[0] ?? {}).toSorted(), ["group", "id", "name", "role", "status"])
})

test("rejects an unknown publication type", async () => {
  await rejectsFixture(parsePublications, "publication-unknown-type.json", "type")
})

test("rejects an unknown publication topic", async () => {
  await rejectsFixture(parsePublications, "publication-unknown-topic.json", "topic")
})

test("rejects root-absolute local media", async () => {
  await rejectsFixture(parsePublications, "publication-root-absolute-media.json", "image.src")
})

test("reports a referenced media file when it is missing", async () => {
  const mediaRoot = await mkdtemp(join(tmpdir(), "mapl-media-test-"))
  try {
    const report = await auditMedia(["media/publications/missing.png"], mediaRoot)
    assert.deepEqual(report.errors, ["media/publications/missing.png: file does not exist"])
  } finally {
    await rm(mediaRoot, { recursive: true })
  }
})

test("reports duplicate media references", async () => {
  const mediaRoot = await mkdtemp(join(tmpdir(), "mapl-media-test-"))
  try {
    await mkdir(join(mediaRoot, "media", "people"), { recursive: true })
    await writeFile(join(mediaRoot, "media", "people", "duplicate.png"), Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    const report = await auditMedia(["media/people/duplicate.png", "media/people/duplicate.png"], mediaRoot)
    assert.deepEqual(report.errors, ["media/people/duplicate.png: referenced 2 times"])
  } finally {
    await rm(mediaRoot, { recursive: true })
  }
})

test("reports orphan media files", async () => {
  const mediaRoot = await mkdtemp(join(tmpdir(), "mapl-media-test-"))
  try {
    await mkdir(join(mediaRoot, "media", "people"), { recursive: true })
    await writeFile(join(mediaRoot, "media", "people", "orphan.png"), Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    const report = await auditMedia([], mediaRoot)
    assert.deepEqual(report.errors, ["media/people/orphan.png: orphan file is not referenced by JSON"])
  } finally {
    await rm(mediaRoot, { recursive: true })
  }
})

test("reports media whose extension does not match its signature", async () => {
  const mediaRoot = await mkdtemp(join(tmpdir(), "mapl-media-test-"))
  try {
    await mkdir(join(mediaRoot, "media", "people"), { recursive: true })
    await writeFile(join(mediaRoot, "media", "people", "invalid.png"), "not a PNG")
    const report = await auditMedia(["media/people/invalid.png"], mediaRoot)
    assert.deepEqual(report.errors, ["media/people/invalid.png: extension does not match supported image content"])
  } finally {
    await rm(mediaRoot, { recursive: true })
  }
})

test("normalizes appended valid records through the collection loader", async () => {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "mapl-loader-test-"))
  try {
    const production = await Promise.all([
      readFixture("../../src/data/news.json"),
      readFixture("../../src/data/members.json"),
      readFixture("../../src/data/publications.json"),
    ])
    const additions = [
      { id: "temporary-news", date: "2099-01", title: "Temporary news", summary: "Loader fixture." },
      { id: "temporary-member", name: "Temporary Member", status: "current", role: "masters-student", group: "masters-students" },
      { id: "temporary-publication", title: "Temporary Publication", authors: ["Test Author"], venue: "Test Venue", year: 2099, summary: "Loader fixture.", topic: "learned-video-compression", type: "conference", featured: false, image: { src: "media/publications/hytip-iccv-2025.png", alt: "Temporary fixture" } },
    ]
    const paths = ["news.json", "members.json", "publications.json"].map((name) => join(fixtureRoot, name))
    for (const [index, path] of paths.entries()) {
      const collection = production[index]
      assert.ok(Array.isArray(collection))
      await writeFile(path, JSON.stringify([...collection, additions[index]]), "utf8")
    }
    const loaded = loadContentCollections(
      JSON.parse(await readFile(paths[0] ?? "", "utf8")),
      JSON.parse(await readFile(paths[1] ?? "", "utf8")),
      JSON.parse(await readFile(paths[2] ?? "", "utf8")),
    )
    assert.equal(loaded.news[0]?.id, "temporary-news")
    assert.ok(loaded.members.some(({ id }) => id === "temporary-member"))
    assert.equal(loaded.publications[0]?.id, "temporary-publication")
  } finally {
    await rm(fixtureRoot, { recursive: true })
  }
})
