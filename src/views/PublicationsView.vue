<script setup lang="ts">
import { computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"

import PublicationCard from "../components/publications/PublicationCard.vue"
import PublicationFilters from "../components/publications/PublicationFilters.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import {
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
      <p
        class="publications-view__count"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ visiblePublications.length }} {{ visiblePublications.length === 1 ? "publication" : "publications" }}
      </p>
    </div>

    <div
      v-if="visiblePublications.length > 0"
      class="publication-list"
    >
      <PublicationCard
        v-for="publication in visiblePublications"
        :key="publication.id"
        :publication="publication"
      />
    </div>
    <div
      v-else
      class="publications-view__empty"
      role="status"
    >
      <p class="eyebrow">
        No matching records
      </p>
      <h2>Try a broader combination.</h2>
      <p>The selected type, topic, and year do not overlap in the current publication collection.</p>
    </div>
  </section>
</template>
