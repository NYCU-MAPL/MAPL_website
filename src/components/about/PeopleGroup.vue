<script setup lang="ts">
import { computed } from "vue"
import type { MemberGroupPresentation } from "../../lib/presentation/home-about.ts"
import PersonCard from "./PersonCard.vue"

const props = defineProps<{
  readonly presentation: MemberGroupPresentation
  readonly showEmail: boolean
}>()

const sortedMembers = computed(() => {
  const members = [...props.presentation.members]
  if (props.presentation.group === "masters-students") {
    return members.sort((a, b) => {
      return (a.enrollmentYear ?? 0) - (b.enrollmentYear ?? 0)
    })
  }
  return members
})

</script>

<template>
  <section
    class="people-group"
    :aria-labelledby="`group-${presentation.group}`"
  >
    <header class="people-group__heading">
      <h3 :id="`group-${presentation.group}`">
        {{ presentation.title }}
      </h3>
      <span v-if="presentation.group !== 'masters-students'">{{ presentation.count }}</span>
    </header>

    <div class="people-grid">
      <PersonCard
        v-for="member in sortedMembers"
        :key="member.id"
        :member="member"
        :show-email="showEmail"
      />
    </div>
  </section>
</template>
