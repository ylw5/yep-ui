<script setup lang="ts">
import type { Component } from 'vue'
import { usePopperContext } from '../composables/use-popper-context'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'button',
})
const api = usePopperContext('close')
</script>

<template>
  <component
    :is="as"
    @click="api.hide()"
  >
    <slot />
  </component>
</template>
