<script setup lang="ts">
import SectionHeading from "../components/ui/SectionHeading.vue"
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
    />

    <ul class="course-list" aria-label="Courses">
      <li v-for="course in teachingContent.courses" :key="course.code" class="course-list__item">
        <h2 :id="`course-${course.code}`">
          {{ course.title }} <span>({{ course.code }})</span>
          <template v-if="'pairedCourse' in course">
            &amp; {{ course.pairedCourse.title }} <span>({{ course.pairedCourse.code }})</span>
          </template>
        </h2>
        <ul class="course-list__semesters" :aria-labelledby="`course-${course.code}`">
          <li v-for="semester in course.semesters" :key="semester">{{ semester }}</li>
        </ul>
      </li>
    </ul>
  </section>
</template>
