<script setup lang="ts">
import SectionHeading from "../components/ui/SectionHeading.vue"

defineProps<{
  readonly title: string
}>()
</script>

<template>
  <section
    class="placeholder-view"
    aria-labelledby="page-title"
  >
    <SectionHeading
      :title="title"
      label="MAPL · Route index"
      :level="1"
    >
      <p>This route is prepared for its dedicated content phase.</p>
    </SectionHeading>
    <div
      class="placeholder-view__register"
      aria-hidden="true"
    >
      <span>Multimedia</span>
      <span>Architecture</span>
      <span>Processing</span>
      <span>Laboratory</span>
    </div>
  </section>
</template>
