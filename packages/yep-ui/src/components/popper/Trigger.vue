<script setup lang="ts">
import { inject } from 'vue'
import type { Component } from 'vue'
import { PopperState, TriggerType, popperInjectionKey } from '../../tokens/popper'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'button',
})
const api = inject(popperInjectionKey, null)
if (!api)
  throw new Error('Trigger must be used inside Popper')

const triggerType = api.triggerType.value

function handleClick() {
  if (triggerType !== TriggerType.Click)
    return

  switch (api?.popperState.value) {
    case PopperState.Show:
      api.hide()
      break
    case PopperState.Hide:
      api.show()
      break
  }
}

function handleMouseEnter() {
  if (triggerType !== TriggerType.Hover)
    return
  api?.show()
}
function handleMouseLeave() {
  if (triggerType !== TriggerType.Hover)
    return
  api?.hide()
}
</script>

<template>
  <Component
    :is="props.as"
    :ref="api.triggerRef"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </Component>
</template>
