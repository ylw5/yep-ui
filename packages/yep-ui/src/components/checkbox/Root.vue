<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, ref, shallowRef, watch, watchEffect } from 'vue'
import { checkboxGroupInjectionKey, checkboxInjectionKey } from '../../tokens'
import type { CheckboxContext } from '../../tokens'
import Indicator from './Indicator.vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  value: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: undefined,
  },
})
const emits = defineEmits(['update:modelValue', 'change'])

const groupContext = inject(checkboxGroupInjectionKey, null)
const checkboxRoot = ref<HTMLElement | null>(null)

const indicator = shallowRef<CheckboxContext['indicator']['value']>(null)
const checkboxState = ref<CheckboxContext['checkboxState']['value']>(false)
const value = ref<CheckboxContext['value']['value']>(null)
const disable = ref<CheckboxContext['disabled']['value']>(false)
// handle min and max in group
const diableInGroup = computed(() => {
  if (!groupContext)
    return false
  const selectCount = groupContext.values.value.length

  if (groupContext.max && selectCount >= groupContext.max)
    return !api.checkboxState.value
  else if (groupContext.min && selectCount <= groupContext.min)
    return api.checkboxState.value

  return false
})

const api: CheckboxContext = {
  value: computed(() => props.value ?? value.value),
  disabled: computed(() => props.disabled ?? diableInGroup.value ?? disable.value),
  checkboxState: computed(() => {
    if (groupContext)
      return groupContext.values?.value.slice().includes(api.value.value || '')

    return props.modelValue ?? checkboxState.value
  }),
  indicator,

  select(value) {
    if (props.modelValue !== undefined)
      emits('update:modelValue', value)
    else checkboxState.value = value
    emits('change', value)
  },
}

provide(checkboxInjectionKey, api)

onMounted(() => {
  watchEffect(() => {
    // text node content in default slot wil be default value
    checkboxRoot.value?.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent)
        value.value = node.textContent.trim()
    })
  })
  watch(api.checkboxState, (value) => {
    handleSelect(value)
  }, {
    immediate: true,
  })
})

function handleChange(event: Event) {
  const checked = (event.target as HTMLInputElement).checked
  // handleSelect(checked)
  handleSelect(checked)
}

function handleSelect(checked: boolean) {
  if (groupContext)
    groupContext.select(checked, api.value.value || '')
  else api.select(checked)
}

const state = computed(() => {
  return [
    api.disabled.value ? 'disabled' : undefined,
    api.checkboxState.value ? 'checked' : undefined,
  ].filter(Boolean).join(' ') || undefined
})

onUnmounted(() => {
  if (!groupContext)
    return
  if (api.checkboxState.value)
    groupContext.selectCount.value--
})

const inputStyle = computed(() => {
  if (!api.indicator.value?.domRef && !props.value)
    return ''
  else return 'opacity:0;position:absolute;border:0;width:0px;height:0px;margin:-1px;padding:0;overflow:hidden;'
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <label
    ref="checkboxRoot"
    :data-state="state"
    :class="$attrs.class"
  >
    <input
      :value="api.value.value"
      :disabled="api.disabled.value"
      aria-hidden="false"
      type="checkbox"
      :checked="api.checkboxState.value"
      :style="inputStyle"
      v-bind="$attrs"
      @change="handleChange"
    >
    <slot
      :checked="api.checkboxState.value"
      :disabled="api.disabled"
    >
      <Indicator class="indicator" />
      {{ api.value.value }}
    </slot>

  </label>
</template>
