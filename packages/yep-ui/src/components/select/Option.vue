<script setup lang="ts">
import { computed, inject, nextTick, onMounted, onUnmounted, ref, toRaw, watch } from 'vue'
import { useId } from '../../composables'
import type { SelectOptionData } from '../../tokens'
import { SelectContextInjectionKey, SelectboxStates, ValueMode } from '../../tokens'
import { Focus } from '../../utils/use-active-index'
const props = defineProps({
  as: { type: [Object, String], default: 'li' },
  value: { type: [Object, String, Number, Boolean], default: null },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: () => `yep-select-option-${useId()}` },
})

const selectContext = inject(SelectContextInjectionKey, null)
if (!selectContext)
  throw new Error('selectOption must be used inside select')

const internalOptionRef = ref<HTMLElement | null>(null)

const active = computed(() => {
  return selectContext.activeOptionIndex.value !== null
    ? selectContext.options.value[selectContext.activeOptionIndex.value].id === props.id
    : false
})

const selected = computed(() => {
  if (selectContext.mode.value === ValueMode.Single) {
    return selectContext.compare(toRaw(selectContext.value.value), toRaw(props.value))
  }
  else {
    return (toRaw(selectContext.value.value) as unknown[]).some(value =>
      selectContext.compare(toRaw(value), toRaw(props.value)),
    )
  }
})

// TODO: ??
const isFirstSelected = computed(() => {
  if (selectContext.mode.value === ValueMode.Single) {
    return selected.value
  }
  else {
    const curValues = toRaw(selectContext.value.value) as unknown[]

    return selectContext.options.value.find(option =>
      curValues.some(value => selectContext.compare(toRaw(value), toRaw(option.dataRef.value.value))),
    )?.id === props.id
  }
})

const dataRef = computed<SelectOptionData>(() => ({
  disabled: props.disabled,
  value: props.value,
  textValue: '',
  domRef: internalOptionRef,
}))
onMounted(() => {
  const textValue = internalOptionRef.value?.textContent?.toLowerCase().trim()
  if (textValue !== undefined)
    dataRef.value.textValue = textValue
})

onMounted(() => selectContext.registerOption(props.id, dataRef))
onUnmounted(() => selectContext.unregisterOption(props.id))

onMounted(() => {
  // go to option(selected) when box opens
  watch(
    [selectContext.selectboxState, selected],
    ([state, selected]) => {
      if (state !== SelectboxStates.Open)
        return
      if (!selected)
        return

      if (selectContext.mode.value === ValueMode.Single) {
        selectContext.goToOption(Focus.Specific, props.id)
      }
      else {
        if (isFirstSelected.value)
          selectContext.goToOption(Focus.Specific, props.id)
      }
    },
    {
      immediate: true,
    },
  )
})

// watchEffect(() => {
//   if (selectContext.selectboxState.value !== SelectboxStates.Open)
//     return
//   if (!active.value)
//     return
//   if(selectContext)
// })

function handleClick(event: MouseEvent) {
  if (props.disabled)
    return event.preventDefault
  selectContext?.select(props.value)
  if (selectContext?.mode.value === ValueMode.Single) {
    selectContext?.closeSelectbox()
    nextTick(() => selectContext.triggerRef.value?.focus({ preventScroll: true }))
  }
}

function handleEnter(event: MouseEvent) {
  if (props.disabled)
    return
  event.preventDefault()
  event.stopPropagation()
  selectContext?.goToOption(Focus.Specific, props.id)
}

function handleLeave() {
  if (props.disabled)
    return
  if (!active.value)
    return
  selectContext?.goToOption(Focus.Nothing)
}

function handleFocus() {
  if (props.disabled)
    return selectContext?.goToOption(Focus.Nothing)
  selectContext?.goToOption(Focus.Specific, props.id)
}

const state = computed(() => {
  return [
    selected.value ? 'selected' : '',
    active.value ? 'active' : '',
    props.disabled ? 'disabled' : '',
  ].filter(Boolean).join(' ') || undefined
})
</script>

<template>
  <Component
    :is="as"
    :id="id"
    ref="internalOptionRef"
    role="option"
    :tabindex="disabled ? undefined : -1"
    :aira-diabled="disabled ? true : undefined"
    :aira-selected="selected ? true : undefined"
    :data-state="state"
    @mouseenter="handleEnter"
    @mouseleave="handleLeave"
    @click="handleClick"
    @focus="handleFocus"
  >
    <slot
      :selected="selected"
      :active="active"
      :disabled="disabled"
    />
  </Component>
</template>
