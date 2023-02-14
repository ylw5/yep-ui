<script setup lang="ts">
import type { Component } from 'vue'
import { onMounted } from 'vue'
import { usePopperContext } from '../composables/use-popper-context'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'div',
})
const api = usePopperContext('Anchor')
onMounted(() => {
  api.popoverInstance.value?.update()
})
</script>

<template>
  <Component
    :is="props.as"
    :ref="api.anchorRef"
  >
    <slot />
  </Component>
</template>
