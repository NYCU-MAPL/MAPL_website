<script setup lang="ts">
import { ArrowUpRight, Image as ImageIcon, ZoomIn } from "@lucide/vue"
import { computed, ref } from "vue"

import {
  formatPublicationDate,
  formatPublicationTag,
  isRecentPublication,
  publicationActions,
} from "../../features/publications/filters.ts"
import { resolveMediaPath } from "../../lib/media-path.ts"
import type { Publication } from "../../lib/content/types.ts"
import ImageLightbox from "../ui/ImageLightbox.vue"

const props = defineProps<{
  readonly publication: Publication
}>()

const actions = publicationActions(props.publication)
const isNew = computed(() => isRecentPublication(props.publication))
const abstractExpanded = ref(false)
const imageExpanded = ref(false)
const abstractTriggerId = `publication-${props.publication.id}-abstract-trigger`
const abstractPanelId = `publication-${props.publication.id}-abstract-panel`
</script>

<template>
  <article class="publication-card">
    <figure v-if="publication.image" class="publication-card__media">
      <button
        class="publication-card__image-trigger"
        type="button"
        :aria-label="`Enlarge figure: ${publication.title}`"
        aria-haspopup="dialog"
        title="Enlarge figure"
        @click="imageExpanded = true"
      >
        <img
          :src="resolveMediaPath(publication.image.src)"
          :alt="publication.image.alt"
          loading="lazy"
          decoding="async"
        >
        <span class="publication-card__zoom" aria-hidden="true"><ZoomIn :size="16" /></span>
      </button>
    </figure>
    <div
      v-else
      class="publication-card__media publication-card__media--placeholder"
      role="img"
      aria-label="Figure not yet available"
    >
      <ImageIcon :size="28" :stroke-width="1.5" aria-hidden="true" />
    </div>
    <ImageLightbox
      v-if="imageExpanded && publication.image"
      :src="resolveMediaPath(publication.image.src)"
      :alt="publication.image.alt"
      :label="`${publication.title} figure`"
      @close="imageExpanded = false"
    />
    <div class="publication-card__body">
      <div class="publication-card__register">
        <span>{{ formatPublicationDate(publication) }}</span>
        <span>{{ formatPublicationTag(publication.type) }}</span>
        <span>{{ formatPublicationTag(publication.topic) }}</span>
      </div>
      <h3>
        <span v-if="isNew" class="publication-card__new-badge" title="Published within the last three months">NEW</span>{{ publication.title }}
      </h3>
      <p class="publication-card__authors">
        {{ publication.authors.join(", ") }}
      </p>
      <p class="publication-card__venue">
        {{ publication.venue }}
      </p>
      <nav
        v-if="actions.length > 0 || publication.summary"
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
        <button
          v-if="publication.summary"
          :id="abstractTriggerId"
          class="publication-card__abstract-toggle"
          type="button"
          :aria-expanded="abstractExpanded"
          :aria-controls="abstractPanelId"
          @click="abstractExpanded = !abstractExpanded"
        >
          {{ abstractExpanded ? "Hide abstract" : "Show abstract" }}
        </button>
      </nav>
      <p
        v-if="abstractExpanded && publication.summary"
        :id="abstractPanelId"
        class="publication-card__summary"
        role="region"
        :aria-labelledby="abstractTriggerId"
      >
        {{ publication.summary }}
      </p>
    </div>
  </article>
</template>
