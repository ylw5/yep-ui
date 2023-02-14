<script setup lang="ts">
import { ref } from 'vue'
import { provideGroupContext } from '../composables/use-group-context'
import type { GroupStateDefinition } from '../type'
const props = defineProps<{
  modelValue?: Array<string>
}>()
const emits = defineEmits(['update:modelValue', 'change'])
const groupContext: GroupStateDefinition = {
  values: ref(props.modelValue || []),
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
