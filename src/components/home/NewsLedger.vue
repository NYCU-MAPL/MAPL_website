<script setup lang="ts">
import { ArrowUpRight, ChevronDown } from "@lucide/vue"
import { computed, ref, useId } from "vue"

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
type NewsEntry = NewsItem & { readonly headlines: readonly PublicationHeadline[] }

const presentedItems = computed((): readonly NewsEntry[] => {
  const publicationsById = new Map(props.publications.map((publication) => [publication.id, publication]))
  return props.items.map((item) => {
    const match = item.category === "research" ? /^(.*?) accepted to (.+)$/u.exec(item.title) : null
    const papers = (item.publicationIds ?? []).flatMap((id) => {
      const paper = publicationsById.get(id)
      return paper ? [paper] : []
    })
    const headlines: readonly PublicationHeadline[] = !match ? [] : papers.length > 1
      ? papers.map((paper) => ({
        title: paper.title.split(":")[0] ?? paper.title,
        fullTitle: paper.title,
        venue: match[2] ?? "",
        ...(paper.links?.paper ? { href: paper.links.paper } : {}),
      }))
      : [{
        title: match[1] ?? item.title,
        ...(papers[0] ? { fullTitle: papers[0].title } : {}),
        venue: match[2] ?? "",
        ...(papers[0]?.links?.paper ? { href: papers[0].links.paper } : {}),
      }]
    return { ...item, headlines }
  })
})

const PREVIEW_LIMIT = 8
const categories = [
  { value: "all", label: "All" },
  { value: "research", label: "Research" },
  { value: "people", label: "People" },
  { value: "awards", label: "Awards" },
  { value: "events", label: "Events" },
  { value: "opportunities", label: "Opportunities" },
] as const satisfies readonly { value: NewsCategory | "all"; label: string }[]

const selectedCategory = ref<NewsCategory | "all">("all")
const expanded = ref(false)
const timelineId = useId()
const filteredItems = computed(() => presentedItems.value.filter((item) =>
  selectedCategory.value === "all" || item.category === selectedCategory.value,
))
const visibleItems = computed(() => expanded.value
  ? filteredItems.value
  : filteredItems.value.slice(0, PREVIEW_LIMIT),
)
const yearGroups = computed(() => {
  const groups = new Map<string, NewsEntry[]>()
  for (const item of visibleItems.value) {
    const year = item.date.slice(0, 4)
    const group = groups.get(year)
    if (group) group.push(item)
    else groups.set(year, [item])
  }
  return [...groups].map(([year, items]) => ({ year, items }))
})

const selectCategory = (category: NewsCategory | "all"): void => {
  selectedCategory.value = category
  expanded.value = false
}
const displayDate = (date: string, includeYear = false): string =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    ...(includeYear ? { year: "numeric" as const } : {}),
    timeZone: "UTC",
  }).format(new Date(`${date.slice(0, 7)}-01T00:00:00Z`))
</script>

<template>
  <div class="news-ledger">
    <div class="news-filters" role="group" aria-label="News category">
      <button
        v-for="category in categories"
        :key="category.value"
        class="news-filter"
        type="button"
        :aria-pressed="selectedCategory === category.value"
        :aria-controls="timelineId"
        @click="selectCategory(category.value)"
      >{{ category.label }}</button>
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
              >Recruiting</span>
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
                {{ item.title.split(item.inlineLink.text)[0] }}<a
                  :href="item.inlineLink.url"
                  target="_blank"
                  rel="noreferrer"
                  :aria-label="`${item.inlineLink.text} (opens in a new tab)`"
                ><strong>{{ item.inlineLink.text }}</strong></a>{{ item.title.split(item.inlineLink.text)[1] }}
              </template>
              <span v-else>{{ item.title }}</span>
              <a
                v-if="item.url && !item.headlines.some((headline) => headline.href === item.url)"
                class="news-entry__source"
                :href="item.url"
                target="_blank"
                rel="noreferrer"
                :aria-label="`Source: ${item.title} (opens in a new tab)`"
                :title="`Source: ${item.title}`"
              ><span>src</span><ArrowUpRight :size="16" aria-hidden="true" /></a>
            </p>
          </li>
        </ol>
      </section>
      <p v-if="filteredItems.length === 0" class="news-ledger__empty">No news in this category yet.</p>
    </div>

    <button
      v-if="filteredItems.length > PREVIEW_LIMIT"
      class="news-ledger__toggle"
      type="button"
      :aria-expanded="expanded"
      :aria-controls="timelineId"
      @click="expanded = !expanded"
    >
      {{ expanded ? "Show less" : "Show older news" }}
      <span v-if="!expanded">({{ filteredItems.length - PREVIEW_LIMIT }})</span>
      <ChevronDown :size="16" aria-hidden="true" :class="{ 'is-expanded': expanded }" />
    </button>
  </div>
</template>
