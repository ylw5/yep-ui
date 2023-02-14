<script setup lang="ts">
import type { ComputedRef } from 'vue'
import { computed, ref, shallowRef, toRefs } from 'vue'
import type { SelectOptionData, StateDefinition } from '../type'
import { ValueMode } from '../type'
import { useOutsideClick } from '../../../../hooks/use-outside-click'
import { provideSelectContext } from '../composables/use-select-context'
import { isInFocusableElement } from '../../../../untils/focus-management'
const props = defineProps<{
  modelValue?: any
  disabled?: boolean
  mode?: ValueMode
}>()
const emit = defineEmits(['update:modelValue'])
const mode = computed(() => props.mode || ValueMode.Single)
const isOptionsOpen = ref<StateDefinition['isOptionsOpen']['value']>(false)
const triggerRef = ref<StateDefinition['triggerRef']['value']>(null)
const optionsRef = ref<StateDefinition['optionsRef']['value']>(null)
const options = shallowRef<StateDefinition['options']['value']>([])
const activeOptionIndex = ref<StateDefinition['activeOptionIndex']['value']>(null)
const searchQuery = ref<StateDefinition['searchQuery']['value']>('')
const api: StateDefinition = {
  isOptionsOpen,
  value: computed(() => props.modelValue),
  triggerRef,
  optionsRef,
  options,
  mode,
  disabled: computed(() => props.disabled || false),
  activeOptionIndex,
  searchQuery,

  registerOption: (id: number, dataRef: ComputedRef<SelectOptionData>) => {
    const option = { id, dataRef }
    const adjustedState = adjustOptions(options => [...options, option])
    options.value = adjustedState.options
    activeOptionIndex.value = adjustedState.activeOptionIndex
  },
  unregisterOption: (id: number) => {
    const adjustedState = adjustOptions((options) => {
      const idx = options.findIndex(o => o.id === id)
      if (idx !== -1)
        options.splice(idx, 1)
      return options
    })
    options.value = adjustedState.options
    activeOptionIndex.value = adjustedState.activeOptionIndex
  },
  openOptions: () => {
    if (props.disabled)
      return
    if (isOptionsOpen.value === true)
      return
    isOptionsOpen.value = true
  },
  closeOptions: () => {
    if (props.disabled)
      return
    if (isOptionsOpen.value === false)
      return
    isOptionsOpen.value = false
    activeOptionIndex.value = null
  },
  selectOption: (id: number) => {
    const option = options.value.find(o => o.id === id)
    if (!option || props.disabled)
      return
    const { dataRef } = option
    emit('update:modelValue', dataRef.value.value)
    api.closeOptions()
  },
}

// handle outside click
useOutsideClick(
  [api.optionsRef, api.triggerRef],
  (event, target) => {
    api.closeOptions()
    if (isInFocusableElement(target)) {
      event.preventDefault()
      triggerRef.value?.focus()
    }
  },
  computed(() => api.isOptionsOpen.value === true),
)

provideSelectContext(api)

function adjustOptions(
  adjustment: (options: StateDefinition['options']['value']) => StateDefinition['options']['value'],
) {
  const currentActiveOption
      = activeOptionIndex.value !== null
        ? options.value[activeOptionIndex.value]
        : null

  const sortedOptions
      = sortByDomNode(adjustment(options.value), o => o.dataRef.value.domRef.value)

  // If we insert an option before the current active option
  // we need to adjust
  let adjustedActiveOptionIndex
      = currentActiveOption
        ? sortedOptions.indexOf(currentActiveOption)
        : null

  // Reset to null in case the current active option was unmounted
  if (adjustedActiveOptionIndex === -1)
    adjustedActiveOptionIndex = null

  return {
    options: sortedOptions,
    activeOptionIndex: adjustedActiveOptionIndex,
  }
}

function sortByDomNode<T>(
  nodes: T[],
  resolveNode: (node: T) => HTMLElement | null,
): T[] {
  return nodes.slice().sort((a, b) => {
    const aNode = resolveNode(a)
    const bNode = resolveNode(b)
    if (!aNode || !bNode)
      return 0
    const position = aNode.compareDocumentPosition(bNode)
    if (position & Node.DOCUMENT_POSITION_FOLLOWING)
      return -1
    if (position & Node.DOCUMENT_POSITION_PRECEDING)
      return 1
    return 0
  })
}
</script>

<template>
  <div
    :tabindex="disabled ? undefined : -1"
  >
    <slot :open="api.isOptionsOpen" />
  </div>
</template>
