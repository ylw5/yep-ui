<script setup lang="ts">
import type { Component } from 'vue'
import { computed, inject, onMounted, watch } from 'vue'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import { PopperState, popperInjectionKey } from '../../tokens/popper'
// import { PopoverState } from './src/type'
// import { usePopperContext } from './src/composables/use-popper-context'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'div',
})
const api = inject(popperInjectionKey, null)
if (!api)
  throw new Error('Panel must be used inside Popper')
const isShow = computed(() => api.popperState.value === PopperState.Show)
onMounted(() => {
  watch(isShow, (value) => {
    if (value)
      api.show()
    else
      api.hide()
  }, {
    immediate: true,
  })
})

function handleMouseEnter(event: MouseEvent) {
  if (!isShow.value)
    return
  api?.show()
}
function handleMouseLeave(event: MouseEvent) {
  if (!isShow.value)
    return
  api?.hide()
}
</script>

<template>
  <Teleport to="body">
    <Component
      v-bind="$attrs"
      :is="as"
      :ref="api.panelRef"
      @mouseenter="handleMouseEnter"
    >
      <slot />
    </Component>
  </Teleport>
</template>
