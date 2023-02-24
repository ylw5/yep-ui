<script setup lang="ts">
import type { Component } from 'vue'
import { inject } from 'vue'
import { dialogInjectionKey } from '@yep-ui/tokens'
withDefaults(defineProps<{
  as?: Component | string
}>(), {
  as: 'button',
})
const api = inject(dialogInjectionKey)
</script>

<template>
  <Component :is="as" @click="api.close">
    <slot />
  </Component>
</template>
