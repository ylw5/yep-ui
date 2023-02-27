<script setup lang="ts">
import { inject, nextTick, onMounted, ref } from 'vue'
import type { Modifier } from '@popperjs/core'
import { popperInjectionKey } from '../../tokens/popper'
const arrow = ref<HTMLElement | null>(null)
const api = inject(popperInjectionKey, null)
if (!api)
  throw new Error('Panel must be used inside Popper')

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
  const popperInstance = api?.popperInstance.value
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
