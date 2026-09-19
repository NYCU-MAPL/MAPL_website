<script setup lang="ts">
import { ArrowUpRight, Download, Mail } from "@lucide/vue"

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
    >
      <p>Work with us on visual data coding, machine learning, computer vision, and emerging neural media.</p>
    </SectionHeading>

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

    <div class="join-view__grid">
      <section aria-labelledby="join-opportunities-title">
        <p class="eyebrow">
          Open opportunities
        </p>
        <h2 id="join-opportunities-title">
          Bring a question worth pursuing.
        </h2>
        <p>We welcome prospective PhD and master’s students interested in publication-oriented research. Undergraduate students can also explore research projects and international study or internship opportunities through the lab.</p>
        <a
          class="static-view__primary-link"
          :href="joinUsContent.introSlides"
          target="_blank"
          rel="noreferrer"
        >
          <Download
            :size="18"
            aria-hidden="true"
          />
          Open the 2027 lab introduction
        </a>
      </section>

      <aside
        class="join-view__contact"
        aria-labelledby="join-contact-title"
      >
        <p class="eyebrow">
          Verified contact
        </p>
        <h2 id="join-contact-title">
          Start with the lab.
        </h2>
        <dl>
          <div><dt>Professor</dt><dd>{{ joinUsContent.professor.name }}</dd></div>
          <div><dt>Laboratory</dt><dd>{{ joinUsContent.lab.location }}</dd></div>
          <div><dt>Telephone</dt><dd>{{ joinUsContent.lab.phone }}</dd></div>
          <div><dt>Address</dt><dd>{{ joinUsContent.lab.address }}</dd></div>
        </dl>
        <div class="join-view__contact-actions">
          <a :href="`mailto:${joinUsContent.professor.email}`">
            <Mail
              :size="18"
              aria-hidden="true"
            />
            Email Prof. Peng
          </a>
          <a
            :href="joinUsContent.professor.profile"
            target="_blank"
            rel="noreferrer"
          >
            Official profile
            <ArrowUpRight
              :size="18"
              aria-hidden="true"
            />
          </a>
        </div>
      </aside>
    </div>
  </section>
</template>
