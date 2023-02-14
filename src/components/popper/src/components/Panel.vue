<script setup lang="ts">
import type { Component } from 'vue'
import { computed, onMounted, watch } from 'vue'
import { createPopper } from '@popperjs/core/lib/popper-lite'
import { PopoverState } from '../type'
import { usePopperContext } from '../composables/use-popper-context'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'div',
})
const api = usePopperContext('Panel')
const isShow = computed(() => api.popoverState.value === PopoverState.Show)
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
  api.show()
}
function handleMouseLeave(event: MouseEvent) {
  if (!isShow.value)
    return
  api.hide()
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
