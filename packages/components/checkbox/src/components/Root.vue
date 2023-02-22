<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, shallowRef, watch, watchEffect } from 'vue'
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
const groupContext = useGroupContext('root')
const checkboxRoot = ref<HTMLElement | null>(null)

const indicator = shallowRef<StateDefinition['indicator']['value']>(null)
const checkboxState = ref<StateDefinition['checkboxState']['value']>(false)
const value = ref<StateDefinition['value']['value']>(null)
const disable = ref<StateDefinition['disabled']['value']>(false)
// handle min and max in group
const diableInGroup = computed(() => {
  if (!groupContext)
    return false

  if (groupContext.max && groupContext.selectCount.value >= groupContext.max)
    return !api.checkboxState.value
  else if (groupContext.min && groupContext.selectCount.value < groupContext.min)
    return api.checkboxState.value

  return false
})

const api: StateDefinition = {
  value: computed(() => props.value || value.value),
  disabled: computed(() => props.disabled || diableInGroup.value || disable.value),
  checkboxState: computed(() => {
    if (groupContext)
      return groupContext.values?.value.slice().includes(api.value.value || '')

    return props.modelValue || checkboxState.value
  }),
  indicator,

  select(value) {
    if (groupContext) {
      groupContext.select(value, api.value.value || '')
    }
    else {
      emits('update:modelValue', value)
      checkboxState.value = value
    }
  },
}

provideCheckboxContext(api)

onMounted(() => {
  watchEffect(() => {
    // text node content in default slot is value when value is not set
    checkboxRoot.value?.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent)
        value.value = node.textContent.trim()
    })
  })
  watch(api.checkboxState, (value) => {
    if (!groupContext)
      return
    value ? groupContext.selectCount.value++ : groupContext.selectCount.value--
  }, {
    immediate: true,
  })
})

function handleChange(event: Event) {
  api.select((event.target as HTMLInputElement).checked)
  emits('change', event)
}

const state = computed(() => {
  return [
  `${api.disabled.value ? 'disabled' : ''}`,
  `${api.checkboxState.value ? 'checked' : ''}`,
  ].join('') || undefined
})

// hide native input when indicator is seted
const nativeInputStyles = computed(() => {
  if (!api.indicator.value?.domRef.value)
    return ''
  return `
    opacity:0;
    position:absolute;
    border:0;
    width:1px;
    height:1px;
    margin:-1px;
    padding:0;
    overflow:hidden;
  `
})

onUnmounted(() => {
  if (!groupContext)
    return
  if (api.checkboxState.value)
    groupContext.selectCount.value--
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <label ref="checkboxRoot" :data-state="state">
    {{ api.disabled.value }}
    <input
      :disabled="api.disabled.value"
      aria-hidden="false"
      type="checkbox"
      :style="nativeInputStyles"
      :checked="api.checkboxState.value"
      :value="api.value.value"
      v-bind="$attrs"
      @change="handleChange"
    >
    <slot
      :checked="api.checkboxState.value"
      :disabled="api.disabled"
    >
      {{ api.value.value }}
    </slot>
  </label>
</template>
