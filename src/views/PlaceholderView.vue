<script setup lang="ts">
defineProps<{
  readonly title: string
}>()
</script>

<template>
  <section aria-labelledby="page-title">
    <p class="eyebrow">
      MAPL website
    </p>
    <h1 id="page-title">
      {{ title }}
    </h1>
    <p>This route is ready for content in a later implementation phase.</p>
  </section>
</template>
