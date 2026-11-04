<script setup lang="ts">
import { ArrowRight, ArrowUpRight, Award, CalendarDays, ChevronDown, FlaskConical, Grid2X2, Pin, UserPlus, Users } from "@lucide/vue"
import { computed, nextTick, ref, useId } from "vue"
import type { Component } from "vue"
import { RouterLink } from "vue-router"

import HighlightedText from "../ui/HighlightedText.vue"
import type { NewsCategory, NewsItem, Publication } from "../../lib/content/types.ts"

const props = defineProps<{
  readonly items: readonly NewsItem[]
  readonly publications: readonly Publication[]
}>()

type PublicationHeadline = {
  readonly title: string
  readonly fullTitle?: string
  readonly venue: string
  readonly href?: string
}
type NewsEntry = NewsItem & {
  readonly headlines: readonly PublicationHeadline[]
  readonly showSource: boolean
}

const presentedItems = computed((): readonly NewsEntry[] => {
  const publicationsById = new Map(props.publications.map((publication) => [publication.id, publication]))
  return props.items.map((item) => {
    const match = item.category === "research" ? /^(.*?) accepted to (.+)$/u.exec(item.title) : null
    const papers = (item.publicationIds ?? []).flatMap((id) => {
      const paper = publicationsById.get(id)
      return paper ? [paper] : []
    })
    const allPapers = [
      ...papers.map((paper) => ({ title: paper.title, href: paper.links?.paper })),
      ...(item.additionalPapers ?? []).map((paper) => ({ title: paper.title, href: paper.url })),
    ]
    const headlines: readonly PublicationHeadline[] = !match ? [] : allPapers.length > 1
      ? allPapers.map((paper) => ({
        title: paper.title.split(":")[0] ?? paper.title,
        fullTitle: paper.title,
        venue: match[2] ?? "",
        ...(paper.href ? { href: paper.href } : {}),
      }))
      : [{
        title: match[1] ?? item.title,
        ...(allPapers[0] ? { fullTitle: allPapers[0].title } : {}),
        venue: match[2] ?? "",
        ...(allPapers[0]?.href ? { href: allPapers[0].href } : {}),
      }]
    const announcementDuplicatesSource = item.resources?.some((resource) =>
      resource.label.trim().toLowerCase() === "original announcement" && resource.url === item.url,
    ) ?? false
    return {
      ...item,
      headlines,
      highlights: [...(item.highlights ?? []), ...allPapers.map((paper) => paper.title), ...(match?.[2] ? [match[2]] : [])],
      showSource: Boolean(item.url && !headlines.some((headline) => headline.href === item.url) && !announcementDuplicatesSource),
    }
  })
})

type NewsRange = "latest" | "recent" | "all"
const categories = [
  { value: "all", label: "All", icon: Grid2X2 },
  { value: "research", label: "Research", icon: FlaskConical },
  { value: "people", label: "People", icon: Users },
  { value: "awards", label: "Awards", icon: Award },
  { value: "events", label: "Events", icon: CalendarDays },
  { value: "opportunities", label: "Opportunities", icon: UserPlus },
] as const satisfies readonly { value: NewsCategory | "all"; label: string; icon: Component }[]

const selectedCategory = ref<NewsCategory | "all">("all")
const collapsedRange = computed(() => selectedCategory.value === "all" ? "latest" : "recent")
const visibleRange = ref<NewsRange>("latest")
const ledger = ref<HTMLDivElement>()
const expandedDetailId = ref<string | null>(null)
const toggleDetails = (id: string): void => {
  expandedDetailId.value = expandedDetailId.value === id ? null : id
}
const timelineId = useId()
const filteredItems = computed(() => presentedItems.value.filter((item) =>
  selectedCategory.value === "all" || item.category === selectedCategory.value,
))
const latestYear = computed(() => props.items.reduce((year, item) =>
  Math.max(year, Number(item.date.slice(0, 4))), 0,
))
const latestItems = computed(() => filteredItems.value.filter((item) => Number(item.date.slice(0, 4)) === latestYear.value))
const recentItems = computed(() => filteredItems.value.filter((item) => Number(item.date.slice(0, 4)) >= latestYear.value - 2))
const collapsedItems = computed(() => collapsedRange.value === "latest" ? latestItems.value : recentItems.value)
const visibleItems = computed(() => visibleRange.value === "all"
  ? filteredItems.value
  : visibleRange.value === "recent" ? recentItems.value : latestItems.value,
)
const nextItems = computed(() => visibleRange.value === "latest" && recentItems.value.length > latestItems.value.length
  ? recentItems.value
  : filteredItems.value,
)
const moreCount = computed(() => nextItems.value.length - visibleItems.value.length)
const toggleLabel = computed(() => visibleRange.value === "all"
  ? `Show less: only ${collapsedRange.value === "latest" ? latestYear.value : `${latestYear.value - 2}–${latestYear.value}`} news`
  : visibleRange.value === "latest" && nextItems.value.length < filteredItems.value.length
    ? `Show more news through ${latestYear.value - 2}`
    : "Show more: all news",
)
const toggleTimeline = async (): Promise<void> => {
  if (visibleRange.value === "all") {
    visibleRange.value = collapsedRange.value
    expandedDetailId.value = null
    await nextTick()
    ledger.value?.scrollIntoView({ block: "start", behavior: "instant" })
    return
  }
  visibleRange.value = visibleRange.value === "latest" && nextItems.value.length < filteredItems.value.length
    ? "recent"
    : "all"
}
const yearGroups = computed(() => {
  const groups = new Map<string, NewsEntry[]>()
  for (const item of visibleItems.value) {
    const year = item.date.slice(0, 4)
    const group = groups.get(year)
    if (group) group.push(item)
    else groups.set(year, [item])
  }
  return [...groups].map(([year, items]) => ({
    year,
    items: items.toSorted((left, right) =>
      Number(right.category === "opportunities" && right.featured)
      - Number(left.category === "opportunities" && left.featured),
    ),
  }))
})

const selectCategory = (category: NewsCategory | "all"): void => {
  selectedCategory.value = category
  visibleRange.value = collapsedRange.value
  expandedDetailId.value = null
}
const displayDate = (date: string, includeYear = false): string =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    ...(includeYear ? { year: "numeric" as const } : {}),
    timeZone: "UTC",
  }).format(new Date(`${date.slice(0, 7)}-01T00:00:00Z`))
</script>

<template>
  <div ref="ledger" class="news-ledger">
    <div class="news-filters" role="group" aria-label="News category">
      <button
        v-for="category in categories"
        :key="category.value"
        class="news-filter"
        type="button"
        :aria-pressed="selectedCategory === category.value"
        :aria-controls="timelineId"
        @click="selectCategory(category.value)"
      >
        <component :is="category.icon" :size="16" aria-hidden="true" />
        <span>{{ category.label }}</span>
      </button>
    </div>

    <div :id="timelineId" class="news-timeline" aria-live="polite" aria-atomic="false">
      <section
        v-for="group in yearGroups"
        :key="group.year"
        class="news-year"
        :aria-labelledby="`${timelineId}-${group.year}`"
      >
        <h2 :id="`${timelineId}-${group.year}`" class="news-year__heading">{{ group.year }}</h2>
        <ol class="news-year__entries">
          <li
            v-for="item in group.items"
            :key="item.id"
            class="news-entry"
            :class="{ 'news-entry--recruiting': item.category === 'opportunities' && item.featured }"
          >
            <time :datetime="item.date" :aria-label="displayDate(item.date, true)">{{ displayDate(item.date) }}</time>
            <p class="news-entry__headline">
              <span
                v-if="item.category === 'opportunities' && item.featured"
                class="news-entry__recruiting-badge"
              ><Pin :size="12" role="img" aria-label="Pinned news" :aria-hidden="false" />Recruiting</span>
              <template v-if="item.headlines.length > 0">
                <template v-if="item.headlines.length > 1">
                  {{ item.headlines.length }} papers accepted to <strong>{{ item.headlines[0]?.venue }}</strong>{{ ": " }}
                </template>
                <template v-for="(headline, index) in item.headlines" :key="headline.title">
                  <span v-if="index > 0">{{ index === item.headlines.length - 1 ? " and " : ", " }}</span>
                  <a
                    v-if="headline.href"
                    class="news-entry__paper-link"
                    :href="headline.href"
                    target="_blank"
                    rel="noreferrer"
                    :aria-label="`${headline.venue}: ${headline.fullTitle ?? headline.title} (opens paper in a new tab)`"
                    :title="headline.fullTitle"
                  ><strong>{{ headline.title }}</strong></a>
                  <strong v-else :title="headline.fullTitle">{{ headline.title }}</strong>
                </template>
                <template v-if="item.headlines.length === 1">
                  {{ " accepted to " }}<strong>{{ item.headlines[0]?.venue }}</strong>
                </template>
              </template>
              <template v-else-if="item.inlineLink">
                <HighlightedText :text="item.title.split(item.inlineLink.text)[0] ?? ''" :highlights="item.highlights" /><a
                  :href="item.inlineLink.url"
                  target="_blank"
                  rel="noreferrer"
                  :aria-label="`${item.inlineLink.text} (opens in a new tab)`"
                ><strong>{{ item.inlineLink.text }}</strong></a><HighlightedText :text="item.title.split(item.inlineLink.text)[1] ?? ''" :highlights="item.highlights" />
              </template>
              <HighlightedText v-else :text="item.title" :highlights="item.highlights" />
              <a
                v-if="item.showSource"
                class="news-entry__source"
                :href="item.url"
                target="_blank"
                rel="noreferrer"
                :aria-label="`Source: ${item.title} (opens in a new tab)`"
                :title="`Source: ${item.title}`"
              ><span>src</span><ArrowUpRight :size="16" aria-hidden="true" /></a>
              <button
                class="news-entry__details-toggle"
                type="button"
                :aria-expanded="expandedDetailId === item.id"
                :aria-controls="`${timelineId}-${item.id}-details`"
                :aria-label="`Details: ${item.title}`"
                @click="toggleDetails(item.id)"
              >Details<ChevronDown :size="14" aria-hidden="true" /></button>
            </p>
            <div
              v-if="expandedDetailId === item.id"
              :id="`${timelineId}-${item.id}-details`"
              class="news-entry__details"
              role="region"
              :aria-label="`${item.title} details`"
            >
              <p><HighlightedText :text="item.summary" :highlights="item.highlights" /></p>
              <ul v-if="item.resources?.length" class="news-entry__resources">
                <li v-for="resource in item.resources" :key="resource.url">
                  <RouterLink v-if="resource.url.startsWith('/')" :to="resource.url">{{ resource.label }}<ArrowRight :size="14" aria-hidden="true" /></RouterLink>
                  <a v-else :href="resource.url" target="_blank" rel="noreferrer">{{ resource.label }}<ArrowUpRight :size="14" aria-hidden="true" /></a>
                </li>
              </ul>
            </div>
          </li>
        </ol>
      </section>
      <p v-if="visibleItems.length === 0" class="news-ledger__empty">No news in this category{{ visibleRange === "all" ? " yet" : ` for ${visibleRange === "latest" ? latestYear : `${latestYear - 2}–${latestYear}`}` }}.</p>
    </div>

    <button
      v-if="filteredItems.length > collapsedItems.length"
      class="news-ledger__toggle"
      type="button"
      :aria-expanded="visibleRange !== collapsedRange"
      :aria-controls="timelineId"
      :aria-label="toggleLabel"
      @click="toggleTimeline"
    >
      {{ visibleRange === "all" ? "Show less" : "Show more" }}
      <span v-if="visibleRange !== 'all'">({{ moreCount }})</span>
      <ChevronDown :size="16" aria-hidden="true" :class="{ 'is-expanded': visibleRange === 'all' }" />
    </button>
  </div>
</template>
