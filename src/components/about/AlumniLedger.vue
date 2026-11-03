<script setup lang="ts">
import { ChevronDown, ExternalLink } from "@lucide/vue"
import { computed, ref } from "vue"

import type { MemberGroup } from "../../lib/content/types.ts"
import { resolveMediaPath } from "../../lib/media-path.ts"
import type { MemberGroupPresentation } from "../../lib/presentation/home-about.ts"

const props = withDefaults(defineProps<{
  readonly groups: readonly MemberGroupPresentation[]
  readonly showEmail?: boolean
}>(), { showEmail: false })

const PREVIEW_LIMIT = 8
const expandedGroups = ref<readonly MemberGroup[]>([])
const displayedGroups = computed(() => props.groups.map((group) => {
  const expanded = expandedGroups.value.includes(group.group)
  return {
    ...group,
    expanded,
    visibleMembers: expanded ? group.members : group.members.slice(0, PREVIEW_LIMIT),
  }
}))

const toggleGroup = (group: MemberGroup): void => {
  expandedGroups.value = expandedGroups.value.includes(group)
    ? expandedGroups.value.filter((selected) => selected !== group)
    : [...expandedGroups.value, group]
}
</script>

<template>
  <div class="alumni-ledger">
    <section
      v-for="group in displayedGroups"
      :key="group.group"
      class="alumni-group"
      :aria-labelledby="`alumni-${group.group}`"
    >
      <header>
        <h3 :id="`alumni-${group.group}`">
          {{ group.title }}
        </h3>
        <span>{{ group.count }}</span>
      </header>
      <ul :id="`alumni-${group.group}-list`">
        <li
          v-for="member in group.visibleMembers"
          :key="member.id"
        >
          <span class="alumni-group__year">{{ member.graduationYear }}</span>
          <component
            :is="member.website ? 'a' : 'div'"
            class="alumni-group__avatar"
            :href="member.website"
            :target="member.website ? '_blank' : undefined"
            :rel="member.website ? 'noopener noreferrer' : undefined"
            :aria-label="member.website ? `Visit ${member.name}'s website` : undefined"
          >
            <img
              v-if="member.image"
              :src="resolveMediaPath(member.image.src)"
              :alt="member.image.alt"
              width="48"
              height="48"
              loading="lazy"
              decoding="async"
            >
            <span v-else aria-hidden="true">{{ member.name.charAt(0) }}</span>
          </component>
          <div class="alumni-group__details">
            <component
              :is="member.website ? 'a' : 'span'"
              class="alumni-group__identity"
              :class="{ 'alumni-group__name-link': member.website }"
              :href="member.website"
              :target="member.website ? '_blank' : undefined"
              :rel="member.website ? 'noopener noreferrer' : undefined"
              :aria-label="member.website ? `Visit ${member.name}'s website` : undefined"
            >
              <strong>
                <span class="alumni-group__name-label">{{ member.name }}</span>
                <ExternalLink v-if="member.website" class="alumni-group__external-icon" :size="13" aria-hidden="true" />
              </strong>
              <small v-if="member.nativeName || member.nickname">
                <span
                  v-if="member.nativeName"
                  lang="zh-Hant"
                >{{ member.nativeName }}</span>
                <span v-if="member.nickname">{{ member.nickname }}</span>
              </small>
            </component>
            <span
              v-if="member.affiliation"
              class="alumni-group__affiliation"
            >
              {{ member.affiliation }}
            </span>
            <a
              v-if="showEmail && member.email"
              class="alumni-group__email"
              :href="`mailto:${member.email}`"
              :aria-label="`Email ${member.name}: ${member.email}`"
            >{{ member.email }}</a>
          </div>
        </li>
      </ul>
      <div v-if="group.members.length > PREVIEW_LIMIT" class="alumni-group__footer">
        <span aria-live="polite">{{ group.visibleMembers.length }} of {{ group.count }} shown</span>
        <button
          class="alumni-group__toggle"
          type="button"
          :aria-expanded="group.expanded"
          :aria-controls="`alumni-${group.group}-list`"
          :aria-label="group.expanded ? `Show fewer ${group.title}` : `Show all ${group.count} ${group.title}`"
          @click="toggleGroup(group.group)"
        >
          {{ group.expanded ? "Show fewer" : `Show ${group.count - PREVIEW_LIMIT} more` }}
          <ChevronDown :size="16" aria-hidden="true" />
        </button>
      </div>
    </section>
  </div>
</template>
