import assert from "node:assert/strict"
import test from "node:test"

import { publications } from "../src/lib/content/loaders.ts"
import {
  ALL_FILTER,
  filterPublications,
  getPublicationFilterOptions,
  parsePublicationFilters,
  publicationActions,
  serializePublicationFilters,
} from "../src/features/publications/filters.ts"
import {
  joinUsContent,
  teachingContent,
} from "../src/features/static-pages/content.ts"
import type { Publication } from "../src/lib/content/types.ts"

const options = getPublicationFilterOptions(publications)

test("derives stable filter options from canonical publication data", () => {
  assert.deepEqual(options.types, ["conference"])
  assert.deepEqual(options.topics, [
    "gaussian-splatting",
    "human-pose-estimation",
    "image-restoration",
    "learned-image-compression",
    "learned-video-compression",
    "semantic-segmentation",
    "video-synthesis",
  ])
  assert.deepEqual(options.years, [2026, 2025, 2024, 2023, 2019])
})

test("filters every canonical type, topic, and year combination deterministically", () => {
  const types = [ALL_FILTER, ...options.types]
  const topics = [ALL_FILTER, ...options.topics]
  const years = [ALL_FILTER, ...options.years]

  for (const type of types) {
    for (const topic of topics) {
      for (const year of years) {
        const actual = filterPublications(publications, { type, topic, year })
        const expected = publications.filter((publication) =>
          (type === ALL_FILTER || publication.type === type) &&
          (topic === ALL_FILTER || publication.topic === topic) &&
          (year === ALL_FILTER || publication.year === year),
        )
        assert.deepEqual(actual.map(({ id }) => id), expected.map(({ id }) => id))
      }
    }
  }
})

test("parses valid URL filters and serializes only active state", () => {
  const parsed = parsePublicationFilters({
    type: "conference",
    topic: "gaussian-splatting",
    year: "2026",
  }, options)

  assert.deepEqual(parsed, {
    type: "conference",
    topic: "gaussian-splatting",
    year: 2026,
  })
  assert.deepEqual(serializePublicationFilters(parsed), {
    type: "conference",
    topic: "gaussian-splatting",
    year: "2026",
  })
})

test("sanitizes unknown, repeated, and empty URL filters to All", () => {
  const parsed = parsePublicationFilters({
    type: "poster",
    topic: ["gaussian-splatting", "video-synthesis"],
    year: "",
  }, options)

  assert.deepEqual(parsed, {
    type: ALL_FILTER,
    topic: ALL_FILTER,
    year: ALL_FILTER,
  })
  assert.deepEqual(serializePublicationFilters(parsed), {})
})

test("returns an empty result for a valid zero-match combination", () => {
  const filtered = filterPublications(publications, {
    type: ALL_FILTER,
    topic: "image-restoration",
    year: 2026,
  })

  assert.deepEqual(filtered, [])
})

test("omits every publication action when links are absent", () => {
  const linkless = publications.find(({ links }) => links === undefined)
  assert.ok(linkless)
  assert.deepEqual(publicationActions(linkless), [])
})

test("renders only existing Paper, Code, and Project actions in canonical order", () => {
  const firstPublication = publications[0]
  assert.ok(firstPublication)
  const linked: Publication = {
    ...firstPublication,
    links: {
      paper: "https://example.com/paper",
      code: "https://example.com/code",
      project: "https://example.com/project",
    },
  }

  assert.deepEqual(publicationActions(linked), [
    { kind: "paper", label: "Paper", href: "https://example.com/paper" },
    { kind: "code", label: "Code", href: "https://example.com/code" },
    { kind: "project", label: "Project", href: "https://example.com/project" },
  ])
})

test("keeps Teaching links on current official NYCU services", () => {
  assert.deepEqual(teachingContent.courses.map(({ code }) => code), ["IOC5184", "ILE5242"])
  assert.deepEqual(teachingContent.links.map(({ href }) => href), [
    "https://timetable.nycu.edu.tw/",
    "https://www.cs.nycu.edu.tw/education/master?locale=en",
  ])
})

test("keeps Join Us media and contacts on verified canonical values", () => {
  assert.deepEqual(joinUsContent.image, {
    src: "media/join/year-end-party-2025.webp",
    alt: "MAPL members at the 2025 year-end gathering",
    width: 1023,
    height: 585,
  })
  assert.equal(joinUsContent.introSlides, "https://maplintro2027.pse.is/9lnn2m")
  assert.equal(joinUsContent.professor.email, "wpeng@cs.nycu.edu.tw")
  assert.equal(joinUsContent.professor.profile, "https://www.cs.nycu.edu.tw/members/detail/wpeng?locale=en")
  assert.equal(joinUsContent.lab.location, "EC621")
  assert.equal(joinUsContent.lab.phone, "+886-3-571-2121 ext. 54779")
})
