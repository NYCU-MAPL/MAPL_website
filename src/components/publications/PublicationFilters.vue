<script setup lang="ts">
import { ALL_FILTER, formatPublicationTag, type PublicationFilterOptions, type PublicationFilters } from "../../features/publications/filters.ts"
import type { PublicationTopic } from "../../lib/content/types.ts"

const props = defineProps<{
  readonly filters: PublicationFilters
  readonly options: PublicationFilterOptions
}>()
const emit = defineEmits<{ change: [filters: PublicationFilters] }>()
const reset = (): void => emit("change", { type: ALL_FILTER, topics: [], years: [] })
const toggleTopic = (topic: PublicationTopic): void => {
  const topics = props.filters.topics.includes(topic)
    ? props.filters.topics.filter((selected) => selected !== topic)
    : [...props.filters.topics, topic]
  emit("change", { ...props.filters, topics })
}
const toggleYear = (year: number): void => {
  const years = props.filters.years.includes(year)
    ? props.filters.years.filter((selected) => selected !== year)
    : [...props.filters.years, year]
  emit("change", { ...props.filters, years })
}
</script>

<template>
  <form class="publication-filters" aria-label="Filter publications" @submit.prevent>
    <div class="publication-filters__intro">
      <span class="publication-filters__label">Select one or more research areas</span>
    </div>
    <div class="publication-filters__topics" role="group" aria-label="Research area">
      <button
        class="publication-filter-chip"
        type="button"
        :aria-pressed="filters.topics.length === 0"
        @click="emit('change', { ...props.filters, topics: [] })"
      >All topics</button>
      <button
        v-for="topic in options.topics"
        :key="topic"
        class="publication-filter-chip"
        type="button"
        :aria-pressed="filters.topics.includes(topic)"
        @click="toggleTopic(topic)"
      >{{ formatPublicationTag(topic) }}</button>
    </div>
    <div class="publication-filters__secondary">
      <div class="publication-filter-row" role="group" aria-label="Publication year">
        <span class="publication-filters__label">Year</span>
        <button type="button" :aria-pressed="filters.years.length === 0" @click="emit('change', { ...props.filters, years: [] })">All</button>
        <button v-for="year in options.years" :key="year" type="button" :aria-pressed="filters.years.includes(year)" @click="toggleYear(year)">{{ year }}</button>
      </div>
      <div class="publication-filter-row" role="group" aria-label="Publication type">
        <span class="publication-filters__label">Type</span>
        <button type="button" :aria-pressed="filters.type === ALL_FILTER" @click="emit('change', { ...props.filters, type: ALL_FILTER })">All</button>
        <button v-for="type in options.types" :key="type" type="button" :aria-pressed="filters.type === type" @click="emit('change', { ...props.filters, type })">{{ formatPublicationTag(type) }}</button>
      </div>
    </div>
  </form>
</template>
