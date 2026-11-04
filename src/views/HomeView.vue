<script setup lang="ts">
import { FileText, UserPlus, Users } from "@lucide/vue"
import { RouterLink } from "vue-router"

import HomeSlider from "../components/home/HomeSlider.vue"
import NewsLedger from "../components/home/NewsLedger.vue"
import { news, publications } from "../lib/content/index.ts"
import "../styles/home.css"
import "../styles/home-content.css"

const shortcuts = [
  { to: "/members", label: "Members", icon: Users },
  { to: "/publications", label: "Publications", icon: FileText },
  { to: "/join-us", label: "Join us", icon: UserPlus },
] as const
</script>

<template>
  <div class="home-view">
    <div class="home-overview">
      <HomeSlider />
      <nav class="home-shortcuts" aria-label="Explore MAPL">
        <RouterLink
          v-for="shortcut in shortcuts"
          :key="shortcut.to"
          class="home-shortcut"
          :to="shortcut.to"
        >
          <component :is="shortcut.icon" :size="18" aria-hidden="true" />
          <span>{{ shortcut.label }}</span>
        </RouterLink>
      </nav>
    </div>
    <section id="news-ledger" class="home-news" aria-labelledby="home-title">
      <header class="home-news__header">
        <div class="home-news__intro">
          <h1 id="home-title">News</h1>
          <p>Updates from the lab.</p>
        </div>
      </header>
      <NewsLedger
        v-if="news.length > 0"
        :items="news"
        :publications="publications"
      />
      <p
        v-else
        class="collection-empty"
        role="status"
      >
        No news has been published yet. Please check back for laboratory updates.
      </p>
    </section>
  </div>
</template>
