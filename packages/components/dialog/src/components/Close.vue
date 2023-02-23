<script setup lang="ts">
import type { Component } from 'vue'
import { useDialogContext } from '../composables/use-dialog-context'
withDefaults(defineProps<{
  as?: Component | string
}>(), {
  as: 'button',
})
const api = useDialogContext('trigger')
</script>

<template>
  <component :is="as" @click="api.close">
    <slot />
  </component>
</template>
