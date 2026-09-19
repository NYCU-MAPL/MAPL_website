<script setup lang="ts">
import type { MemberGroupPresentation } from "../../lib/presentation/home-about.ts"
import PersonCard from "./PersonCard.vue"

defineProps<{
  readonly presentation: MemberGroupPresentation
}>()
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
      <span>{{ presentation.count }}</span>
    </header>
    <div class="people-grid">
      <PersonCard
        v-for="member in presentation.members"
        :key="member.id"
        :member="member"
      />
    </div>
  </section>
</template>
