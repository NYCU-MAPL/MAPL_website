<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue"

import SectionHeading from "../components/ui/SectionHeading.vue"
import SurfacePanel from "../components/ui/SurfacePanel.vue"
import { teachingContent } from "../features/static-pages/content.ts"
import "../styles/static-pages.css"
</script>

<template>
  <section
    class="teaching-view static-view"
  >
    <SectionHeading
      title="Teaching"
      label="MAPL · Learning practice"
      :level="1"
    >
      <p>Courses connect mathematical foundations with implementable visual-computing systems.</p>
    </SectionHeading>

    <div class="static-view__section">
      <header class="static-view__section-heading">
        <p class="eyebrow">
          Current course portfolio
        </p>
        <h2>From theory to working systems</h2>
        <p>Exact semester offerings and registration details are maintained by NYCU.</p>
      </header>
      <div class="course-list">
        <SurfacePanel
          v-for="(course, index) in teachingContent.courses"
          :key="course.code"
        >
          <div
            class="course-card__index"
            aria-hidden="true"
          >
            0{{ index + 1 }}
          </div>
          <p class="course-card__code">
            {{ course.code }}
          </p>
          <h3>{{ course.title }}</h3>
          <p>{{ course.description }}</p>
        </SurfacePanel>
      </div>
    </div>

    <aside
      class="teaching-view__resources"
      aria-labelledby="teaching-resources-title"
    >
      <div>
        <p class="eyebrow">
          Official information
        </p>
        <h2 id="teaching-resources-title">
          Plan your study
        </h2>
      </div>
      <nav aria-label="Teaching resources">
        <a
          v-for="link in teachingContent.links"
          :key="link.href"
          :href="link.href"
          target="_blank"
          rel="noreferrer"
        >
          {{ link.label }}
          <ArrowUpRight
            :size="18"
            aria-hidden="true"
          />
        </a>
      </nav>
    </aside>
  </section>
</template>
