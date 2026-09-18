import {
  arrayValue,
  ensureUniqueIds,
  objectValue,
  parseId,
  parseImage,
  parseIsoDate,
  parseUrl,
  requiredBoolean,
  requiredString,
  strictKeys,
} from "./primitives.ts"
import type { NewsItem } from "./types.ts"

const NEWS_KEYS = ["id", "date", "title", "summary", "url", "image", "featured"] as const

export const parseNews = (input: unknown, source: string): readonly NewsItem[] => {
  const records = arrayValue(input, { source }).map((value, record) => {
    const context = { source, record }
    const object = objectValue(value, context)
    strictKeys(object, NEWS_KEYS, context)
    const url = parseUrl(object, "url", context)
    const image = "image" in object ? parseImage(object["image"], context) : undefined
    const featured = "featured" in object ? requiredBoolean(object, "featured", context) : false
    return {
      id: parseId(object, context),
      date: parseIsoDate(object, context),
      title: requiredString(object, "title", context),
      summary: requiredString(object, "summary", context),
      featured,
      ...(url === undefined ? {} : { url }),
      ...(image === undefined ? {} : { image }),
    }
  })
  return ensureUniqueIds(records, source).toSorted(
    (left, right) => right.date.localeCompare(left.date) || left.id.localeCompare(right.id),
  )
}
