<script setup lang="ts">
import { inject } from 'vue'
import type { Component } from 'vue'
import { dialogInjectionKey } from '../../tokens'
const props = defineProps({
  as: { type: [String, Object], default: 'button' },
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
  <component :is="as" @click="toggleDialog">
    <slot />
  </component>
</template>
