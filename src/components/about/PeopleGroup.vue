<script setup lang="ts">
import { computed } from "vue"
import type { MemberGroupPresentation } from "../../lib/presentation/home-about.ts"
import PersonCard from "./PersonCard.vue"

const props = defineProps<{
  readonly presentation: MemberGroupPresentation
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

const yearGroups = computed(() => {
  if (props.presentation.group !== "masters-students") return []

  const groups = new Map<number, typeof sortedMembers.value>()
  sortedMembers.value.forEach(member => {
    const year = member.enrollmentYear ?? 0
    if (!groups.has(year)) {
      groups.set(year, [])
    }
    groups.get(year)!.push(member)
  })

  return Array.from(groups.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, members]) => ({ year, members }))
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

    <!-- Masters Students: grouped by year -->
    <template v-if="presentation.group === 'masters-students'">
      <div
        v-for="group in yearGroups"
        :key="group.year"
        class="people-grid"
      >
        <PersonCard
          v-for="member in group.members"
          :key="member.id"
          :member="member"
        />
      </div>
    </template>

    <!-- Other groups: regular grid -->
    <div v-else class="people-grid">
      <PersonCard
        v-for="member in sortedMembers"
        :key="member.id"
        :member="member"
      />
    </div>
  </section>
</template>
