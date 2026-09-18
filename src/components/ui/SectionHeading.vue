<script setup lang="ts">
withDefaults(defineProps<{
  readonly title: string
  readonly label?: string
  readonly level?: 1 | 2
}>(), {
  label: undefined,
  level: 2,
})
</script>

<template>
  <header class="section-heading">
    <p
      v-if="label"
      class="eyebrow"
    >
      {{ label }}
    </p>
    <component
      :is="`h${level}`"
      class="section-heading__title"
    >
      {{ title }}
    </component>
    <div
      v-if="$slots.default"
      class="section-heading__lead"
    >
      <slot />
    </div>
  </header>
</template>
