<script setup lang="ts">
import { ArrowRight } from "@lucide/vue"
import { RouterLink } from "vue-router"

import type { Publication } from "../../lib/content/types.ts"
import { resolveMediaPath } from "../../lib/presentation/home-about.ts"

defineProps<{
  readonly publications: readonly Publication[]
}>()

const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <div class="publication-highlights">
    <article
      v-for="publication in publications"
      :key="publication.id"
      class="publication-highlight"
    >
      <img
        :src="resolveMediaPath(baseUrl, publication.image.src)"
        :alt="publication.image.alt"
        width="720"
        height="420"
        loading="lazy"
      >
      <div class="publication-highlight__content">
        <p class="publication-highlight__meta">
          {{ publication.year }} · {{ publication.venue }}
        </p>
        <h3>{{ publication.title }}</h3>
        <p>{{ publication.summary }}</p>
      </div>
    </article>
  </div>
  <RouterLink
    class="route-action"
    to="/publications"
  >
    Explore all publications
    <ArrowRight
      :size="18"
      aria-hidden="true"
    />
  </RouterLink>
</template>
