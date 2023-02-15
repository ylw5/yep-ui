<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { ValueMode } from '../type'
import { useSelectContext } from '../composables/use-select-context'
const props = defineProps<{
  as?: string
  input?: boolean
  displayValue?: (value: any) => string
}>()
const api = useSelectContext('selectTigger')

const isTyping = ref(false)
watch(api.value, () => {
  isTyping.value = false
})

function handleClick(evt: MouseEvent) {
  evt.stopPropagation()
  evt.preventDefault()
  if (api.disabled.value)
    return
  if (api.isOptionsOpen.value === true) {
    api.closeOptions()
  }
  else {
    evt.preventDefault()
    api.openOptions()
  }
}

function handleKeyDown(evt: KeyboardEvent) {
  isTyping.value = true
  switch (evt.key) {
    case 'Enter':
      isTyping.value = false
      evt.preventDefault()
      evt.stopPropagation()
      if (api.isOptionsOpen.value === false) {
        api.openOptions()
        break
      }

      if (api.activeOptionIndex.value === null) {
        api.closeOptions()
        break
      }
      else {
        const activeOption = api.options.value[api.activeOptionIndex.value]
        if (activeOption)
          api.selectOption(activeOption.id)
      }

      if (api.mode.value === ValueMode.Single)
        api.closeOptions()

      break
    case 'ArrowUp':
      isTyping.value = false
      evt.preventDefault()
      evt.stopPropagation()
      if (!api.options.value?.length)
        break
      if (api.activeOptionIndex.value === null) {
        api.activeOptionIndex.value = api.options.value.length - 1
      }
      else {
        const activeIndex = api.activeOptionIndex
        const optionLen = api.options.value.length
        if (!activeIndex.value)
          activeIndex.value = optionLen - 1
        else
          activeIndex.value = activeIndex.value - 1
      }
      break
    case 'ArrowDown':
      isTyping.value = false
      evt.preventDefault()
      evt.stopPropagation()
      if (api.isOptionsOpen.value === false) {
        api.openOptions()
        break
      }
      if (!api.options.value?.length)
        break
      if (api.activeOptionIndex.value === null) {
        api.activeOptionIndex.value = 0
      }
      else {
        const activeIndex = api.activeOptionIndex
        const optionLen = api.options.value.length
        if (!activeIndex.value || activeIndex.value === optionLen - 1)
          activeIndex.value = 0
        else
          activeIndex.value = activeIndex.value + 1
      }
      break
  }
}

const currentDisplayValue = computed(() => {
  const value = api.value.value
  if (!api.triggerRef.value)
    return ''
  if (typeof props.displayValue !== 'undefined' && value !== 'undefined') {
    try {
      return props.displayValue(value)
    }
    catch (error) {
      return ''
    }
  }
  if (typeof value === 'string')
    return value
  return ''
})

onMounted(() => {
  watch(
    [currentDisplayValue, api.isOptionsOpen],
    ([currentDisplayValue, state], [prevDisplayValue, prevstate]) => {
      if (props.as)
        return
      if (isTyping.value)
        return
      const input = api.triggerRef.value as HTMLInputElement
      if (!input)
        return

      if (state === false && prevstate === true)
        input.value = currentDisplayValue
      else if (currentDisplayValue !== prevDisplayValue)
        input.value = currentDisplayValue
    },
    { immediate: true },
  )
})
function handleInput(evt: Event) {
  if (api.isOptionsOpen.value === false)
    api.openOptions()
}
function handleBlur() {
  isTyping.value = false
}
</script>

<template>
  <template v-if="as === 'button'">
    <button
      :ref="api.triggerRef"
      type="button"
      @click="handleClick"
      @keydown="handleKeyDown"
    >
      <slot />
    </button>
  </template>
  <input
    v-else
    :ref="api.triggerRef"
    :readonly="!input"
    type="text"
    @keydown="handleKeyDown"
    @input="handleInput"
    @blur="handleBlur"
    @click="handleClick"
  >
</template>
