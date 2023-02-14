<script setup lang="ts">
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import type { StateDefinition } from '../type'
import { useId } from '../composables/use-checkbox-id'
import { provideCheckboxContext } from '../composables/use-checkbox-context'
import { useGroupContext } from '../composables/use-group-context'
const props = withDefaults(defineProps<{
  id?: string
  modelValue?: boolean | null
  value?: string
  disabled?: boolean
}>(), {
  id: `yepui-checkbox-${useId()}`,
  modelValue: null,
})
const emits = defineEmits(['update:modelValue', 'change'])

const indicator = ref<StateDefinition['indicator']['value']>()

const groupContext = useGroupContext('root')

const checkboxState = ref<StateDefinition['checkboxState']['value']>(props.modelValue ?? false)

const api: StateDefinition = {
  value: props.value,
  disabled: props.disabled,
  checkboxState: computed(() => {
    if (groupContext)
      return groupContext.values?.value.slice().includes(props.value ?? '')

    else return checkboxState.value
  }),
  indicator,

  select(value) {
    emits('update:modelValue', value)

    if (groupContext)
      groupContext.select(value, props.value ?? '')

    else checkboxState.value = value
  },
}

provideCheckboxContext(api)

const state = computed(() => {
  const stateArr: string[] = []
  if (api.disabled)
    stateArr.push('disabled')
  if (api.checkboxState.value)
    stateArr.push('checked')
  return stateArr.join(' ')
})

function handleChange(event: Event & { target: HTMLInputElement }) {
  api.select(event.target.checked)
  emits('change', event)
}
</script>

<template>
  <label :data-yepui-state="state">
    <input
      :id="id"
      :disabled="api.disabled"
      aria-hidden="false"
      type="checkbox"
      class="opacity-0 absolute border-none w-1 h-1 -m-1 p-0 overflow-hidden border-0"
      :checked="api.checkboxState.value"
      :value="api.value"
      @change="handleChange"
    >
    <slot
      :checked="api.checkboxState.value"
      :disabled="api.disabled"
    />
  </label>
</template>
