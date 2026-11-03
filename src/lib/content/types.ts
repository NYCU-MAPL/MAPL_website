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
export const NEWS_CATEGORIES = ["research", "people", "awards", "events", "opportunities"] as const
// Research topic filters follow this manual display order.
export const PUBLICATION_TOPICS = [
  "learned-image-compression",
  "learned-video-compression",
  "3d-gaussian-compression",
  "4d-gaussian-compression",
  "human-pose-estimation",
  "point-cloud-compression",
  "image-restoration",
  "video-synthesis",
  "semantic-segmentation",
  "coding-for-machines",
  "video-encoder-control",
  "video-prediction",
  "incremental-learning",
  "visual-question-answering",
  "generative-modeling",
  "autonomous-flight",
] as const

export type MemberStatus = (typeof MEMBER_STATUSES)[number]
export type MemberRole = (typeof MEMBER_ROLES)[number]
export type MemberGroup = (typeof MEMBER_GROUPS)[number]
export type PublicationType = (typeof PUBLICATION_TYPES)[number]
export type NewsCategory = (typeof NEWS_CATEGORIES)[number]
export type PublicationTopic = (typeof PUBLICATION_TOPICS)[number]

export type ContentImage = {
  readonly src: string
  readonly alt: string
}

export type NewsItem = {
  readonly id: string
  readonly date: string
  readonly title: string
  readonly category: NewsCategory
  readonly publicationIds?: readonly string[]
  readonly inlineLink?: {
    readonly text: string
    readonly url: string
  }
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
  readonly month?: number
  readonly summary?: string
  readonly topic: PublicationTopic
  readonly type: PublicationType
  readonly featured: boolean
  readonly image?: ContentImage
  readonly links?: PublicationLinks
}

export type ContentCollections = {
  readonly news: readonly NewsItem[]
  readonly members: readonly Member[]
  readonly publications: readonly Publication[]
}
