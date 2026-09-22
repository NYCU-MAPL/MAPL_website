import { ContentValidationError } from "./errors.ts"
import type { ContentImage } from "./types.ts"

export type JsonObject = Readonly<Record<string, unknown>>

export type ParseContext = {
  readonly source: string
  readonly record?: number
}

const isJsonObject = (value: unknown): value is JsonObject =>
  typeof value === "object" && value !== null && !Array.isArray(value)

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/u
const ISO_DATE_PATTERN = /^\d{4}-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[12]\d|3[01]))?$/u
const MEDIA_PATTERN = /^media\/(?:people|publications|news|join)\/[\w.\-/一-鿿]+\.(?:jpe?g|png|webp)$/u

export const fail = (context: ParseContext, field: string, detail: string): never => {
  throw new ContentValidationError(context.source, context.record, field, detail)
}

export const objectValue = (
  value: unknown,
  context: ParseContext,
  field = "record",
): JsonObject => {
  if (!isJsonObject(value)) {
    return fail(context, field, "must be an object")
  }
  return value
}

export const arrayValue = (value: unknown, context: ParseContext): readonly unknown[] => {
  if (!Array.isArray(value)) {
    return fail(context, "collection", "must be an array")
  }
  return value
}

export const strictKeys = (
  object: JsonObject,
  allowed: readonly string[],
  context: ParseContext,
): void => {
  const unexpected = Object.keys(object).find((key) => !allowed.includes(key))
  if (unexpected !== undefined) {
    fail(context, unexpected, "is not a recognized field")
  }
}

export const requiredString = (
  object: JsonObject,
  field: string,
  context: ParseContext,
): string => {
  const value = object[field]
  if (typeof value !== "string" || value.trim().length === 0) {
    return fail(context, field, "must be a non-empty string")
  }
  return value.trim()
}

export const optionalString = (
  object: JsonObject,
  field: string,
  context: ParseContext,
): string | undefined => {
  if (!(field in object)) return undefined
  return requiredString(object, field, context)
}

export const requiredBoolean = (
  object: JsonObject,
  field: string,
  context: ParseContext,
): boolean => {
  const value = object[field]
  if (typeof value !== "boolean") return fail(context, field, "must be a boolean")
  return value
}

export const requiredInteger = (
  object: JsonObject,
  field: string,
  context: ParseContext,
): number => {
  const value = object[field]
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return fail(context, field, "must be an integer")
  }
  return value
}

export const optionalInteger = (
  object: JsonObject,
  field: string,
  context: ParseContext,
): number | undefined => {
  if (!(field in object)) return undefined
  return requiredInteger(object, field, context)
}

export const parseId = (object: JsonObject, context: ParseContext): string => {
  const id = requiredString(object, "id", context)
  if (!ID_PATTERN.test(id)) return fail(context, "id", "must be kebab-case")
  return id
}

export const parseIsoDate = (object: JsonObject, context: ParseContext): string => {
  const date = requiredString(object, "date", context)
  if (!ISO_DATE_PATTERN.test(date)) return fail(context, "date", "must be an ISO date or month")
  if (date.length === 10) {
    const parsed = new Date(`${date}T00:00:00Z`)
    if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) {
      return fail(context, "date", "must be a real calendar date")
    }
  }
  return date
}

export const parseUrl = (
  object: JsonObject,
  field: string,
  context: ParseContext,
): string | undefined => {
  const value = optionalString(object, field, context)
  if (value === undefined) return undefined
  let url: URL
  try {
    url = new URL(value)
  } catch (error) {
    if (error instanceof TypeError) return fail(context, field, "must be a valid HTTPS URL")
    throw error
  }
  if (url.protocol !== "https:") return fail(context, field, "must use HTTPS")
  return url.href
}

export const parseImage = (
  value: unknown,
  context: ParseContext,
  field = "image",
): ContentImage => {
  const image = objectValue(value, context, field)
  strictKeys(image, ["src", "alt"], context)
  const src = requiredString(image, "src", context)
  if (src.startsWith("/")) return fail(context, `${field}.src`, "must not be root-absolute")
  if (!MEDIA_PATTERN.test(src) || src.includes("..")) {
    return fail(context, `${field}.src`, "must be a relative media image path")
  }
  return { src, alt: requiredString(image, "alt", context) }
}

export const ensureUniqueIds = <T extends { readonly id: string }>(
  records: readonly T[],
  source: string,
): readonly T[] => {
  const seen = new Set<string>()
  for (const [index, record] of records.entries()) {
    if (seen.has(record.id)) fail({ source, record: index }, "id", `duplicate ID "${record.id}"`)
    seen.add(record.id)
  }
  return records
}
