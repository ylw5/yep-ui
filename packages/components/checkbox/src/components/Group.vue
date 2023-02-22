<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { provideGroupContext } from '../composables/use-group-context'
import type { GroupStateDefinition, StateDefinition } from '../type'
const props = defineProps<{
  modelValue?: Array<string>
  max?: number
  min?: number
}>()
const emits = defineEmits(['update:modelValue', 'change'])
const groupContext: GroupStateDefinition = {
  max: props.max,
  min: props.min,
  values: ref(props.modelValue || []),

  selectCount: ref(0),
  select(value, valueToSelect) {
    if (value && !groupContext.values.value.includes(valueToSelect))
      groupContext.values.value.push(valueToSelect)
    else
      groupContext.values.value = groupContext.values.value.filter(v => v !== valueToSelect)

    emits('update:modelValue', groupContext.values.value)
    emits('change')
  },
}
provideGroupContext(groupContext)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
