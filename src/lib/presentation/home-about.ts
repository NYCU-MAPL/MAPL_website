import type { Member, MemberGroup, NewsItem, Publication } from "../content/types.ts"

const CURRENT_GROUPS = [
  { group: "visiting-researchers", title: "Visiting researchers" },
  { group: "phd-students", title: "Ph.D. students" },
  { group: "masters-students", title: "Master's students" },
  { group: "undergraduate-students", title: "Undergraduate students" },
] as const satisfies readonly Readonly<{ group: MemberGroup; title: string }>[]

const ALUMNI_GROUPS = [
  { group: "phd-graduates", title: "Ph.D. graduates" },
  { group: "alumni", title: "Alumni" },
] as const satisfies readonly Readonly<{ group: MemberGroup; title: string }>[]

type CollectionState<T> =
  | Readonly<{ kind: "empty" }>
  | Readonly<{ kind: "populated"; items: readonly T[] }>

export type MemberGroupPresentation = Readonly<{
  group: MemberGroup
  title: string
  count: number
  members: readonly Member[]
}>

export type HomePresentation = Readonly<{
  news: CollectionState<NewsItem>
  featuredPublications: readonly Publication[]
}>

export type AboutPresentation = Readonly<{
  advisors: readonly Member[]
  currentGroups: readonly MemberGroupPresentation[]
  currentCount: number
  alumni:
    | Readonly<{ kind: "empty" }>
    | Readonly<{ kind: "populated"; count: number; groups: readonly MemberGroupPresentation[] }>
}>

export type ProfileLink = Readonly<{
  label: "Website" | "Google Scholar"
  href: string
}>

const membersInGroup = (
  members: readonly Member[],
  group: MemberGroup,
): readonly Member[] => members.filter((member) => member.group === group)

const populatedGroups = (
  members: readonly Member[],
  groups: readonly Readonly<{ group: MemberGroup; title: string }>[],
): readonly MemberGroupPresentation[] => groups.flatMap(({ group, title }) => {
  const groupedMembers = membersInGroup(members, group)
  return groupedMembers.length === 0
    ? []
    : [{ group, title, count: groupedMembers.length, members: groupedMembers }]
})

export const buildHomePresentation = (
  news: readonly NewsItem[],
  publications: readonly Publication[],
): HomePresentation => ({
  news: news.length === 0 ? { kind: "empty" } : { kind: "populated", items: news },
  featuredPublications: publications.filter(({ featured }) => featured).slice(0, 3),
})

export const buildAboutPresentation = (members: readonly Member[]): AboutPresentation => {
  const currentGroups = populatedGroups(members, CURRENT_GROUPS)
  const alumniGroups = populatedGroups(members, ALUMNI_GROUPS)
  const alumniCount = alumniGroups.reduce((total, group) => total + group.count, 0)

  return {
    advisors: membersInGroup(members, "advisor"),
    currentGroups,
    currentCount: currentGroups.reduce((total, group) => total + group.count, 0),
    alumni: alumniCount === 0
      ? { kind: "empty" }
      : { kind: "populated", count: alumniCount, groups: alumniGroups },
  }
}

export const memberProfileLinks = (member: Member): readonly ProfileLink[] => [
  ...(member.website === undefined ? [] : [{ label: "Website", href: member.website }] as const),
  ...(member.scholarUrl === undefined
    ? []
    : [{ label: "Google Scholar", href: member.scholarUrl }] as const),
]

export const resolveMediaPath = (baseUrl: string, source: string): string => `${baseUrl}${source}`
