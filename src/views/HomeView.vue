<script setup lang="ts">
import { ArrowRight } from "@lucide/vue"
import { ref } from "vue"
import { RouterLink } from "vue-router"

import HomeSlider from "../components/home/HomeSlider.vue"
import NewsLedger from "../components/home/NewsLedger.vue"
import ResearchSignals from "../components/home/ResearchSignals.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import { news, publications } from "../lib/content/index.ts"
import { buildHomePresentation } from "../lib/presentation/home-about.ts"
import "../styles/home.css"
import "../styles/home-content.css"

const presentation = buildHomePresentation(news, publications)
const newsSection = ref<HTMLElement>()
const scrollToNews = (): void => {
  const target = newsSection.value
  if (!target) return
  target.focus({ preventScroll: true })
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    block: "start",
  })
}
</script>

<template>
  <div class="home-view">
    <section
      class="home-hero"
      aria-labelledby="home-title"
    >
      <HomeSlider />
      <div class="home-hero__copy">
        <p class="eyebrow">
          MAPL · NYCU Computer Science
        </p>
        <h1 id="home-title">
          Visual intelligence,<br><em>engineered to move.</em>
        </h1>
        <p class="home-hero__lead">
          We study how images, video, and spatial media can be represented, understood, and delivered with greater intelligence and efficiency.
        </p>
        <div class="home-hero__actions">
          <RouterLink
            class="route-action route-action--primary"
            to="/publications"
          >
            Read our research
            <ArrowRight
              :size="18"
              aria-hidden="true"
            />
          </RouterLink>
          <RouterLink
            class="route-action"
            to="/about"
          >
            Meet the lab
            <ArrowRight
              :size="18"
              aria-hidden="true"
            />
          </RouterLink>
        </div>
      </div>
      <ResearchSignals @news="scrollToNews" />
    </section>

    <section
      id="news-ledger"
      ref="newsSection"
      class="home-section"
      aria-label="News"
      tabindex="-1"
    >
      <SectionHeading
        title="News"
        :level="2"
      />
      <NewsLedger
        v-if="presentation.news.kind === 'populated'"
        :items="presentation.news.items"
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
