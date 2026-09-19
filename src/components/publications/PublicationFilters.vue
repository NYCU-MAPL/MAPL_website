<script setup lang="ts">
import {
  ALL_FILTER,
  formatPublicationTag,
  type PublicationFilterOptions,
  type PublicationFilters,
} from "../../features/publications/filters.ts"

const props = defineProps<{
  readonly filters: PublicationFilters
  readonly options: PublicationFilterOptions
}>()

const emit = defineEmits<{
  change: [filters: PublicationFilters]
}>()

const selectedValue = (event: Event): string =>
  event.target instanceof HTMLSelectElement ? event.target.value : ALL_FILTER

const updateType = (event: Event): void => {
  const value = selectedValue(event)
  const type = props.options.types.find((option) => option === value) ?? ALL_FILTER
  emit("change", { ...props.filters, type })
}

const updateTopic = (event: Event): void => {
  const value = selectedValue(event)
  const topic = props.options.topics.find((option) => option === value) ?? ALL_FILTER
  emit("change", { ...props.filters, topic })
}

const updateYear = (event: Event): void => {
  const value = selectedValue(event)
  const year = props.options.years.find((option) => String(option) === value) ?? ALL_FILTER
  emit("change", { ...props.filters, year })
}
</script>

<template>
  <form
    class="publication-filters"
    aria-label="Filter publications"
    @submit.prevent
  >
    <div class="publication-filter">
      <label for="publication-type">Type</label>
      <select
        id="publication-type"
        :value="filters.type"
        @change="updateType"
      >
        <option :value="ALL_FILTER">
          All types
        </option>
        <option
          v-for="type in options.types"
          :key="type"
          :value="type"
        >
          {{ formatPublicationTag(type) }}
        </option>
      </select>
    </div>
    <div class="publication-filter">
      <label for="publication-topic">Topic</label>
      <select
        id="publication-topic"
        :value="filters.topic"
        @change="updateTopic"
      >
        <option :value="ALL_FILTER">
          All topics
        </option>
        <option
          v-for="topic in options.topics"
          :key="topic"
          :value="topic"
        >
          {{ formatPublicationTag(topic) }}
        </option>
      </select>
    </div>
    <div class="publication-filter">
      <label for="publication-year">Year</label>
      <select
        id="publication-year"
        :value="filters.year"
        @change="updateYear"
      >
        <option :value="ALL_FILTER">
          All years
        </option>
        <option
          v-for="year in options.years"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>
    </div>
  </form>
</template>
