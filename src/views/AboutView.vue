<script setup lang="ts">
import { ArrowRight } from "@lucide/vue"
import { ref } from "vue"
import { RouterLink } from "vue-router"

import AlumniLedger from "../components/about/AlumniLedger.vue"
import PeopleGroup from "../components/about/PeopleGroup.vue"
import PersonCard from "../components/about/PersonCard.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import { members } from "../lib/content/index.ts"
import { buildAboutPresentation } from "../lib/presentation/home-about.ts"
import "../styles/about.css"
import "../styles/about-collections.css"

const presentation = buildAboutPresentation(members)
const showCurrentEmails = ref(false)
</script>

<template>
  <div class="about-view">
    <section
      class="about-intro"
      aria-label="About MAPL"
    >
      <SectionHeading
        title="A laboratory for visual systems."
        label="About MAPL"
        :level="1"
      >
        <p>
          MAPL brings together multimedia systems, computer vision, and deep learning to make visual information more efficient, useful, and understandable.
        </p>
      </SectionHeading>
      <div
        class="about-intro__register"
        aria-label="Laboratory principles"
      >
        <p>
          <span>01</span><strong>Represent</strong><span>visual data with less redundancy.</span>
        </p>
        <p>
          <span>02</span><strong>Understand</strong><span>scenes across sensors and scales.</span>
        </p>
        <p>
          <span>03</span><strong>Translate</strong><span>research into working systems.</span>
        </p>
      </div>
    </section>

    <section
      class="about-section advisor-section"
      aria-label="Advisor"
    >
      <SectionHeading
        title="Advisor"
        label="Research direction"
        :level="2"
      >
        <p>MAPL is led in the Department of Computer Science at National Yang Ming Chiao Tung University.</p>
      </SectionHeading>
      <div
        v-if="presentation.advisors.length > 0"
        class="advisor-grid"
      >
        <PersonCard
          v-for="advisor in presentation.advisors"
          :key="advisor.id"
          :member="advisor"
          prominent
        />
        <div class="advisor-section__statement">
          <p class="eyebrow">
            Working method
          </p>
          <blockquote>Build the model, understand the trade-off, and prove the idea in a system people can use.</blockquote>
          <p>Our work connects learning-based representations with the practical constraints of coding, computation, and deployment.</p>
        </div>
      </div>
      <p
        v-else
        class="collection-empty"
        role="status"
      >
        Advisor information is being prepared.
      </p>
    </section>

    <section
      class="about-section current-people"
      aria-label="Current people"
    >
      <SectionHeading
        title="Current people"
        :label="`${presentation.currentCount} researchers and students`"
        :level="2"
      >
        <p>A group organized by role, from visiting researchers to undergraduate students.</p>
      </SectionHeading>
      <button
        type="button"
        role="switch"
        class="current-people__email-toggle"
        :aria-checked="showCurrentEmails"
        @click="showCurrentEmails = !showCurrentEmails"
      >
        <span>Show email</span>
        <span
          class="current-people__email-track"
          aria-hidden="true"
        >
          <span class="current-people__email-knob" />
        </span>
      </button>
      <div
        v-if="presentation.currentGroups.length > 0"
        class="people-groups"
      >
        <PeopleGroup
          v-for="group in presentation.currentGroups"
          :key="group.group"
          :presentation="group"
          :show-email="showCurrentEmails"
        />
      </div>
      <p
        v-else
        class="collection-empty"
        role="status"
      >
        Current member profiles are being prepared.
      </p>
    </section>

    <section
      class="about-section alumni-section"
      aria-label="Alumni"
    >
      <SectionHeading
        title="Alumni"
        :label="presentation.alumni.kind === 'populated' ? `${presentation.alumni.count} graduates` : 'Graduate record'"
        :level="2"
      >
        <p>Graduates remain part of the laboratory record, ordered by program and most recent graduation year.</p>
      </SectionHeading>
      <AlumniLedger
        v-if="presentation.alumni.kind === 'populated'"
        :groups="presentation.alumni.groups"
      />
      <p
        v-else
        class="collection-empty"
        role="status"
      >
        No alumni records are available yet.
      </p>
    </section>

    <section
      class="about-section pathways"
      aria-label="Careers and international collaboration"
    >
      <SectionHeading
        title="Paths beyond the lab"
        label="Careers and exchange"
        :level="2"
      >
        <p>Research training is paired with publication practice and a history of international academic exchange.</p>
      </SectionHeading>
      <div class="pathways__grid">
        <article>
          <span>01 · Careers</span>
          <h3>Research with an onward path.</h3>
          <p>MAPL recruits graduate students interested in research for publication. Alumni records show careers across semiconductor, imaging, and computing organizations in Taiwan and abroad.</p>
          <RouterLink
            class="text-action"
            to="/join-us"
          >
            Explore opportunities
            <ArrowRight
              :size="16"
              aria-hidden="true"
            />
          </RouterLink>
        </article>
        <article>
          <span>02 · International collaboration</span>
          <h3>Ideas travel through people.</h3>
          <p>The laboratory has a documented history of student exchanges, internships, visiting researchers, and academic work connecting Taiwan with institutions in Europe, Brazil, and the United States.</p>
          <p class="pathways__note">
            Opportunities vary by project and year; current arrangements are discussed directly with the laboratory.
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
