<script setup lang="ts">
import { ArrowDown, ArrowRight } from "@lucide/vue"
import { RouterLink } from "vue-router"

import HomeSlider from "../components/home/HomeSlider.vue"
import NewsLedger from "../components/home/NewsLedger.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import { news, publications } from "../lib/content/index.ts"
import { buildHomePresentation } from "../lib/presentation/home-about.ts"
import "../styles/home.css"
import "../styles/home-content.css"

const presentation = buildHomePresentation(news, publications)
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
      <div
        class="signal-field"
        aria-label="MAPL research areas"
      >
        <div><span>01</span><strong>Compression</strong><small>Image · Video · 3D/4D</small></div>
        <div><span>02</span><strong>Vision</strong><small>Learning · Sensing · Understanding</small></div>
        <div><span>03</span><strong>Systems</strong><small>Efficient · Adaptive · Deployable</small></div>
      </div>
    </section>

    <section
      id="news-ledger"
      class="home-section"
      aria-label="News"
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
