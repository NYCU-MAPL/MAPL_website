<script setup lang="ts">
import { computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

import PublicationCard from "../components/publications/PublicationCard.vue"
import PublicationFilters from "../components/publications/PublicationFilters.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import {
  ALL_FILTER,
  formatPublicationTag,
  filterPublications,
  getPublicationFilterOptions,
  parsePublicationFilters,
  serializePublicationFilters,
  type PublicationFilters as Filters,
} from "../features/publications/filters.ts"
import { publications } from "../lib/content/loaders.ts"
import "../styles/publications.css"

const route = useRoute()
const router = useRouter()
const options = getPublicationFilterOptions(publications)
const filters = computed(() => parsePublicationFilters(route.query, options))
const visiblePublications = computed(() => filterPublications(publications, filters.value))

const publicationSections = computed(() => filters.value.topics.length === 0
  ? [{ id: ALL_FILTER, title: "All research", publications: visiblePublications.value }]
  : filters.value.topics.map((topic) => ({
    id: topic,
    title: formatPublicationTag(topic),
    publications: visiblePublications.value.filter((publication) => publication.topic === topic),
  })),
)
const hasFilters = computed(() => filters.value.topics.length > 0 || filters.value.type !== ALL_FILTER || filters.value.years.length > 0)
const resetFilters = (): void => replaceFilters({ type: ALL_FILTER, topics: [], years: [] })

const queryMatches = (query: Readonly<Record<string, unknown>>, canonical: Readonly<Record<string, string>>): boolean => {
  const queryKeys = Object.keys(query)
  const canonicalKeys = Object.keys(canonical)
  return queryKeys.length === canonicalKeys.length && canonicalKeys.every((key) => query[key] === canonical[key])
}

const replaceFilters = (nextFilters: Filters): void => {
  const query = serializePublicationFilters(nextFilters)
  if (!queryMatches(route.query, query)) {
    void router.replace({ name: "publications", query })
  }
}

watch(
  () => route.query,
  (query) => {
    const sanitized = parsePublicationFilters(query, options)
    const canonical = serializePublicationFilters(sanitized)
    if (!queryMatches(query, canonical)) {
      void router.replace({ name: "publications", query: canonical })
    }
  },
  { immediate: true },
)
</script>

<template>
  <section
    class="publications-view"
  >
    <SectionHeading
      title="Publications"
      label="MAPL · Research showcase"
      :level="1"
    >
      <p>Selected work in visual data coding, neural media systems, and machine perception.</p>
    </SectionHeading>

    <div class="publications-view__controls">
      <PublicationFilters
        :filters="filters"
        :options="options"
        @change="replaceFilters"
      />
    </div>

    <div class="publications-view__sections">
      <section
        v-for="(section, sectionIndex) in publicationSections"
        :key="section.id"
        class="publication-section"
        :aria-labelledby="`publication-topic-${section.id}`"
      >
        <header class="publications-view__results-heading">
          <h2 :id="`publication-topic-${section.id}`">{{ section.title }}</h2>
          <p class="publications-view__count" aria-live="polite" aria-atomic="true">
            {{ section.publications.length }} of {{ publications.length }} papers
          </p>
          <button v-if="hasFilters && sectionIndex === 0" class="publication-filters__reset" type="button" @click="resetFilters">Clear filters</button>
        </header>
        <div v-if="section.publications.length > 0" class="publication-list">
          <PublicationCard
            v-for="publication in section.publications"
            :key="publication.id"
            :publication="publication"
          />
        </div>
        <div v-else class="publications-view__empty" role="status">
          <p>No papers match the selected topic, year, and type. Try a broader combination.</p>
          <button class="publication-filter-chip" type="button" @click="resetFilters">Show all papers</button>
        </div>
      </section>
    </div>
  </section>
</template>
