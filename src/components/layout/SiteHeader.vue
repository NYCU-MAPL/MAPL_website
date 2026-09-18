<script setup lang="ts">
import { Menu } from "@lucide/vue"
import { RouterLink } from "vue-router"

import BrandLockup from "./BrandLockup.vue"
import type { NavigationDestination } from "./navigation.ts"

defineProps<{
  readonly destinations: readonly NavigationDestination[]
  readonly navigationOpen: boolean
}>()

defineEmits<{
  openNavigation: []
}>()
</script>

<template>
  <header class="site-header">
    <div class="site-header__utility">
      <div class="shell-container site-header__utility-inner">
        <span>NYCU · Department of Computer Science</span>
        <span aria-hidden="true">Hsinchu, Taiwan</span>
      </div>
    </div>
    <div class="shell-container site-header__main">
      <BrandLockup />
      <nav
        class="desktop-navigation"
        aria-label="Primary navigation"
      >
        <ul class="desktop-navigation__list">
          <li
            v-for="destination in destinations"
            :key="destination.to"
          >
            <RouterLink
              class="navigation-link"
              :to="destination.to"
            >
              {{ destination.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
      <button
        id="mobile-navigation-trigger"
        class="icon-button mobile-navigation-trigger"
        type="button"
        aria-label="Open navigation"
        aria-controls="mobile-navigation"
        :aria-expanded="navigationOpen"
        @click="$emit('openNavigation')"
      >
        <Menu
          :size="22"
          aria-hidden="true"
        />
      </button>
    </div>
  </header>
</template>
