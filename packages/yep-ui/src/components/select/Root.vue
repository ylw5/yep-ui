<script setup lang="ts">
import { computed, onMounted, provide, ref, shallowRef, toRaw, watch } from 'vue'
import { useControllable, useOutsideClick } from '../../composables'
import { Focus, calculateActiveIndex } from '../../utils/use-active-index'
import { isInFocusableElement, sortByDomNode } from '../../utils'
import { SelectContextInjectionKey, SelectboxStates, ValueMode } from '../../tokens'
import type { SelectContext, SelectOptionData } from '../../tokens'

const props = defineProps({
  as: { type: [Object, String], default: 'div' },
  disabled: { type: Boolean, default: false },
  modelValue: { type: [String, Number, Object, Boolean], default: undefined },
  defaultValue: { type: [String, Number, Object, Boolean], default: undefined },
  multiple: { type: Boolean, default: false },
  name: { type: String, default: undefined },
  by: { type: [String, Function], default: () => defaultComparator },
})

const emit = defineEmits(['update:modelValue'])
const selectboxState = ref<SelectContext['selectboxState']['value']>(SelectboxStates.Closed)
const labelRef = ref<SelectContext['labelRef']['value']>(null)
const triggerRef = ref<SelectContext['triggerRef']['value']>(null)
const optionsRef = ref<SelectContext['optionsRef']['value']>(null)
const options = shallowRef<SelectContext['options']['value']>([])
const activeOptionIndex = ref<SelectContext['activeOptionIndex']['value']>(null)
const searchQuery = ref<SelectContext['searchQuery']['value']>('')

const mode = computed(() => props.multiple ? ValueMode.Multi : ValueMode.Single)
const [value, theirOnChange] = useControllable(
  computed(() => props.modelValue === undefined
    ? mode.value === ValueMode.Multi
      ? []
      : undefined
    : props.modelValue,
  ),
  (value: unknown) => emit('update:modelValue', value),
  computed(() => props.defaultValue),
)

const selectContext: SelectContext = {
  selectboxState,
  value,
  labelRef,
  triggerRef,
  optionsRef,
  options,
  mode,
  compare(a: any, b: any) {
    if (typeof props.by === 'string') {
      const key = props.by
      return a?.[key] === b?.[key]
    }
    return props.by(a, b)
  },
  disabled: computed(() => props.disabled),
  activeOptionIndex,
  searchQuery,

  closeSelectbox() {
    if (props.disabled)
      return
    if (selectboxState.value === SelectboxStates.Closed)
      return
    selectboxState.value = SelectboxStates.Closed
    activeOptionIndex.value = null
  },
  openSelectbox() {
    if (props.disabled)
      return
    if (selectboxState.value === SelectboxStates.Open)
      return
    selectboxState.value = SelectboxStates.Open
  },
  goToOption(focus: Focus, id?: string) {
    if (props.disabled)
      return
    if (selectboxState.value === SelectboxStates.Closed)
      return
    const adjustedState = adjustOrderedOptions()
    const nextActiveOptionIndex = calculateActiveIndex(
      focus === Focus.Specific
        ? { focus: Focus.Specific, id: id! }
        : { focus: focus as Exclude<Focus, Focus.Specific> },
      {
        resolveItems: () => adjustedState.options,
        resolveActiveIndex: () => adjustedState.activeOptionIndex,
        resolveId: option => option.id,
        resolveDisabled: option => option.dataRef.value.disabled,
      },
    )

    searchQuery.value = ''
    activeOptionIndex.value = nextActiveOptionIndex
    options.value = adjustedState.options
  },

  registerOption: (id, dataRef) => {
    const adjustedState = adjustOrderedOptions((options) => {
      return [...options, { id, dataRef }]
    })
    options.value = adjustedState.options
    activeOptionIndex.value = adjustedState.activeOptionIndex
  },
  unregisterOption: (id: String) => {
    const adjustedState = adjustOrderedOptions((options) => {
      const idx = options.findIndex(o => o.id === id)
      if (idx !== -1)
        options.splice(idx, 1)
      return options
    })
    options.value = adjustedState.options
    activeOptionIndex.value = adjustedState.activeOptionIndex
  },
  select: (value) => {
    if (props.disabled)
      return

    const res = (() => {
      if (mode.value === ValueMode.Multi) {
        const copy = toRaw(selectContext.value.value as unknown[]).slice()
        const raw = toRaw(value)

        const idx = copy.findIndex(v => selectContext.compare(v, raw))
        if (idx === -1)
          copy.push(raw)
        else
          copy.splice(idx, 1)

        return copy
      }
      else if (mode.value === ValueMode.Single) {
        return value
      }
    })()

    theirOnChange(res)
  },
  search(value) {
    if (props.disabled)
      return
    if (selectboxState.value === SelectboxStates.Closed)
      return
    const wasAlreadySearch = searchQuery.value.length > 0
    searchQuery.value += value.toLowerCase()
    // TODO: search in options
  },
}

// handle outside click
useOutsideClick(
  [triggerRef, optionsRef],
  (event, target) => {
    selectContext.closeSelectbox()
    // if (isInFocusableElement(target)) {
    //   event.preventDefault()
    //   triggerRef.value?.focus()
    // }
  },
  computed(() => selectContext.selectboxState.value === SelectboxStates.Open),
)

provide(SelectContextInjectionKey, selectContext)

const form = computed(() => triggerRef.value?.closest('form'))
onMounted(() => {
  watch(form, (form) => {
    if (!form)
      return
    if (props.defaultValue)
      return

    function handleReset() {
      selectContext.select(props.defaultValue)
    }
    form.addEventListener('reset', handleReset)
    return () => {
      form.removeEventListener('reset', handleReset)
    }
  }, {
    immediate: true,
  })
})

function adjustOrderedOptions(
  adjustment: (options: SelectContext['options']['value']) => SelectContext['options']['value'] = o => o,
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
</script>

<script lang="ts">
function defaultComparator<T>(a: T, b: T) {
  return a === b
}
</script>

<template>
  <component
    :is="as"
    :tabindex="disabled ? undefined : -1"
  >
    <!-- eslint-disable-next-line vue/require-v-for-key -->
    <input
      type="hidden"
      :name="name" readonly :value="selectContext.value.value"
    >
    <slot
      :open="selectContext.selectboxState.value === SelectboxStates.Open"
      :disabled="disabled"
      :value="value"
    />
  </component>
</template>
