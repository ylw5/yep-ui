<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import type { Modifier } from '@popperjs/core'
import { usePopperContext } from '../composables/use-popper-context'
const arrow = ref<HTMLElement | null>(null)
const api = usePopperContext('arrow')

onMounted(() => {
  nextTick(() => {
    const arrowSize = arrow.value?.offsetHeight
    if (arrowSize)
      setArrowPosition(arrow.value, arrowSize)
  })
})

// TODO: find a better way to do this
function setArrowPosition(arrow: HTMLElement | null, arrowSize: number) {
  if (!arrow)
    return
  const popperInstance = api.popoverInstance.value
  if (!popperInstance)
    return
  popperInstance.setOptions(options => ({
    ...options,
    modifiers: [
      ...(options.modifiers || []),
      {
        name: 'moveArrowPosition',
        enabled: true,
        phase: 'write',
        fn({ state }) {
          setOffset(state.placement, arrow, arrowSize / 2)
        },
      } as Modifier<'moveArrowPosition', {}>,
    ],
  }))
}
function setOffset(placement: string, arrow: HTMLElement, distance: number) {
  switch (placement) {
    case 'top':
      arrow.style.bottom = `-${distance}px`
      break
    case 'bottom':
      arrow.style.top = `-${distance}px`
      break
    case 'left':
      arrow.style.right = `-${distance}px`
      break
    case 'right':
      arrow.style.left = `-${distance}px`
      break
  }
}
</script>

<template>
  <div
    ref="arrow"
    data-popper-arrow
  />
</template>
