<script setup lang="ts">
import type { MemberGroupPresentation } from "../../lib/presentation/home-about.ts"

defineProps<{
  readonly groups: readonly MemberGroupPresentation[]
}>()
</script>

<template>
  <div class="alumni-ledger">
    <section
      v-for="group in groups"
      :key="group.group"
      class="alumni-group"
      :aria-labelledby="`alumni-${group.group}`"
    >
      <header>
        <h3 :id="`alumni-${group.group}`">
          {{ group.title }}
        </h3>
        <span>{{ group.count }}</span>
      </header>
      <ul>
        <li
          v-for="member in group.members"
          :key="member.id"
        >
          <span class="alumni-group__year">{{ member.graduationYear }}</span>
          <span>
            <strong>{{ member.name }}</strong>
            <small v-if="member.nativeName || member.nickname">
              <span
                v-if="member.nativeName"
                lang="zh-Hant"
              >{{ member.nativeName }}</span>
              <span v-if="member.nickname">{{ member.nickname }}</span>
            </small>
          </span>
          <span
            v-if="member.affiliation"
            class="alumni-group__affiliation"
          >
            {{ member.affiliation }}
          </span>
        </li>
      </ul>
    </section>
  </div>
</template>
