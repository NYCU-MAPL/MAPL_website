<script setup lang="ts">
import { X } from "@lucide/vue"
import { onBeforeUnmount, onMounted, ref } from "vue"

import "../../styles/image-lightbox.css"

defineProps<{
  readonly src: string
  readonly alt: string
  readonly label: string
}>()

const emit = defineEmits<{ close: [] }>()
const dialog = ref<HTMLDialogElement>()
const imageRatio = ref(16 / 9)
let previousFocus: HTMLElement | undefined
let previousOverflow = ""
let previousPadding = ""

const readImageDimensions = (event: Event): void => {
  if (event.target instanceof HTMLImageElement && event.target.naturalHeight > 0) {
    imageRatio.value = event.target.naturalWidth / event.target.naturalHeight
  }
}

const close = (): void => {
  dialog.value?.close()
}

onMounted(() => {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined
  previousOverflow = document.body.style.overflow
  previousPadding = document.body.style.paddingInlineEnd
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  if (scrollbarWidth > 0) {
    const currentPadding = Number.parseFloat(getComputedStyle(document.body).paddingInlineEnd) || 0
    document.body.style.paddingInlineEnd = `${currentPadding + scrollbarWidth}px`
  }
  document.body.style.overflow = "hidden"
  dialog.value?.showModal()
})

onBeforeUnmount(() => {
  dialog.value?.close()
  document.body.style.overflow = previousOverflow
  document.body.style.paddingInlineEnd = previousPadding
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
})
</script>

<template>
  <Teleport to="body">
    <dialog
      ref="dialog"
      class="image-lightbox"
      :aria-label="label"
      @click.self="close"
      @close="emit('close')"
    >
      <button class="image-lightbox__close" type="button" aria-label="Close image" autofocus @click="close">
        <X :size="24" aria-hidden="true" />
      </button>
      <img
        class="image-lightbox__image"
        :src="src"
        :alt="alt"
        :style="{ '--image-ratio': imageRatio }"
        decoding="async"
        @load="readImageDimensions"
      >
    </dialog>
  </Teleport>
</template>
