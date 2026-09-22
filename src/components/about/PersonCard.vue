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

const academicYear = computed(() => {
  if (!props.member.enrollmentYear || props.member.role !== "masters-student") return null
  const currentYear = new Date().getFullYear()
  return currentYear - props.member.enrollmentYear + 1
})
</script>

<template>
  <article
    class="person-card"
    :class="{
      'person-card--prominent': prominent,
      'person-card--advisor': member.role === 'advisor'
    }"
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
      <div class="person-card__name-section">
        <h3>
          <span v-if="member.nativeName" lang="zh-Hant">{{ member.nativeName }}</span>
          <span v-if="member.nickname"> ({{ member.nickname }})</span>
        </h3>
        <p v-if="!member.affiliation" class="person-card__english-name">{{ member.name }}</p>
        <p v-else class="person-card__english-name">Prof. {{ member.name }}</p>
      </div>

      <!-- 教授詳細資訊 -->
      <div v-if="member.role === 'advisor'" class="person-card__advisor-info">
        <p class="person-card__affiliation">NYCU Computer Science</p>
        <p class="person-card__research"><strong>Research:</strong> Machine/deep learning, Video coding</p>
        <p class="person-card__office"><strong>Office:</strong> Room 431, Eng. Bldg 3</p>
      </div>

      <nav
        class="person-card__links"
        aria-label="Profile links"
      >
        <a
          v-if="member.email"
          class="person-card__link"
          :href="`mailto:${member.email}`"
        >
          Email
        </a>
        <a
          v-if="member.website"
          class="person-card__link"
          :href="member.website"
          target="_blank"
          rel="noreferrer"
        >
          Website
        </a>
      </nav>
    </div>
  </article>
</template>
