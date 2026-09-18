<script setup lang="ts">
import { ref } from "vue"
import { RouterView } from "vue-router"

import MobileNavigation from "./components/layout/MobileNavigation.vue"
import SiteFooter from "./components/layout/SiteFooter.vue"
import SiteHeader from "./components/layout/SiteHeader.vue"
import SkipLink from "./components/layout/SkipLink.vue"
import { primaryDestinations } from "./components/layout/navigation.ts"

const isNavigationOpen = ref(false)
</script>

<template>
  <div class="app-shell">
    <SkipLink target-id="main-content" />
    <SiteHeader
      :destinations="primaryDestinations"
      :navigation-open="isNavigationOpen"
      @open-navigation="isNavigationOpen = true"
    />
    <MobileNavigation
      v-model:open="isNavigationOpen"
      :destinations="primaryDestinations"
      trigger-id="mobile-navigation-trigger"
      main-id="main-content"
    />
    <main
      id="main-content"
      class="site-main"
      tabindex="-1"
    >
      <RouterView />
    </main>
    <SiteFooter :destinations="primaryDestinations" />
  </div>
</template>
