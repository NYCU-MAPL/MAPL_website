<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue"
import { computed } from "vue"

import type { NewsItem } from "../../lib/content/types.ts"

const props = defineProps<{
  readonly items: readonly NewsItem[]
}>()

const recentItems = computed(() => props.items.slice(0, 5))
const archiveItems = computed(() => props.items.slice(5))

const displayDate = (date: string): string => {
  const [year, month] = date.split("-")
  return month === undefined
    ? year ?? date
    : new Intl.DateTimeFormat("en", { month: "short", year: "numeric", timeZone: "UTC" })
      .format(new Date(`${year}-${month}-01T00:00:00Z`))
}
</script>

<template>
  <div class="news-ledger">
    <article
      v-for="(item, index) in recentItems"
      :key="item.id"
      class="news-entry"
    >
      <div
        class="news-entry__index"
        aria-hidden="true"
      >
        {{ String(index + 1).padStart(2, "0") }}
      </div>
      <time :datetime="item.date">{{ displayDate(item.date) }}</time>
      <div class="news-entry__body">
        <h3>{{ item.title }}</h3>
        <p>{{ item.summary }}</p>
      </div>
      <a
        v-if="item.url"
        class="text-action news-entry__link"
        :href="item.url"
        target="_blank"
        rel="noreferrer"
        :aria-label="`Read more about ${item.title} (opens in a new tab)`"
      >
        Source
        <ArrowUpRight
          :size="16"
          aria-hidden="true"
        />
      </a>
    </article>

    <details
      v-if="archiveItems.length > 0"
      class="news-archive"
    >
      <summary>Open news archive <span>{{ archiveItems.length }} entries</span></summary>
      <article
        v-for="item in archiveItems"
        :key="item.id"
        class="news-archive__entry"
      >
        <time :datetime="item.date">{{ displayDate(item.date) }}</time>
        <div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <a
            v-if="item.url"
            class="text-action"
            :href="item.url"
            target="_blank"
            rel="noreferrer"
          >Source
            <ArrowUpRight
              :size="16"
              aria-hidden="true"
            />
          </a>
        </div>
      </article>
    </details>
  </div>
</template>
