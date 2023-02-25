<script setup lang="ts">
import type { Component } from 'vue'
import { inject } from 'vue'
import { dialogInjectionKey } from '../../tokens'
withDefaults(defineProps<{
  as?: Component | string
}>(), {
  as: 'button',
})
const api = inject(dialogInjectionKey)
if (!api)
  throw new Error('DialogClose must be used inside Dialog')
</script>

<template>
  <Component :is="as" @click="api.close">
    <slot />
  </Component>
</template>
