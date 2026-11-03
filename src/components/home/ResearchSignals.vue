<script setup lang="ts">
import { ArrowDown } from "@lucide/vue"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"

const emit = defineEmits<{ news: [] }>()
const root = ref<HTMLElement>()
const inView = ref(false)
const pageVisible = ref(true)
const active = computed(() => inView.value && pageVisible.value)
let observer: IntersectionObserver | undefined

const updateVisibility = (): void => { pageVisible.value = !document.hidden }

onMounted(() => {
  updateVisibility()
  document.addEventListener("visibilitychange", updateVisibility)
  observer = new IntersectionObserver(([entry]) => { inView.value = entry?.isIntersecting ?? false })
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => {
  observer?.disconnect()
  document.removeEventListener("visibilitychange", updateVisibility)
})

const particles = [
  [14, 12], [36, 8], [58, 16],
  [8, 34], [34, 33], [62, 36],
  [16, 59], [39, 64], [60, 57],
] as const
const visionPoints = [[58, 26], [72, 20], [87, 27], [63, 39], [81, 39], [72, 51]] as const
</script>

<template>
  <div ref="root" class="signal-field" :class="{ 'signal-field--active': active }" aria-label="MAPL research areas">
    <div class="signal-card signal-card--compression">
      <div class="signal-card__top">
        <span class="signal-card__index">01</span>
        <svg class="signal-visual" viewBox="0 0 168 72" aria-hidden="true" focusable="false">
          <path class="signal-visual__guide" d="M76 36h21m-5-5 5 5-5 5" />
          <rect class="signal-visual__guide" x="107" y="16" width="44" height="40" rx="7" />
          <g class="signal-compression__packed">
            <rect v-for="index in 9" :key="index" :x="114 + ((index - 1) % 3) * 11" :y="23 + Math.floor((index - 1) / 3) * 10" width="7" height="6" rx="1.5" />
          </g>
          <circle
            v-for="([x, y], index) in particles"
            :key="index"
            class="signal-compression__particle"
            :class="{ 'signal-visual__accent': index === 4 }"
            :cx="x"
            :cy="y"
            r="3.5"
            :style="{ '--dx': `${117.5 + (index % 3) * 11 - x}px`, '--dy': `${26 + Math.floor(index / 3) * 10 - y}px`, '--delay': `${index * 0.08}s` }"
          />
        </svg>
      </div>
      <strong>Compression</strong>
      <small>Image · Video · 3D/4D</small>
    </div>

    <div class="signal-card signal-card--vision">
      <div class="signal-card__top">
        <span class="signal-card__index">02</span>
        <svg class="signal-visual" viewBox="0 0 168 72" aria-hidden="true" focusable="false">
          <rect class="signal-visual__guide" x="25" y="7" width="116" height="58" rx="6" />
          <path class="signal-vision__grid" d="M48 8v56m24-56v56m24-56v56m24-56v56M26 26h114M26 46h114" />
          <path class="signal-vision__skeleton" d="m58 26 14-6 15 7-6 12-9 12-9-12-5-13m5 13h18M72 20v31" />
          <circle v-for="([x, y], index) in visionPoints" :key="index" class="signal-vision__point" :cx="x" :cy="y" r="2.5" :style="{ '--delay': `${index * 0.25}s` }" />
          <path class="signal-vision__focus" d="M54 22v-6h9m18 0h9v6M54 48v8h9m18 0h9v-8" />
          <g class="signal-vision__scanner">
            <rect x="28" y="10" width="14" height="52" rx="2" opacity="0.08" />
            <path d="M41 10v52" />
          </g>
        </svg>
      </div>
      <strong>Vision</strong>
      <small>Learning · Sensing · Understanding</small>
    </div>

    <div class="signal-card signal-card--systems">
      <div class="signal-card__top">
        <span class="signal-card__index">03</span>
        <svg class="signal-visual" viewBox="0 0 168 72" aria-hidden="true" focusable="false">
          <path class="signal-systems__wire" d="m18 36 46-21 48 21h39M18 36l46 21 48-21" />
          <path class="signal-systems__flow" d="m18 36 46-21 48 21h39" />
          <path class="signal-systems__flow signal-systems__flow--second" d="m18 36 46 21 48-21h39" />
          <circle class="signal-systems__node" cx="18" cy="36" r="5" />
          <circle class="signal-systems__node" cx="64" cy="15" r="5" />
          <circle class="signal-systems__node" cx="64" cy="57" r="5" />
          <circle class="signal-systems__halo" cx="112" cy="36" r="15" />
          <circle class="signal-systems__node signal-systems__core" cx="112" cy="36" r="8" />
          <circle class="signal-visual__accent" cx="112" cy="36" r="3" />
          <rect class="signal-systems__node" x="143" y="28" width="16" height="16" rx="4" />
          <path class="signal-systems__output" d="m148 36 2 2 4-5" />
        </svg>
      </div>
      <strong>Systems</strong>
      <small>Efficient · Adaptive · Deployable</small>
    </div>
    <button class="signal-field__news" type="button" aria-controls="news-ledger" @click="emit('news')">
      News
      <ArrowDown :size="18" aria-hidden="true" />
    </button>
  </div>
</template>
