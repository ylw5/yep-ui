<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, provide, ref, shallowRef, watch, watchEffect } from 'vue'
import { checkboxGroupInjectionKey, checkboxInjectionKey } from '@yep-ui/tokens'
import type { CheckboxContext } from '@yep-ui/tokens'
import Indicator from './Indicator.vue'

const props = withDefaults(defineProps<{
  id?: string
  modelValue?: boolean | null
  value?: string
  disabled?: boolean
}>(), {
  modelValue: null,
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

  if (groupContext.max && groupContext.selectCount.value >= groupContext.max)
    return !api.checkboxState.value
  else if (groupContext.min && groupContext.selectCount.value < groupContext.min)
    return api.checkboxState.value

  return false
})

const api: CheckboxContext = {
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
  <label
    ref="checkboxRoot"
    :data-state="state"
    :class="$attrs.class"
  >
    <input
      :disabled="api.disabled.value"
      aria-hidden="false"
      type="checkbox"
      style="opacity:0;position:absolute;border:0;width:1px;height:1px;margin:-1px;padding:0;overflow:hidden;"
      :checked="api.checkboxState.value"
      :value="api.value.value"
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
