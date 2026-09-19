<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue"

import { formatPublicationTag, publicationActions } from "../../features/publications/filters.ts"
import { resolveMediaPath } from "../../lib/media-path.ts"
import type { Publication } from "../../lib/content/types.ts"

const props = defineProps<{
  readonly publication: Publication
}>()

const actions = publicationActions(props.publication)
</script>

<template>
  <article class="publication-card">
    <figure class="publication-card__media">
      <img
        :src="resolveMediaPath(publication.image.src)"
        :alt="publication.image.alt"
        loading="lazy"
        decoding="async"
      >
    </figure>
    <div class="publication-card__body">
      <div class="publication-card__register">
        <span>{{ publication.year }}</span>
        <span>{{ formatPublicationTag(publication.type) }}</span>
        <span>{{ formatPublicationTag(publication.topic) }}</span>
      </div>
      <h2>{{ publication.title }}</h2>
      <p class="publication-card__authors">
        {{ publication.authors.join(", ") }}
      </p>
      <p class="publication-card__venue">
        {{ publication.venue }}
      </p>
      <p class="publication-card__summary">
        {{ publication.summary }}
      </p>
      <nav
        v-if="actions.length > 0"
        class="publication-card__actions"
        :aria-label="`${publication.title} resources`"
      >
        <a
          v-for="action in actions"
          :key="action.kind"
          :href="action.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ action.label }}
          <ArrowUpRight
            :size="16"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
  </article>
</template>
