<script setup lang="ts">
import { computed, inject, nextTick, onMounted, watch } from 'vue'
import { createPopper, popper } from '@popperjs/core'
import { useId } from '../../composables'
import { Focus } from '../../utils/use-active-index'
import { SelectContextInjectionKey, SelectboxStates, ValueMode } from '../../tokens'
// import { useSelectContext } from './composables/use-select-context'
const props = defineProps({
  as: { type: [Object, String], default: 'ul' },
  static: { type: Boolean, default: false },
  id: { type: String, default: () => `yep-select-options-${useId()}` },
})
const selectContext = inject(SelectContextInjectionKey, null)
if (!selectContext)
  throw new Error('selectOptions must be used inside select')

function handleKeyDown(event: KeyboardEvent) {
  if (!selectContext)
    return

  switch (event.key) {
    case ' ':
      if (selectContext.searchQuery.value !== '') {
        event.preventDefault()
        event.stopPropagation()
        // TODO: ??????
        return selectContext.search(event.key)
      }
      break

    case 'Enter':
      event.preventDefault()
      event.stopPropagation()
      if (selectContext.activeOptionIndex.value !== null) {
        const activeOption = selectContext.options.value[selectContext.activeOptionIndex.value]
        selectContext.select(activeOption.dataRef.value.value)

        if (selectContext.mode.value === ValueMode.Single) {
          selectContext.closeSelectbox()
          nextTick(() => selectContext.triggerRef.value?.focus({ preventScroll: true }))
        }
      }
      break

    case 'ArrowDown':
    case 'ArrowRight':
      event.preventDefault()
      event.stopPropagation()
      selectContext.goToOption(Focus.Next)
      break

    case 'ArrowUp':
    case 'ArrowLeft':
      event.preventDefault()
      event.stopPropagation()
      selectContext.goToOption(Focus.Previous)
      break

    case 'Home':
    case 'PageUp':
      event.preventDefault()
      event.stopPropagation()
      return selectContext.goToOption(Focus.First)

    case 'Escape':
      event.preventDefault()
      event.stopPropagation()
      selectContext.closeSelectbox()
      nextTick(() => selectContext.triggerRef.value?.focus({ preventScroll: true }))
      break

    case 'Tab':
      event.preventDefault()
      event.stopPropagation()
      break
  }
}

const visible = computed(() => {
  if (!selectContext)
    return false

  return selectContext.selectboxState.value === SelectboxStates.Open
})
onMounted(() => {
  if (!selectContext.triggerRef.value || !selectContext.optionsRef.value)
    return
  const instance = createPopper(selectContext.triggerRef.value, selectContext.optionsRef.value, {
    placement: 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
      {
        name: 'preventOverflow',
        options: {
          padding: 8,
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
        },
      },
    ],
  })
  watch(visible, (value) => {
    if (value)
      instance.update()
  })
})
</script>

<template>
  <component
    :is="as"
    v-show="visible || static"
    :id="id"
    :ref="selectContext.optionsRef"
    tabindex="0"
    :aria-multiselectable="selectContext.mode.value === ValueMode.Multi"
    :aria-labelledby="selectContext.labelRef.value?.id ?? selectContext.triggerRef.value?.id"
    role="listbox"
    @keydown="handleKeyDown"
  >
    <slot
      :open="selectContext.selectboxState.value === SelectboxStates.Open"
    />
  </component>
</template>
