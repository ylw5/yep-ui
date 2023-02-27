<script setup lang="ts">
import { inject } from 'vue'
import type { Component } from 'vue'
import { dialogInjectionKey } from '../../tokens'
withDefaults(defineProps<{
  as?: Component | string
}>(), {
  as: 'button',
})

const api = inject(dialogInjectionKey, null)
if (!api)
  throw new Error('dialogTrigger without Root')
function toggleDialog() {
  if (!api)
    return
  api.dialogState.value ? api.close() : api.open()
}
</script>

<template>
  <!-- FIXME: trigger focus manage(tab or enter to trigger) -->
  <component :is="as" @click="toggleDialog">
    <slot />
  </component>
</template>
