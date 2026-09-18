import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"

import { ContentValidationError } from "../src/lib/content/errors.ts"
import { parseMembers } from "../src/lib/content/parse-members.ts"
import { parseNews } from "../src/lib/content/parse-news.ts"
import { parsePublications } from "../src/lib/content/parse-publications.ts"
import type { ContentCollections } from "../src/lib/content/types.ts"
import { auditMedia } from "./content/media-audit.ts"

type ValidationReport = {
  readonly records: Readonly<Record<keyof ContentCollections, number>>
  readonly uniqueIds: Readonly<Record<keyof ContentCollections, number>>
  readonly assets: {
    readonly referenced: number
    readonly files: number
    readonly byDirectory: Readonly<Record<string, number>>
  }
  readonly warnings: readonly string[]
  readonly errors: readonly string[]
}

const root = resolve(import.meta.dirname, "..")
const outputIndex = process.argv.indexOf("--output")
const output = outputIndex === -1
  ? resolve(root, "artifacts/content-validation.json")
  : resolve(root, process.argv[outputIndex + 1] ?? "artifacts/content-validation.json")

const readJson = async (path: string): Promise<unknown> => {
  const text = await readFile(resolve(root, path), "utf8")
  return JSON.parse(text)
}

const collectMedia = (collections: ContentCollections): readonly string[] => [
  ...collections.news.flatMap((item) => item.image === undefined ? [] : [item.image.src]),
  ...collections.members.flatMap((member) => member.image === undefined ? [] : [member.image.src]),
  ...collections.publications.map((publication) => publication.image.src),
]

const run = async (): Promise<ValidationReport> => {
  const collections: ContentCollections = {
    news: parseNews(await readJson("src/data/news.json"), "src/data/news.json"),
    members: parseMembers(await readJson("src/data/members.json"), "src/data/members.json"),
    publications: parsePublications(
      await readJson("src/data/publications.json"),
      "src/data/publications.json",
    ),
  }
  const media = await auditMedia(collectMedia(collections), resolve(root, "public"))
  return {
    records: {
      news: collections.news.length,
      members: collections.members.length,
      publications: collections.publications.length,
    },
    uniqueIds: {
      news: new Set(collections.news.map(({ id }) => id)).size,
      members: new Set(collections.members.map(({ id }) => id)).size,
      publications: new Set(collections.publications.map(({ id }) => id)).size,
    },
    assets: {
      referenced: media.referenced,
      files: media.files,
      byDirectory: media.byDirectory,
    },
    warnings: media.warnings,
    errors: media.errors,
  }
}

try {
  const report = await run()
  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8")
  console.log(JSON.stringify(report, null, 2))
  if (report.errors.length > 0) process.exitCode = 1
} catch (error) {
  if (error instanceof ContentValidationError || error instanceof SyntaxError) {
    const report: ValidationReport = {
      records: { news: 0, members: 0, publications: 0 },
      uniqueIds: { news: 0, members: 0, publications: 0 },
      assets: { referenced: 0, files: 0, byDirectory: {} },
      warnings: [],
      errors: [error.message],
    }
    await mkdir(dirname(output), { recursive: true })
    await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, "utf8")
    console.error(error.message)
    process.exitCode = 1
  } else {
    throw error
  }
}
