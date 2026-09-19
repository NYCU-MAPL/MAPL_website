import type {
  Publication,
  PublicationLinks,
  PublicationTopic,
  PublicationType,
} from "../../lib/content/types.ts"

export const ALL_FILTER = "all" as const

type AllFilter = typeof ALL_FILTER

export type PublicationFilterOptions = {
  readonly types: readonly PublicationType[]
  readonly topics: readonly PublicationTopic[]
  readonly years: readonly number[]
}

export type PublicationFilters = {
  readonly type: PublicationType | AllFilter
  readonly topic: PublicationTopic | AllFilter
  readonly year: number | AllFilter
}

export type PublicationAction = {
  readonly kind: keyof PublicationLinks
  readonly label: "Paper" | "Code" | "Project"
  readonly href: string
}

export const getPublicationFilterOptions = (
  records: readonly Publication[],
): PublicationFilterOptions => ({
  types: [...new Set(records.map(({ type }) => type))].toSorted(),
  topics: [...new Set(records.map(({ topic }) => topic))].toSorted(),
  years: [...new Set(records.map(({ year }) => year))].toSorted((left, right) => right - left),
})

const parseStringOption = <Option extends string>(
  value: unknown,
  allowed: readonly Option[],
): Option | AllFilter => {
  if (typeof value !== "string") return ALL_FILTER
  return allowed.find((option) => option === value) ?? ALL_FILTER
}

export const parsePublicationFilters = (
  query: Readonly<Record<string, unknown>>,
  options: PublicationFilterOptions,
): PublicationFilters => {
  const yearValue = query["year"]
  const year = typeof yearValue === "string"
    ? options.years.find((option) => String(option) === yearValue) ?? ALL_FILTER
    : ALL_FILTER

  return {
    type: parseStringOption(query["type"], options.types),
    topic: parseStringOption(query["topic"], options.topics),
    year,
  }
}

export const serializePublicationFilters = (
  filters: PublicationFilters,
): Readonly<Record<string, string>> => ({
  ...(filters.type === ALL_FILTER ? {} : { type: filters.type }),
  ...(filters.topic === ALL_FILTER ? {} : { topic: filters.topic }),
  ...(filters.year === ALL_FILTER ? {} : { year: String(filters.year) }),
})

export const filterPublications = (
  records: readonly Publication[],
  filters: PublicationFilters,
): readonly Publication[] => records.filter((publication) =>
  (filters.type === ALL_FILTER || publication.type === filters.type) &&
  (filters.topic === ALL_FILTER || publication.topic === filters.topic) &&
  (filters.year === ALL_FILTER || publication.year === filters.year),
)

export const publicationActions = (publication: Publication): readonly PublicationAction[] => {
  const links = publication.links
  if (links === undefined) return []
  return [
    ...(links.paper === undefined ? [] : [{ kind: "paper", label: "Paper", href: links.paper }] as const),
    ...(links.code === undefined ? [] : [{ kind: "code", label: "Code", href: links.code }] as const),
    ...(links.project === undefined ? [] : [{ kind: "project", label: "Project", href: links.project }] as const),
  ]
}

export const formatPublicationTag = (value: string): string => value
  .split("-")
  .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
  .join(" ")
