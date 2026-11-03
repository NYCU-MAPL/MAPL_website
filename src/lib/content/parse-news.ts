import {
  arrayValue,
  ensureUniqueIds,
  fail,
  objectValue,
  parseId,
  parseImage,
  parseIsoDate,
  parseUrl,
  requiredBoolean,
  requiredString,
  strictKeys,
} from "./primitives.ts"
import { NEWS_CATEGORIES, type NewsCategory, type NewsItem, type Publication } from "./types.ts"

const NEWS_KEYS = ["id", "date", "title", "category", "publicationIds", "inlineLink", "summary", "url", "image", "featured"] as const

export const validateNewsPublications = (
  news: readonly NewsItem[],
  publications: readonly Publication[],
  source: string,
): void => {
  const ids = new Set(publications.map(({ id }) => id))
  for (const [record, item] of news.entries()) {
    for (const id of item.publicationIds ?? []) {
      if (!ids.has(id)) fail({ source, record }, "publicationIds", `references unknown publication ${id}`)
    }
  }
}

export const parseNews = (input: unknown, source: string): readonly NewsItem[] => {
  const records = arrayValue(input, { source }).map((value, record) => {
    const context = { source, record }
    const object = objectValue(value, context)
    strictKeys(object, NEWS_KEYS, context)
    const title = requiredString(object, "title", context)
    let inlineLink: NewsItem["inlineLink"]
    if ("inlineLink" in object) {
      const link = objectValue(object["inlineLink"], context, "inlineLink")
      strictKeys(link, ["text", "url"], context)
      const text = requiredString(link, "text", context)
      const url = parseUrl(link, "url", context) ?? fail(context, "inlineLink.url", "is required")
      if (title.split(text).length !== 2) {
        fail(context, "inlineLink.text", "must appear exactly once in the title")
      }
      inlineLink = { text, url }
    }
    const category = requiredString(object, "category", context)
    if (!NEWS_CATEGORIES.includes(category as NewsCategory)) {
      return fail(context, "category", "is not a recognized news category")
    }
    const publicationIds = "publicationIds" in object
      ? arrayValue(object["publicationIds"], context).map((id) => parseId({ id }, context))
      : undefined
    if (publicationIds !== undefined && (publicationIds.length === 0 || new Set(publicationIds).size !== publicationIds.length)) {
      return fail(context, "publicationIds", "must contain unique publication IDs")
    }
    const url = parseUrl(object, "url", context)
    const image = "image" in object ? parseImage(object["image"], context) : undefined
    const featured = "featured" in object ? requiredBoolean(object, "featured", context) : false
    return {
      id: parseId(object, context),
      date: parseIsoDate(object, context),
      title,
      ...(inlineLink === undefined ? {} : { inlineLink }),
      category: category as NewsCategory,
      ...(publicationIds === undefined ? {} : { publicationIds }),
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
