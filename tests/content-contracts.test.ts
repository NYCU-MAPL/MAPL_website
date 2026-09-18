import assert from "node:assert/strict"
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises"
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
