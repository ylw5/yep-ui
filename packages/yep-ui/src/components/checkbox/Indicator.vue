<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { checkboxInjectionKey } from '../../tokens'
// import { useCheckboxContext } from '../composables/use-checkbox-context'
const internalRef = ref(null)
const api = inject(checkboxInjectionKey, null)
onMounted(() => {
  if (!api)
    throw new Error('You should wrap Indicator component with Checkbox.Root component.')
  api.indicator.value = {
    domRef: internalRef,
  }
})
</script>

<template>
  <span
    ref="internalRef"
    :aria-checked="api?.checkboxState.value || undefined"
    :data-state="api?.checkboxState.value ? 'checked' : undefined"
  >
    <slot v-if="api?.checkboxState.value ">
      <i class="i-ion:checkmark-round" />
    </slot>
  </span>
</template>
