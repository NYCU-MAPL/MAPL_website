<script setup lang="ts">
import { FlaskConical } from "@lucide/vue"
import { RouterLink } from "vue-router"

import { resolveMediaPath } from "../../lib/media-path.ts"

// Original wordmark from legacy-static-site:pages/figures/home_black.png.
// Mask URLs consumed by bundled CSS otherwise resolve relative to /assets/.
const wordmarkUrl = new URL(resolveMediaPath("media/brand/mapl-wordmark.png"), document.baseURI).href

withDefaults(defineProps<{
  readonly inverted?: boolean
  readonly variant?: "default" | "header"
}>(), {
  inverted: false,
  variant: "default",
})
</script>

<template>
  <RouterLink
    class="brand-lockup"
    :class="{ 'brand-lockup--inverted': inverted, 'brand-lockup--header': variant === 'header' }"
    to="/"
    aria-label="MAPL home"
  >
    <span
      v-if="variant !== 'header'"
      class="brand-lockup__mark"
      aria-hidden="true"
    >
      <FlaskConical :size="20" />
      <span class="brand-lockup__signal" />
    </span>
    <span class="brand-lockup__text">
      <span
        class="brand-lockup__wordmark"
        :style="{ '--brand-wordmark-image': `url('${wordmarkUrl}')` }"
        aria-hidden="true"
      />
      <small v-if="variant === 'header'">Multimedia Architecture and Processing Laboratory</small>
      <small v-else>Multimedia Architecture<br>and Processing Laboratory</small>
    </span>
  </RouterLink>
</template>
