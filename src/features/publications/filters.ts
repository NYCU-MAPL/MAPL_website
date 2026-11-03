import {
  PUBLICATION_TOPICS,
  type Publication,
  type PublicationLinks,
  type PublicationTopic,
  type PublicationType,
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
  readonly topics: readonly PublicationTopic[]
  readonly years: readonly number[]
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
  topics: PUBLICATION_TOPICS.filter((topic) => records.some((record) => record.topic === topic)),
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
  return {
    type: parseStringOption(query["type"], options.types),
    topics: parseMultipleOptions(query["topic"], options.topics),
    years: parseMultipleOptions(query["year"], options.years),
  }
}

const parseMultipleOptions = <Option extends string | number>(
  value: unknown,
  allowed: readonly Option[],
): readonly Option[] => {
  const values: unknown[] = Array.isArray(value) ? value : [value]
  const selected = new Set(values.flatMap((item) =>
    typeof item === "string" ? item.split(",").map((option) => option.trim()) : [],
  ))
  return allowed.filter((option) => selected.has(String(option)))
}

export const serializePublicationFilters = (
  filters: PublicationFilters,
): Readonly<Record<string, string>> => ({
  ...(filters.type === ALL_FILTER ? {} : { type: filters.type }),
  ...(filters.topics.length === 0 ? {} : {
    topic: PUBLICATION_TOPICS.filter((topic) => filters.topics.includes(topic)).join(","),
  }),
  ...(filters.years.length === 0 ? {} : {
    year: [...new Set(filters.years)].toSorted((left, right) => right - left).join(","),
  }),
})

export const filterPublications = (
  records: readonly Publication[],
  filters: PublicationFilters,
): readonly Publication[] => records.filter((publication) =>
  (filters.type === ALL_FILTER || publication.type === filters.type) &&
  (filters.topics.length === 0 || filters.topics.includes(publication.topic)) &&
  (filters.years.length === 0 || filters.years.includes(publication.year)),
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

const PUBLICATION_TAG_LABELS: Readonly<Record<string, string>> = {
  "3d-gaussian-compression": "3D Gaussian Splatting Compression",
  "4d-gaussian-compression": "4D Gaussian Splatting Compression",
}

export const formatPublicationTag = (value: string): string => PUBLICATION_TAG_LABELS[value] ?? value
  .split("-")
  .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
  .join(" ")

const PUBLICATION_MONTHS: Readonly<Record<number, string>> = {
  1: "Jan",
  2: "Feb",
  3: "Mar",
  4: "Apr",
  5: "May",
  6: "Jun",
  7: "Jul",
  8: "Aug",
  9: "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
}

export const formatPublicationDate = (publication: Publication): string =>
  publication.month === undefined
    ? String(publication.year)
    : `${PUBLICATION_MONTHS[publication.month]} ${publication.year}`

// Publication dates have month precision: include this month and the previous two.
export const isRecentPublication = (
  publication: Pick<Publication, "year" | "month">,
  now = new Date(),
): boolean => {
  if (publication.month === undefined) return false
  const ageInMonths = (now.getFullYear() - publication.year) * 12 + now.getMonth() + 1 - publication.month
  return ageInMonths >= 0 && ageInMonths < 3
}
