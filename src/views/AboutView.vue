<script setup lang="ts">
import { ref } from "vue"

import AlumniLedger from "../components/about/AlumniLedger.vue"
import PeopleGroup from "../components/about/PeopleGroup.vue"
import SectionHeading from "../components/ui/SectionHeading.vue"
import { members } from "../lib/content/index.ts"
import { buildAboutPresentation } from "../lib/presentation/home-about.ts"
import "../styles/about.css"
import "../styles/about-collections.css"

const presentation = buildAboutPresentation(members)
const showEmails = ref(false)
</script>

<template>
  <div class="about-view">
    <section
      class="about-intro"
      aria-label="MAPL members"
    >
      <SectionHeading
        title="Members"
        label="MAPL · Research team"
        :level="1"
      />
      <button
        type="button"
        role="switch"
        class="current-people__email-toggle"
        :aria-checked="showEmails"
        aria-label="Show email for current members and alumni"
        @click="showEmails = !showEmails"
      >
        <span>Show email</span>
        <span class="current-people__email-track" aria-hidden="true">
          <span class="current-people__email-knob" />
        </span>
      </button>
    </section>

    <section
      class="about-section current-people"
      aria-label="Current members"
    >
      <div
        v-if="presentation.currentGroups.length > 0"
        class="people-groups"
      >
        <PeopleGroup
          v-for="group in presentation.currentGroups"
          :key="group.group"
          :presentation="group"
          :show-email="showEmails"
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
      aria-labelledby="alumni-title"
    >
      <div class="about-section__header">
        <div class="about-section__title">
          <h2 id="alumni-title">Alumni</h2>
          <span
            v-if="presentation.alumni.kind === 'populated'"
            class="about-section__count"
            :aria-label="`${presentation.alumni.count} alumni`"
          >{{ presentation.alumni.count }}</span>
        </div>
      </div>
      <AlumniLedger
        v-if="presentation.alumni.kind === 'populated'"
        :groups="presentation.alumni.groups"
        :show-email="showEmails"
      />
      <p
        v-else
        class="collection-empty"
        role="status"
      >
        No alumni records are available yet.
      </p>
    </section>

  </div>
</template>
