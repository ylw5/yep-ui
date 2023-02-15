<script setup lang="ts">
import type { Component } from 'vue'
import { usePopperContext } from '../composables/use-popper-context'
import { PopoverState, TriggerType } from '../type'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'button',
})
const api = usePopperContext('Trigger')

const triggerType = api.triggerType.value

function handleClick() {
  if (triggerType !== TriggerType.Click)
    return

  switch (api.popoverState.value) {
    case PopoverState.Show:
      api.hide()
      break
    case PopoverState.Hide:
      api.show()
      break
  }
}

function handleMouseEnter() {
  if (triggerType !== TriggerType.Hover)
    return
  api.show()
}
function handleMouseLeave() {
  if (triggerType !== TriggerType.Hover)
    return
  api.hide()
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
