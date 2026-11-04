<script setup lang="ts">
import { ref } from "vue"

import ImageLightbox from "../ui/ImageLightbox.vue"
import { resolveMediaPath } from "../../lib/media-path.ts"
import "../../styles/join-pathways.css"

const collaborationImageExpanded = ref(false)
</script>

<template>
  <section class="join-pathways" aria-label="Careers and international collaboration">
    <article aria-labelledby="careers-title">
      <h2 id="careers-title">Careers</h2>
      <img
        class="join-pathways__image"
        :src="resolveMediaPath('media/about/01-careers.png')"
        alt="Technology company logos featured in MAPL's career overview"
        width="1838"
        height="854"
        loading="lazy"
        decoding="async"
      >
      <p>MAPL recruits graduate students interested in research for publication. Alumni records show careers across semiconductor, imaging, and computing organizations in Taiwan and abroad.</p>
    </article>
    <article aria-labelledby="collaboration-title">
      <h2 id="collaboration-title">International collaboration</h2>
      <button
        class="join-pathways__image-trigger"
        type="button"
        aria-label="Enlarge international collaboration map"
        aria-haspopup="dialog"
        title="Enlarge image"
        @click="collaborationImageExpanded = true"
      >
        <img
          class="join-pathways__image"
          :src="resolveMediaPath('media/about/02-international-collaboration.jpg')"
          alt="Map of MAPL research collaborations across Asia, Europe, Brazil, and the United States"
          width="868"
          height="316"
          loading="lazy"
          decoding="async"
        >
      </button>
      <ImageLightbox
        v-if="collaborationImageExpanded"
        :src="resolveMediaPath('media/about/02-international-collaboration.jpg')"
        alt="Map of MAPL research collaborations across Asia, Europe, Brazil, and the United States"
        label="International collaboration map"
        @close="collaborationImageExpanded = false"
      />
      <p>The laboratory has a documented history of student exchanges, internships, visiting researchers, and academic work connecting Taiwan with institutions in Europe, Brazil, and the United States.</p>
      <p class="join-pathways__note">
        Opportunities vary by project and year; current arrangements are discussed directly with the laboratory.
      </p>
    </article>
  </section>
</template>
