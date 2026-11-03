<script setup lang="ts">
import { ChevronLeft, ChevronRight, Pause, Play } from "@lucide/vue"
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"

import { homeSlides } from "../../data/home-slides.ts"
import { resolveMediaPath } from "../../lib/media-path.ts"
import "../../styles/home-slider.css"

const slidePosition = ref(1)
const activeIndex = computed(() => (slidePosition.value - 1 + homeSlides.length) % homeSlides.length)
const trackSlides = [homeSlides.at(-1) ?? homeSlides[0], ...homeSlides, homeSlides[0]]
const isResetting = ref(false)
const isTransitioning = ref(false)
const isPaused = ref(false)
const isPageVisible = ref(false)
const canAutoAdvance = computed(() => !isPaused.value && isPageVisible.value)
let resetFrame: number | undefined

const resetLoop = (): void => {
  if (slidePosition.value !== 0 && slidePosition.value !== homeSlides.length + 1) return
  isResetting.value = true
  slidePosition.value = slidePosition.value === 0 ? homeSlides.length : 1
  // Both ends duplicate their opposite panel, so the snap is visually identical.
  resetFrame = window.requestAnimationFrame(() => {
    resetFrame = window.requestAnimationFrame(() => {
      isResetting.value = false
      resetFrame = undefined
    })
  })
}

const finishTransition = (): void => {
  if (isResetting.value) return
  isTransitioning.value = false
  resetLoop()
}

const changeSlide = (direction: -1 | 1): void => {
  if (isTransitioning.value || isResetting.value) return
  isTransitioning.value = true
  slidePosition.value += direction
}

const handleTransitionEnd = (event: TransitionEvent): void => {
  if (event.target === event.currentTarget && event.propertyName === "transform") finishTransition()
}

const handleVisibilityChange = (): void => {
  isPageVisible.value = !document.hidden
}

watch([canAutoAdvance, activeIndex], ([canAdvance], _previous, onCleanup) => {
  if (!canAdvance) return
  const timer = window.setTimeout(() => changeSlide(1), 5000)
  onCleanup(() => window.clearTimeout(timer))
})

watch(slidePosition, (_position, _previous, onCleanup) => {
  if (isResetting.value) return
  // Also finish when reduced motion or a background tab suppresses transitionend.
  const timer = window.setTimeout(finishTransition, 700)
  onCleanup(() => window.clearTimeout(timer))
})

onMounted(() => {
  handleVisibilityChange()
  document.addEventListener("visibilitychange", handleVisibilityChange)
})

onBeforeUnmount(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange)
  if (resetFrame !== undefined) window.cancelAnimationFrame(resetFrame)
})
</script>

<template>
  <div class="home-slider" role="region" aria-label="MAPL highlights" aria-roledescription="carousel">
    <div id="home-slider-slides" class="home-slider__stage" aria-live="off">
      <div
        class="home-slider__track"
        :class="{ 'home-slider__track--resetting': isResetting }"
        :style="{ transform: `translateX(-${slidePosition * 100}%)` }"
        @transitionend="handleTransitionEnd"
      >
        <div
          v-for="(slide, index) in trackSlides"
          :id="index > 0 && index <= homeSlides.length ? `home-slide-${slide.id}` : undefined"
          :key="`${slide.id}-${index}`"
          class="home-slider__slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${(index - 1 + homeSlides.length) % homeSlides.length + 1} of ${homeSlides.length}: ${slide.title}`"
          :aria-hidden="index === 0 || index === homeSlides.length + 1 || index - 1 !== activeIndex"
        >
          <img
            :src="resolveMediaPath(slide.image)"
            :alt="slide.alt"
            width="2000"
            height="1125"
            :fetchpriority="index === 1 ? 'high' : 'low'"
            decoding="async"
            draggable="false"
          >
        </div>
      </div>
      <button
        class="home-slider__arrow home-slider__arrow--previous"
        type="button"
        aria-label="Previous slide"
        title="Previous slide"
        aria-controls="home-slider-slides"
        :aria-disabled="isTransitioning || isResetting"
        @click="changeSlide(-1)"
      >
        <ChevronLeft :size="20" aria-hidden="true" />
      </button>
      <button
        class="home-slider__arrow home-slider__arrow--next"
        type="button"
        aria-label="Next slide"
        title="Next slide"
        aria-controls="home-slider-slides"
        :aria-disabled="isTransitioning || isResetting"
        @click="changeSlide(1)"
      >
        <ChevronRight :size="20" aria-hidden="true" />
      </button>
    </div>
    <div class="home-slider__status">
      <div class="home-slider__indicators" aria-hidden="true">
        <span
          v-for="(slide, index) in homeSlides"
          :key="slide.id"
          :class="{ 'home-slider__indicator--active': index === activeIndex }"
        />
      </div>
      <button
        class="home-slider__pause"
        type="button"
        :aria-label="isPaused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'"
        :title="isPaused ? 'Resume automatic slideshow' : 'Pause automatic slideshow'"
        aria-controls="home-slider-slides"
        @click="isPaused = !isPaused"
      >
        <component :is="isPaused ? Play : Pause" :size="14" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
