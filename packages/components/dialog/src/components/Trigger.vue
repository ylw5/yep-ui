<script setup lang="ts">
import type { Component } from 'vue'
import { useDialogContext } from '../composables/use-dialog-context'
withDefaults(defineProps<{
  as?: Component | string
}>(), {
  as: 'button',
})
const api = useDialogContext('trigger')
function toggleDialog() {
  api.dialogState.value ? api.close() : api.open()
}
</script>

<template>
  <!-- FIXME: trigger focus manage(tab or enter to trigger) -->
  <component :is="as" @click="toggleDialog">
    <slot />
  </component>
</template>
