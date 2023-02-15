<script setup lang="ts">
import { computed } from 'vue'
import { useSelectContext } from '../composables/use-select-context'
const props = defineProps<{
  static?: boolean
  as?: string
}>()
const api = useSelectContext('selectOptions')
const isVisiable = computed(() =>
  props.static
  || api.isOptionsOpen.value,
)
</script>

<template>
  <component
    :is="as || 'ul'"
    v-if="isVisiable"
    :ref="api.optionsRef"
    tabindex="0"
  >
    <slot />
  </component>
</template>
