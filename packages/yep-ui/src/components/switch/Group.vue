<script setup lang="ts">
import { provide, ref } from 'vue'
import { switchGroupContextInjectionKey } from '../../tokens'
import type { SwitchGroupContext } from '../../tokens'
const props = defineProps({
  as: {
    type: [Object, String],
    default: 'div',
  },
})

const switchRef = ref<SwitchGroupContext['switchRef']['value']>(null)
const groupContext: SwitchGroupContext = {
  switchRef,
  state: null,
  toggle: null,
}
provide(switchGroupContextInjectionKey, groupContext)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
