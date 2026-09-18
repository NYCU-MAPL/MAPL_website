<script setup lang="ts">
defineProps<{
  readonly targetId: string
}>()

const focusTarget = (event: MouseEvent): void => {
  event.preventDefault()
  const anchor = event.currentTarget
  if (!(anchor instanceof HTMLAnchorElement)) {
    return
  }
  const target = document.getElementById(anchor.hash.slice(1))
  if (target instanceof HTMLElement) {
    target.focus()
  }
}
</script>

<template>
  <a
    class="skip-link"
    :href="`#${targetId}`"
    @click="focusTarget"
  >Skip to main content</a>
</template>
