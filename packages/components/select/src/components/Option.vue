<script setup lang="ts">
import type { Component } from 'vue'
import { computed, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import type { SelectOptionData } from '../type'
import { useOptionId } from '../composables/use-option-id'
import { useSelectContext } from '../composables/use-select-context'
const props = defineProps<{
  disabled?: boolean
  value?: any
  as?: string | Component
}>()

const api = useSelectContext('selectOption')

// option context
const id = useOptionId() // index in options array
const internalOptionRef = ref<HTMLElement | null>(null)
const dataRef = computed<SelectOptionData>(() => ({
  disabled: props.disabled || false,
  value: props.value,
  textValue: '',
  domRef: internalOptionRef,
}))
const selected = computed(() => {
  return toRaw(api.value.value) === toRaw(props.value)
})
const active = computed(() => {
  if (!api.activeOptionIndex.value)
    return null
  return id === api.options.value[api.activeOptionIndex.value]?.id
})
const state = computed(() => {
  const stateArr = []
  if (selected.value)
    stateArr.push('selected')
  if (active.value)
    stateArr.push('active')
  return stateArr.join(' ')
})

onMounted(() => {
  api.registerOption(id, dataRef)
  if (internalOptionRef.value)
    dataRef.value.textValue = internalOptionRef.value.textContent || ''

  watch([api.isOptionsOpen, selected], () => {
    if (api.isOptionsOpen.value !== true)
      return
    if (!selected.value)
      return
    api.activeOptionIndex.value = api.options.value.findIndex(option => option.id === id)
  }, {
    immediate: true,
  })
})
onUnmounted(() => {
  api.unregisterOption(id)
})

function handleClick(event: MouseEvent) {
  if (props.disabled)
    return event.preventDefault
  api.selectOption(id)
}

function handleMouseEnter(evt: PointerEvent) {
  api.activeOptionIndex.value = api.options.value.findIndex(option => option.id === id)
}
</script>

<template>
  <Component
    :is="props.as || 'li'"
    ref="internalOptionRef"
    :data-yepui-state="state"
    @mouseenter="handleMouseEnter"
    @click="handleClick"
  >
    <slot
      :selected="selected"
      :active="active"
    />
  </Component>
</template>
