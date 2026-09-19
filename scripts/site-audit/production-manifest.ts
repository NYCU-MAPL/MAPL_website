import { readdir, readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

import { primaryDestinations } from "../../src/components/layout/navigation.ts"
import { joinUsContent, teachingContent } from "../../src/features/static-pages/content.ts"
import { members, news, publications } from "../../src/lib/content/loaders.ts"
import type { SiteManifest, SiteManifestEntry } from "./types.ts"

const vueFiles = async (directory: URL): Promise<readonly URL[]> => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => {
    const child = new URL(entry.isDirectory() ? `${entry.name}/` : entry.name, directory)
    if (entry.isDirectory()) return vueFiles(child)
    return entry.name.endsWith(".vue") ? [child] : []
  }))
  return nested.flat()
}

const sourceName = (file: URL, root: URL): string =>
  fileURLToPath(file).slice(fileURLToPath(root).length).replace(/^\//u, "")

const hashRoute = (path: string): string => `#${path}`

const crawlStaticRoutes = async (root: URL): Promise<readonly SiteManifestEntry[]> => {
  const files = await vueFiles(new URL("src/", root))
  const nested = await Promise.all(files.map(async (file) => {
    const source = await readFile(file, "utf8")
    return [...source.matchAll(/\bto="(\/(?!\/)[^"]*)"/gu)].map((match, index) => ({
      kind: "internal-route" as const,
      source: `${sourceName(file, root)}:static-route[${index}]`,
      value: hashRoute(match[1] ?? ""),
    }))
  }))
  return nested.flat()
}

const applicationRoutes = async (root: URL): Promise<readonly string[]> => {
  const routerSource = await readFile(new URL("src/router/index.ts", root), "utf8")
  return [...routerSource.matchAll(/\bpath:\s*"([^"]+)"/gu)].map((match) => hashRoute(match[1] ?? ""))
}

export const buildProductionManifest = async (root: URL): Promise<SiteManifest> => {
  const entries: SiteManifestEntry[] = []
  for (const [index, destination] of primaryDestinations.entries()) {
    entries.push({ kind: "internal-route", source: `src/components/layout/navigation.ts[${index}].to`, value: hashRoute(destination.to) })
  }
  entries.push(...await crawlStaticRoutes(root))

  for (const [index, item] of news.entries()) {
    if (item.image !== undefined) {
      entries.push({ kind: "local-asset", source: `src/data/news.json[${index}].image.src`, value: item.image.src })
    }
    if (item.url !== undefined) {
      entries.push({ kind: "external-link", source: `src/data/news.json[${index}].url`, value: item.url })
    }
  }
  for (const [index, member] of members.entries()) {
    if (member.image !== undefined) {
      entries.push({ kind: "local-asset", source: `src/data/members.json[${index}].image.src`, value: member.image.src })
    }
    for (const [field, value] of [["website", member.website], ["scholarUrl", member.scholarUrl]] as const) {
      if (value !== undefined) entries.push({ kind: "external-link", source: `src/data/members.json[${index}].${field}`, value })
    }
  }
  for (const [index, publication] of publications.entries()) {
    entries.push({ kind: "local-asset", source: `src/data/publications.json[${index}].image.src`, value: publication.image.src })
    if (publication.links !== undefined) {
      for (const [field, value] of Object.entries(publication.links)) {
        entries.push({ kind: "external-link", source: `src/data/publications.json[${index}].links.${field}`, value })
      }
    }
  }
  entries.push({ kind: "local-asset", source: "src/features/static-pages/content.ts:joinUsContent.image.src", value: joinUsContent.image.src })
  entries.push({ kind: "external-link", source: "src/features/static-pages/content.ts:joinUsContent.introSlides", value: joinUsContent.introSlides })
  entries.push({ kind: "external-link", source: "src/features/static-pages/content.ts:joinUsContent.professor.email", value: `mailto:${joinUsContent.professor.email}` })
  entries.push({ kind: "external-link", source: "src/features/static-pages/content.ts:joinUsContent.professor.profile", value: joinUsContent.professor.profile })
  for (const [index, link] of teachingContent.links.entries()) {
    entries.push({ kind: "external-link", source: `src/features/static-pages/content.ts:teachingContent.links[${index}].href`, value: link.href })
  }
  return { routes: await applicationRoutes(root), entries }
}
