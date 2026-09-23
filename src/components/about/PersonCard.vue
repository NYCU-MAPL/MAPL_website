<script setup lang="ts">
import { computed } from "vue"

import type { Member } from "../../lib/content/types.ts"
import { resolveMediaPath } from "../../lib/presentation/home-about.ts"

const props = defineProps<{
  readonly member: Member
  readonly prominent?: boolean
}>()

const baseUrl = import.meta.env.BASE_URL
const destination = computed<string | undefined>(() =>
  props.member.website ?? (props.member.email ? `mailto:${props.member.email}` : undefined),
)
</script>

<template>
  <article
    class="person-card"
    :class="{ 'person-card--prominent': prominent, 'person-card--advisor': member.role === 'advisor' }"
  >
    <component
      :is="destination ? 'a' : 'div'"
      class="person-card__portrait"
      :class="{ 'person-card__portrait-link': destination }"
      :href="destination"
      :target="member.website ? '_blank' : undefined"
      :rel="member.website ? 'noreferrer' : undefined"
      :aria-label="destination
        ? member.website ? `Visit ${member.name}'s website` : `Email ${member.name}`
        : undefined"
    >
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
    </component>
    <div class="person-card__content">
      <component
        :is="destination ? 'a' : 'div'"
        :class="{
          'person-card__name-link': destination,
          'person-card__name-link--website': member.website,
        }"
        :href="destination"
        :target="member.website ? '_blank' : undefined"
        :rel="member.website ? 'noreferrer' : undefined"
      >
        <div class="person-card__name-section">
          <h3>
            <span
              v-if="member.nativeName"
              lang="zh-Hant"
            >{{ member.nativeName }}</span>
            <span v-if="member.nickname"> ({{ member.nickname }})</span>
          </h3>
          <p
            v-if="!member.affiliation"
            class="person-card__english-name"
          >
            {{ member.name }}
          </p>
          <p
            v-else-if="member.role === 'advisor'"
            class="person-card__english-name"
          >
            Prof. {{ member.name }}
          </p>
          <p
            v-else
            class="person-card__english-name"
          >
            {{ member.affiliation }}
          </p>
        </div>
      </component>

      <!-- 教授詳細資訊 -->
      <div
        v-if="member.role === 'advisor'"
        class="person-card__advisor-info"
      >
        <p class="person-card__affiliation">
          NYCU Computer Science
        </p>
        <p class="person-card__research">
          <strong>Research:</strong> Machine/deep learning, Video coding
        </p>
        <p class="person-card__office">
          <strong>Office:</strong> Room 431, Eng. Bldg 3
        </p>
      </div>
    </div>
  </article>
</template>
