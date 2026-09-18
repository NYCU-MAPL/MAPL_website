<script setup lang="ts">
import { X } from "@lucide/vue"
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { RouterLink, useRoute } from "vue-router"

import BrandLockup from "./BrandLockup.vue"
import type { NavigationDestination } from "./navigation.ts"

type CloseReason = "dismiss" | "route"

const props = defineProps<{
  readonly open: boolean
  readonly destinations: readonly NavigationDestination[]
  readonly triggerId: string
  readonly mainId: string
}>()

const emit = defineEmits<{
  "update:open": [open: boolean]
}>()

const route = useRoute()
const panel = ref<HTMLElement>()
const closeButton = ref<HTMLButtonElement>()
let previousBodyOverflow = ""
let previousBodyPaddingInlineEnd = ""
let desktopMedia: MediaQueryList | undefined
let scrollLocked = false

const focusElement = (id: string): void => {
  const element = document.getElementById(id)
  if (element instanceof HTMLElement) {
    element.focus()
  }
}

const releaseScrollLock = (): void => {
  if (!scrollLocked) {
    return
  }
  document.body.style.overflow = previousBodyOverflow
  document.body.style.paddingInlineEnd = previousBodyPaddingInlineEnd
  window.removeEventListener("keydown", handleKeydown)
  scrollLocked = false
}

const close = async (reason: CloseReason): Promise<void> => {
  emit("update:open", false)
  await nextTick()
  focusElement(reason === "route" ? props.mainId : props.triggerId)
}

const handleKeydown = (event: KeyboardEvent): void => {
  if (event.key === "Escape") {
    event.preventDefault()
    void close("dismiss")
    return
  }

  if (event.key !== "Tab" || panel.value === undefined) {
    return
  }

  const focusable = [...panel.value.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
  )]
  const first = focusable.at(0)
  const last = focusable.at(-1)
  if (first === undefined || last === undefined) {
    return
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

const handleDesktopChange = (event: MediaQueryListEvent): void => {
  if (event.matches && props.open) {
    void close("dismiss")
  }
}

watch(
  () => props.open,
  async (open) => {
    if (open) {
      previousBodyOverflow = document.body.style.overflow
      previousBodyPaddingInlineEnd = document.body.style.paddingInlineEnd
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingInlineEnd = `${scrollbarWidth}px`
      document.body.style.overflow = "hidden"
      scrollLocked = true
      window.addEventListener("keydown", handleKeydown)
      await nextTick()
      closeButton.value?.focus()
      return
    }
    releaseScrollLock()
  },
)

watch(
  () => route.fullPath,
  () => {
    if (props.open) {
      void close("route")
    }
  },
)

onMounted(() => {
  desktopMedia = window.matchMedia("(min-width: 64rem)")
  desktopMedia.addEventListener("change", handleDesktopChange)
})

onBeforeUnmount(() => {
  desktopMedia?.removeEventListener("change", handleDesktopChange)
  releaseScrollLock()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="drawer-backdrop">
      <button
        v-if="open"
        class="mobile-navigation__backdrop"
        type="button"
        tabindex="-1"
        aria-label="Close navigation"
        @click="close('dismiss')"
      />
    </Transition>
    <Transition name="drawer-panel">
      <aside
        v-if="open"
        id="mobile-navigation"
        ref="panel"
        class="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Primary navigation"
      >
        <div class="mobile-navigation__header">
          <BrandLockup inverted />
          <button
            ref="closeButton"
            class="icon-button icon-button--inverted"
            type="button"
            aria-label="Close navigation"
            @click="close('dismiss')"
          >
            <X
              :size="22"
              aria-hidden="true"
            />
          </button>
        </div>
        <nav aria-label="Mobile primary navigation">
          <ol class="mobile-navigation__list">
            <li
              v-for="(destination, index) in destinations"
              :key="destination.to"
            >
              <RouterLink
                class="mobile-navigation__link"
                :to="destination.to"
                @click="close('route')"
              >
                <span aria-hidden="true">0{{ index + 1 }}</span>
                <strong>{{ destination.label }}</strong>
              </RouterLink>
            </li>
          </ol>
        </nav>
        <p class="mobile-navigation__note">
          National Yang Ming Chiao Tung University<br>
          Department of Computer Science
        </p>
      </aside>
    </Transition>
  </Teleport>
</template>
