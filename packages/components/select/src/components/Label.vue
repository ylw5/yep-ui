<script setup lang="ts">
import { useSelectContext } from '../composables/use-select-context'

const api = useSelectContext('selectLabel')
function handleClick() {
  api.triggerRef.value?.focus()
}
</script>

<template>
  <label @click="handleClick">
    <slot />
  </label>
</template>
