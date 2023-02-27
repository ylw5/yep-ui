<script setup lang="ts">
import { inject } from 'vue'
import type { Component } from 'vue'
import { popperInjectionKey } from '../../tokens/popper'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'button',
})
const api = inject(popperInjectionKey, null)
if (!api)
  throw new Error('Close must be used inside Popper')
</script>

<template>
  <component
    :is="as"
    @click="api.hide()"
  >
    <slot />
  </component>
</template>
