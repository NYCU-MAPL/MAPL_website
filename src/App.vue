<script setup lang="ts">
import { FlaskConical } from "@lucide/vue"
import { RouterLink, RouterView } from "vue-router"

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Publications", to: "/publications" },
  { label: "Teaching", to: "/teaching" },
  { label: "Join Us", to: "/join-us" },
] as const
</script>

<template>
  <div class="app-shell">
    <a
      class="skip-link"
      href="#main-content"
    >Skip to main content</a>
    <header class="site-header">
      <RouterLink
        class="site-title"
        to="/"
        aria-label="MAPL home"
      >
        <FlaskConical
          :size="24"
          aria-hidden="true"
        />
        <span>MAPL</span>
      </RouterLink>
      <nav aria-label="Primary navigation">
        <ul class="nav-list">
          <li
            v-for="item in navigation"
            :key="item.to"
          >
            <RouterLink :to="item.to">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </header>
    <main
      id="main-content"
      class="site-main"
      tabindex="-1"
    >
      <RouterView />
    </main>
  </div>
</template>
