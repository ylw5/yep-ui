<script setup lang="ts">
import { inject } from 'vue'
import { switchGroupContextInjectionKey } from '../../tokens'
defineProps({
  as: {
    type: [Object, String],
    default: 'label',
  },
})
const api = inject(switchGroupContextInjectionKey, null)
if (!api)
  throw new Error('Label must be used inside SwitchGroup')
function handleClick() {
  if (api?.toggle)
    api.toggle()
}
</script>

<template>
  <component
    :is="as"
    :data-state="api.state?.value ? 'checked' : undefined"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
