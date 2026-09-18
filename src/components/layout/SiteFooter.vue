<script setup lang="ts">
import { RouterLink } from "vue-router"

import BrandLockup from "./BrandLockup.vue"
import type { NavigationDestination } from "./navigation.ts"

defineProps<{
  readonly destinations: readonly NavigationDestination[]
}>()
</script>

<template>
  <footer class="site-footer">
    <div class="shell-container site-footer__grid">
      <div class="site-footer__identity">
        <BrandLockup inverted />
        <p>
          National Yang Ming Chiao Tung University<br>
          Department of Computer Science
        </p>
      </div>
      <nav aria-label="Footer sitemap">
        <p class="site-footer__label">
          Sitemap
        </p>
        <ul class="site-footer__links">
          <li
            v-for="destination in destinations"
            :key="destination.to"
          >
            <RouterLink :to="destination.to">
              {{ destination.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <address class="site-footer__address">
        <span>EC621 · EC714</span>
        1001 University Road<br>
        Hsinchu 30010, Taiwan
      </address>
    </div>
    <div class="shell-container site-footer__base">
      <small>© {{ new Date().getFullYear() }} MAPL, NYCU</small>
      <small>Research in visual computing and multimedia systems</small>
    </div>
  </footer>
</template>
