import membersJson from "../../data/members.json" with { type: "json" }
import newsJson from "../../data/news.json" with { type: "json" }
import publicationsJson from "../../data/publications.json" with { type: "json" }
import { parseMembers } from "./parse-members.ts"
import { parseNews } from "./parse-news.ts"
import { parsePublications } from "./parse-publications.ts"
import type { ContentCollections } from "./types.ts"

export const loadContentCollections = (
  news: unknown,
  members: unknown,
  publications: unknown,
): ContentCollections => ({
  news: parseNews(news, "news.json"),
  members: parseMembers(members, "members.json"),
  publications: parsePublications(publications, "publications.json"),
})

export const content: ContentCollections = loadContentCollections(
  newsJson,
  membersJson,
  publicationsJson,
)

export const news = content.news
export const members = content.members
export const publications = content.publications
