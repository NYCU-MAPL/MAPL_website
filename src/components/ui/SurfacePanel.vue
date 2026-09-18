<script setup lang="ts">
withDefaults(defineProps<{
  readonly element?: "article" | "section" | "div"
}>(), {
  element: "article",
})
</script>

<template>
  <component
    :is="element"
    class="surface-panel"
  >
    <slot />
  </component>
</template>
