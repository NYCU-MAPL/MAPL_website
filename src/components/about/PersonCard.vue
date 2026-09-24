<script setup lang="ts">
import { Check, Copy, ExternalLink } from "@lucide/vue"
import { computed, onUnmounted, ref, watch } from "vue"

import type { Member } from "../../lib/content/types.ts"
import { resolveMediaPath } from "../../lib/presentation/home-about.ts"

const props = withDefaults(defineProps<{
  readonly member: Member
  readonly prominent?: boolean
  readonly showEmail?: boolean
}>(), {
  showEmail: true,
})

type CopyStatus = "idle" | "copied" | "error"

const baseUrl = import.meta.env.BASE_URL
const copyStatus = ref<CopyStatus>("idle")
let copyStatusTimeout: ReturnType<typeof setTimeout> | undefined
let copyAttempt = 0

const resetCopyStatus = (): void => {
  copyAttempt += 1
  if (copyStatusTimeout !== undefined) {
    clearTimeout(copyStatusTimeout)
    copyStatusTimeout = undefined
  }
  copyStatus.value = "idle"
}

const copyFeedback = computed(() => {
  if (copyStatus.value === "copied") {
    return "Copied"
  }
  if (copyStatus.value === "error") {
    return "Copy unavailable"
  }
  return ""
})

const copyEmail = async (): Promise<void> => {
  const email = props.member.email
  if (email === undefined) {
    return
  }

  resetCopyStatus()
  const activeCopyAttempt = copyAttempt

  let copied = false
  try {
    if (navigator.clipboard !== undefined) {
      try {
        await navigator.clipboard.writeText(email)
        copied = true
      } catch {
        copied = false
      }
    }

    if (!copied) {
      const textarea = document.createElement("textarea")
      textarea.value = email
      textarea.readOnly = true
      textarea.style.position = "fixed"
      textarea.style.insetInlineStart = "-9999px"
      document.body.append(textarea)
      try {
        textarea.select()
        copied = document.execCommand("copy")
      } catch {
        copied = false
      } finally {
        textarea.remove()
      }
    }
  } catch {
    copied = false
  }

  if (activeCopyAttempt !== copyAttempt || !props.showEmail) {
    return
  }

  copyStatus.value = copied ? "copied" : "error"
  copyStatusTimeout = setTimeout(() => {
    copyStatus.value = "idle"
    copyStatusTimeout = undefined
  }, 1200)
}

watch(() => props.showEmail, (showEmail) => {
  if (!showEmail) {
    resetCopyStatus()
  }
})

onUnmounted(resetCopyStatus)
</script>

<template>
  <article
    class="person-card"
    :class="{ 'person-card--prominent': prominent, 'person-card--advisor': member.role === 'advisor' }"
  >
    <component
      :is="member.website ? 'a' : 'div'"
      class="person-card__portrait"
      :class="{ 'person-card__portrait-link': member.website }"
      :href="member.website"
      :target="member.website ? '_blank' : undefined"
      :rel="member.website ? 'noopener noreferrer' : undefined"
      :aria-label="member.website ? `Visit ${member.name}'s website` : undefined"
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
        :is="member.website ? 'a' : 'div'"
        :class="{ 'person-card__name-link': member.website }"
        :href="member.website"
        :target="member.website ? '_blank' : undefined"
        :rel="member.website ? 'noopener noreferrer' : undefined"
      >
        <div class="person-card__name-section">
          <h3>
            <span class="person-card__primary-name">
              <span
                v-if="member.nativeName"
                lang="zh-Hant"
              >{{ member.nativeName }}</span>
              <span v-if="member.nickname"> ({{ member.nickname }})</span>
            </span>
            <ExternalLink
              v-if="member.website"
              class="person-card__external-icon"
              :size="14"
              aria-hidden="true"
            />
          </h3>
          <p
            v-if="!member.affiliation"
            class="person-card__english-name"
            :class="{ 'person-card__english-name--with-email': member.role !== 'advisor' && member.email && showEmail }"
          >
            {{ member.name }}
          </p>
          <p
            v-else-if="member.role === 'advisor'"
            class="person-card__english-name"
            :class="{ 'person-card__english-name--with-email': member.role !== 'advisor' && member.email && showEmail }"
          >
            Prof. {{ member.name }}
          </p>
          <p
            v-else
            class="person-card__english-name"
            :class="{ 'person-card__english-name--with-email': member.role !== 'advisor' && member.email && showEmail }"
          >
            {{ member.affiliation }}
          </p>
        </div>
      </component>

      <button
        v-if="member.role !== 'advisor' && member.email && showEmail"
        class="person-card__email-copy"
        type="button"
        :aria-label="`Copy ${member.name}'s email address`"
        @click="copyEmail"
      >
        <span
          class="person-card__email-address"
          :title="member.email"
        >{{ member.email }}</span>
        <span class="person-card__copy-state">
          <Check
            v-if="copyStatus === 'copied'"
            :size="14"
            aria-hidden="true"
          />
          <Copy
            v-else
            :size="14"
            aria-hidden="true"
          />
          <span
            aria-hidden="true"
          >{{ copyFeedback }}</span>
        </span>
      </button>
      <span
        v-if="member.role !== 'advisor' && member.email && showEmail"
        class="person-card__email-live"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >{{ copyFeedback }}</span>

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
        <p class="person-card__email">
          <strong>Email:</strong>
          <button
            v-if="member.email && showEmail"
            class="person-card__email-copy person-card__email-copy--advisor"
            type="button"
            :aria-label="`Copy ${member.name}'s email address`"
            @click="copyEmail"
          >
            <span
              class="person-card__email-address"
              :title="member.email"
            >{{ member.email }}</span>
            <span class="person-card__copy-state">
              <Check
                v-if="copyStatus === 'copied'"
                :size="14"
                aria-hidden="true"
              />
              <Copy
                v-else
                :size="14"
                aria-hidden="true"
              />
              <span aria-hidden="true">{{ copyFeedback }}</span>
            </span>
          </button>
          <span
            v-if="member.email && showEmail"
            class="person-card__email-live"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >{{ copyFeedback }}</span>
        </p>
      </div>
    </div>
  </article>
</template>
