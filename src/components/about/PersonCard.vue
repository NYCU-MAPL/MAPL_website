<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue"
import { computed } from "vue"

import type { Member } from "../../lib/content/types.ts"
import { memberProfileLinks, resolveMediaPath } from "../../lib/presentation/home-about.ts"

const props = defineProps<{
  readonly member: Member
  readonly prominent?: boolean
}>()

const profileLinks = computed(() => memberProfileLinks(props.member))
const baseUrl = import.meta.env.BASE_URL
</script>

<template>
  <article
    class="person-card"
    :class="{ 'person-card--prominent': prominent }"
  >
    <div class="person-card__portrait">
      <img
        v-if="member.image"
        :src="resolveMediaPath(baseUrl, member.image.src)"
        :alt="member.image.alt"
        width="480"
        height="600"
        loading="lazy"
      >
      <span
        v-else
        aria-hidden="true"
      >{{ member.name.charAt(0) }}</span>
    </div>
    <div class="person-card__content">
      <p
        v-if="member.nickname || member.nativeName"
        class="person-card__identity"
      >
        <span
          v-if="member.nativeName"
          lang="zh-Hant"
        >{{ member.nativeName }}</span>
        <span v-if="member.nickname">Known as {{ member.nickname }}</span>
      </p>
      <h3>{{ member.name }}</h3>
      <p
        v-if="member.affiliation"
        class="person-card__affiliation"
      >
        {{ member.affiliation }}
      </p>
      <nav
        v-if="profileLinks.length > 0"
        aria-label="Profile links"
      >
        <a
          v-for="link in profileLinks"
          :key="link.label"
          class="text-action"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
          <ArrowUpRight
            :size="16"
            aria-hidden="true"
          />
        </a>
      </nav>
    </div>
  </article>
</template>
