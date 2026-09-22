export const MEMBER_STATUSES = ["advisor", "current", "alumni"] as const
export const MEMBER_ROLES = [
  "advisor",
  "visiting-researcher",
  "phd-student",
  "masters-student",
  "undergraduate-student",
  "alumnus",
] as const
export const MEMBER_GROUPS = [
  "advisor",
  "visiting-researchers",
  "phd-students",
  "masters-students",
  "undergraduate-students",
  "phd-graduates",
  "masters-graduates",
  "alumni",
] as const
export const PUBLICATION_TYPES = ["conference", "journal"] as const
export const PUBLICATION_TOPICS = [
  "learned-image-compression",
  "learned-video-compression",
  "gaussian-splatting",
  "human-pose-estimation",
  "image-restoration",
  "video-synthesis",
  "semantic-segmentation",
] as const

export type MemberStatus = (typeof MEMBER_STATUSES)[number]
export type MemberRole = (typeof MEMBER_ROLES)[number]
export type MemberGroup = (typeof MEMBER_GROUPS)[number]
export type PublicationType = (typeof PUBLICATION_TYPES)[number]
export type PublicationTopic = (typeof PUBLICATION_TOPICS)[number]

export type ContentImage = {
  readonly src: string
  readonly alt: string
}

export type NewsItem = {
  readonly id: string
  readonly date: string
  readonly title: string
  readonly summary: string
  readonly url?: string
  readonly image?: ContentImage
  readonly featured: boolean
}

export type Member = {
  readonly id: string
  readonly name: string
  readonly nativeName?: string
  readonly nickname?: string
  readonly status: MemberStatus
  readonly role: MemberRole
  readonly group: MemberGroup
  readonly enrollmentYear?: number
  readonly graduationYear?: number
  readonly affiliation?: string
  readonly image?: ContentImage
  readonly email?: string
  readonly website?: string
  readonly scholarUrl?: string
}

export type PublicationLinks = {
  readonly paper?: string
  readonly code?: string
  readonly project?: string
}

export type Publication = {
  readonly id: string
  readonly title: string
  readonly authors: readonly string[]
  readonly venue: string
  readonly year: number
  readonly summary: string
  readonly topic: PublicationTopic
  readonly type: PublicationType
  readonly featured: boolean
  readonly image: ContentImage
  readonly links?: PublicationLinks
}

export type ContentCollections = {
  readonly news: readonly NewsItem[]
  readonly members: readonly Member[]
  readonly publications: readonly Publication[]
}
