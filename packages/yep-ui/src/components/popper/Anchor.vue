<script setup lang="ts">
import type { Component } from 'vue'
import { inject, onMounted } from 'vue'
import { popperInjectionKey } from '../../tokens/popper'
const props = withDefaults(defineProps<{
  as?: string | Component
}>(), {
  as: 'div',
})
const api = inject(popperInjectionKey, null)
if (!api)
  throw new Error('Anchor must be used inside Popper')
onMounted(() => {
  api.popperInstance.value?.update()
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
