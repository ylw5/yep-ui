<script setup lang="ts">
import { ref } from 'vue'
import { useCheckboxContext } from '../composables/use-checkbox-context'

const internalRef = ref<HTMLElement | null>()
const api = useCheckboxContext('Indicator')
</script>

<template>
  <span
    ref="internalRef"
  >

    <slot
      v-if="api?.checkboxState.value"
    />
  </span>
</template>
