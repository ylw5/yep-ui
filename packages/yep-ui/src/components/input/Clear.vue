<script setup lang="ts">
import { inject } from 'vue'
import { inputGroupInjectionKey } from '../../tokens'
defineProps({
  as: {
    type: String,
    default: 'button',
  },
})
const inputGroupContext = inject(inputGroupInjectionKey, null)
</script>

<template>
  <Component
    :is="as"
    @click="inputGroupContext?.clear"
  >
    <slot v-if="inputGroupContext?.input.value?.text.value">
      <i class="i-carbon:close-outline" />
    </slot>
  </Component>
</template>
