<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{
  readonly text: string
  readonly highlights?: readonly string[]
}>()

const parts = computed(() => {
  const terms = [...new Set(props.highlights ?? [])].filter(Boolean).sort((left, right) => right.length - left.length)
  if (terms.length === 0) return [{ text: props.text, highlighted: false }]
  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&"))
  const pattern = new RegExp(`(${escaped.join("|")})`, "gu")
  return props.text.split(pattern).filter(Boolean).map((text) => ({ text, highlighted: terms.includes(text) }))
})
</script>

<template>
  <template v-for="(part, index) in parts" :key="index">
    <strong v-if="part.highlighted">{{ part.text }}</strong><template v-else>{{ part.text }}</template>
  </template>
</template>
