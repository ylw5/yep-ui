<script setup lang="ts">
import { provide, ref } from 'vue'
import type { CheckboxGroupContext } from '../../tokens'
import { checkboxGroupInjectionKey } from '../../tokens'
const props = defineProps<{
  modelValue?: Array<string>
  max?: number
  min?: number
}>()
const emits = defineEmits(['update:modelValue', 'change'])
const groupContext: CheckboxGroupContext = {
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
provide(checkboxGroupInjectionKey, groupContext)
</script>

<template>
  <div>
    <slot />
  </div>
</template>
