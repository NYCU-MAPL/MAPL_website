import { fail, type JsonObject, type ParseContext } from "./primitives.ts"
import {
  arrayValue,
  ensureUniqueIds,
  objectValue,
  parseId,
  parseImage,
  parseUrl,
  requiredBoolean,
  requiredInteger,
  requiredString,
  strictKeys,
} from "./primitives.ts"
import type { Publication, PublicationLinks, PublicationTopic, PublicationType } from "./types.ts"

const PUBLICATION_KEYS = [
  "id", "title", "authors", "venue", "year", "summary", "topic", "type",
  "featured", "image", "links",
] as const

const parseTopic = (object: JsonObject, context: ParseContext): PublicationTopic => {
  const value = requiredString(object, "topic", context)
  switch (value) {
    case "learned-image-compression":
    case "learned-video-compression":
    case "gaussian-splatting":
    case "human-pose-estimation":
    case "image-restoration":
    case "video-synthesis":
    case "semantic-segmentation":
      return value
    default:
      return fail(context, "topic", "is not a recognized publication topic")
  }
}

const parseType = (object: JsonObject, context: ParseContext): PublicationType => {
  const value = requiredString(object, "type", context)
  if (value === "conference" || value === "journal") return value
  return fail(context, "type", "is not a recognized publication type")
}

const parseAuthors = (object: JsonObject, context: ParseContext): readonly string[] => {
  const values = arrayValue(object.authors, context)
  if (values.length === 0) return fail(context, "authors", "must contain at least one author")
  return values.map((value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      return fail(context, "authors", "must contain only non-empty strings")
    }
    return value.trim()
  })
}

const parseLinks = (value: unknown, context: ParseContext): PublicationLinks => {
  const links = objectValue(value, context, "links")
  strictKeys(links, ["paper", "code", "project"], context)
  const paper = parseUrl(links, "paper", context)
  const code = parseUrl(links, "code", context)
  const project = parseUrl(links, "project", context)
  if (paper === undefined && code === undefined && project === undefined) {
    return fail(context, "links", "must contain at least one URL")
  }
  return {
    ...(paper === undefined ? {} : { paper }),
    ...(code === undefined ? {} : { code }),
    ...(project === undefined ? {} : { project }),
  }
}

export const parsePublications = (input: unknown, source: string): readonly Publication[] => {
  const records = arrayValue(input, { source }).map((value, record) => {
    const context = { source, record }
    const object = objectValue(value, context)
    strictKeys(object, PUBLICATION_KEYS, context)
    const year = requiredInteger(object, "year", context)
    if (year < 1990 || year > 2100) fail(context, "year", "must be between 1990 and 2100")
    const links = "links" in object ? parseLinks(object.links, context) : undefined
    return {
      id: parseId(object, context),
      title: requiredString(object, "title", context),
      authors: parseAuthors(object, context),
      venue: requiredString(object, "venue", context),
      year,
      summary: requiredString(object, "summary", context),
      topic: parseTopic(object, context),
      type: parseType(object, context),
      featured: requiredBoolean(object, "featured", context),
      image: parseImage(object.image, context),
      ...(links === undefined ? {} : { links }),
    }
  })
  return ensureUniqueIds(records, source).toSorted(
    (left, right) => right.year - left.year || left.title.localeCompare(right.title),
  )
}
