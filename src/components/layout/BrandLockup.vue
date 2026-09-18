<script setup lang="ts">
import { FlaskConical } from "@lucide/vue"
import { RouterLink } from "vue-router"

withDefaults(defineProps<{
  readonly inverted?: boolean
}>(), {
  inverted: false,
})
</script>

<template>
  <RouterLink
    class="brand-lockup"
    :class="{ 'brand-lockup--inverted': inverted }"
    to="/"
    aria-label="MAPL home"
  >
    <span
      class="brand-lockup__mark"
      aria-hidden="true"
    >
      <FlaskConical :size="20" />
      <span class="brand-lockup__signal" />
    </span>
    <span class="brand-lockup__text">
      <strong>MAPL</strong>
      <small>Multimedia Architecture<br>and Processing Laboratory</small>
    </span>
  </RouterLink>
</template>
