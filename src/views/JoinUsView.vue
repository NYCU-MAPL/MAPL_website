<script setup lang="ts">
import { ClipboardList, Download } from "@lucide/vue"

import JoinPathways from "../components/join/JoinPathways.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import { joinUsContent } from "../features/static-pages/content.ts"
import { resolveMediaPath } from "../lib/media-path.ts"
import "../styles/static-pages.css"
</script>

<template>
  <section
    class="join-view static-view"
  >
    <SectionHeading
      title="Join MAPL"
      label="MAPL · Recruitment"
      :level="1"
    />

    <figure class="join-view__portrait">
      <img
        :src="resolveMediaPath(joinUsContent.image.src)"
        :alt="joinUsContent.image.alt"
        :width="joinUsContent.image.width"
        :height="joinUsContent.image.height"
        fetchpriority="high"
        decoding="async"
      >
      <figcaption>
        <span>MAPL · 2025</span>
        <span>Research grows through shared work.</span>
      </figcaption>
    </figure>
    <div class="join-view__contact-block">
      <header class="join-view__contact-heading">
        <p class="eyebrow">
          Open opportunities
        </p>
        <h2 id="join-opportunities-title">
          Contact us
        </h2>
      </header>
      <div class="join-view__grid">
        <section aria-labelledby="join-opportunities-title">
          <p>We welcome prospective PhD and master’s students interested in publication-oriented research. Undergraduate students can also explore research projects and international study or internship opportunities through the lab.</p>
          <div class="join-view__resources">
            <a
              class="static-view__primary-link"
              :href="joinUsContent.introSlides"
              target="_blank"
              rel="noreferrer"
            >
              <Download :size="18" aria-hidden="true" />
              Open the 2027 lab introduction
            </a>
            <a
              class="static-view__primary-link static-view__primary-link--outline"
              :href="joinUsContent.joiningForm"
              target="_blank"
              rel="noreferrer"
            >
              <ClipboardList :size="18" aria-hidden="true" />
              Fill out the joining form
            </a>
          </div>
        </section>

        <section
          class="join-view__student-contacts"
          aria-labelledby="join-student-contacts-title"
        >
          <h3 id="join-student-contacts-title">Questions about joining MAPL?</h3>
          <p>Feel free to contact us with any questions about joining the lab.</p>
          <ul>
            <li v-for="contact in joinUsContent.studentContacts" :key="contact.email">
              <strong><span lang="zh-Hant">{{ contact.name }}</span> ({{ contact.nickname }})</strong>
              <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <JoinPathways />
  </section>
</template>
