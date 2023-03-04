<script setup lang="ts">
import { inject, nextTick } from 'vue'
import { useId } from '../../composables'
import { Focus } from '../../utils/use-active-index'
import { SelectContextInjectionKey, SelectboxStates, ValueMode } from '../../tokens'
const props = defineProps({
  as: { type: [Object, String], default: 'button' },
  id: { type: String, default: () => `yep-select-trigger-${useId()}` },
})
const selectContext = inject(SelectContextInjectionKey, null)
if (!selectContext)
  throw new Error('selectTrigger must be used inside select')

function handleClick(event: MouseEvent) {
  if (!selectContext)
    return
  if (selectContext.disabled.value)
    return

  if (selectContext.selectboxState.value === SelectboxStates.Open) {
    selectContext.closeSelectbox()
    // nextTick(() => selectContext.triggerRef.value?.focus({ preventScroll: true }))
  }
  else {
    event.preventDefault()
    selectContext.openSelectbox()
    // nextTick(() => selectContext.optionsRef.value?.focus({ preventScroll: true }))
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (!selectContext)
    return
  // isTyping.value = true
  switch (event.key) {
    case ' ':
    case 'Enter':
      event.preventDefault()
      if (selectContext.selectboxState.value === SelectboxStates.Closed) {
        selectContext.openSelectbox()
        nextTick(() => {
          // selectContext.optionsRef.value?.focus({ preventScroll: true })
          if (!selectContext.value.value)
            selectContext.goToOption(Focus.First)
        })
      }
      else {
        if (selectContext.activeOptionIndex.value !== null) {
          const activeOption = selectContext.options.value[selectContext.activeOptionIndex.value]
          selectContext.select(activeOption.dataRef.value.value)

          if (selectContext.mode.value === ValueMode.Single) {
            selectContext.closeSelectbox()
            nextTick(() => selectContext.triggerRef.value?.focus({ preventScroll: true }))
          }
        }
      }
      break
    case 'ArrowDown':
      event.preventDefault()
      if (selectContext.selectboxState.value === SelectboxStates.Closed) {
        selectContext.openSelectbox()
        nextTick(() => {
          // selectContext.optionsRef.value?.focus({ preventScroll: true })
          if (!selectContext.value.value)
            selectContext.goToOption(Focus.First)
        })
      }
      else {
        selectContext.goToOption(Focus.Next)
      }
      break

    case 'ArrowUp':
      if (selectContext.selectboxState.value === SelectboxStates.Open) {
        event.preventDefault()
        selectContext.goToOption(Focus.Previous)
      }
      break

    case 'Home':
    case 'PageUp':
      if (selectContext.selectboxState.value === SelectboxStates.Open) {
        event.preventDefault()
        event.stopPropagation()
        return selectContext.goToOption(Focus.First)
      }
      break

    case 'Escape':
      if (selectContext.selectboxState.value === SelectboxStates.Open) {
        event.preventDefault()
        event.stopPropagation()
        selectContext.closeSelectbox()
        nextTick(() => selectContext.triggerRef.value?.focus({ preventScroll: true }))
      }
      break
    default:
      if (event.key.length === 1)
        selectContext.search(event.key)
  }
}

// function handleKeyUp(event: KeyboardEvent) {
//   switch (event.key) {
//     case ' ':
//       event.preventDefault()
//       break
//   }
// }
</script>

<template>
  <component
    :is="as"
    :id="props.id"
    :ref="selectContext.triggerRef"
    :aria-haspopup="selectContext.disabled
      ? undefined
      : 'listbox'"
    :aria-controls="selectContext?.optionsRef.value?.id"
    :aria-expanded="selectContext.disabled
      ? undefined
      : selectContext?.selectboxState.value === SelectboxStates.Open"
    :aria-labelledby="selectContext?.labelRef.value?.id ?? undefined"
    @click="handleClick"
    @keydown="handleKeyDown"
  >
    <slot
      :open="selectContext.selectboxState.value === SelectboxStates.Open"
      :value="selectContext.value.value"
    />
  </component>
</template>
