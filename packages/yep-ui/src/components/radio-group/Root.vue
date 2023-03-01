<script setup lang="ts">
import { computed, onMounted, provide, ref, shallowRef, toRaw, watch } from 'vue'
import { useControllable, useLabels } from '../../composables'
import { RadioGroupContextInjectionKey } from '../../tokens'
import type { RadioGroupContext } from '../../tokens'
import { Focus, FocusResult, attemptSubmit, focusIn, sortByDomNode } from '../../utils'
const props = defineProps({
  as: { type: [Object, String], default: 'div' },
  disabled: { type: Boolean, default: false },
  by: { type: [String, Function], default: () => defaultComparator },
  modelValue: { type: [Object, String, Number, Boolean], default: undefined },
  defaultValue: { type: [Object, String, Number, Boolean], default: undefined },
  name: { type: String },
})
const emit = defineEmits(['update:modelValue'])

const radioGroupRef = ref<HTMLElement | null>(null)
const options = shallowRef<RadioGroupContext['options']['value']>([])
const labelledby = useLabels('RadioGroupLabel')

const [value, theirOnchange] = useControllable(
  computed(() => props.modelValue),
  (value: unknown) => emit('update:modelValue', value),
  computed(() => props.defaultValue),
)

const api: RadioGroupContext = {
  options,
  value,
  disabled: computed(() => props.disabled),
  firstOption: computed(() =>
    options.value.find(option => !option.propsRef.value.diabled),
  ),
  containsCheckedOption: computed(() =>
    options.value.some(option =>
      api.compare(toRaw(option.propsRef.value.value), toRaw(props.modelValue)),
    ),
  ),
  compare(a: any, b: any) {
    if (typeof props.by === 'string') {
      const property = props.by
      return a?.[property] === b?.[property]
    }
    return props.by(a, b)
  },
  change(nextValue: unknown) {
    if (props.disabled)
      return false
    if (api.compare(toRaw(value.value), toRaw(nextValue)))
      return false
    const nextOption = options.value.find(option =>
      api.compare(toRaw(option.propsRef.value.value), toRaw(nextValue)),
    )?.propsRef
    if (nextOption?.value.diabled)
      return false
    theirOnchange(nextValue)
    return true
  },
  registerOption(option) {
    options.value.push(option)
    options.value = sortByDomNode(options.value, option => option.element.value)
  },
  unregisterOption(id) {
    const idx = options.value.findIndex(option => option.id === id)
    if (idx === -1)
      return
    options.value.splice(idx, 1)
  },
}

provide(RadioGroupContextInjectionKey, api)
// TODO: use tree walker

function handleKeyDown(event: KeyboardEvent) {
  if (!radioGroupRef.value)
    return
  if (!radioGroupRef.value.contains(event.target as HTMLElement))
    return

  const all = options.value
    .filter(option => !option.propsRef.value.diabled)
    .map(option => option.element.value) as HTMLElement[]

  switch (event.key) {
    case 'Enter':
      attemptSubmit(event.currentTarget as EventTarget & HTMLButtonElement)
      break
    case 'ArrowUp':
    case 'ArrowLeft':
      {
        event.preventDefault()
        event.stopPropagation()

        const result = focusIn(all, Focus.Previous | Focus.WrapAround)
        if (result === FocusResult.Success) {
          const activeOption = options.value.find(
            option => option.element.value === document.activeElement,
          )
          if (activeOption)
            api.change(activeOption.propsRef.value.value)
        }
      }
      break
    case 'ArrowDown':
    case 'ArrowRight':
      {
        event.preventDefault()
        event.stopPropagation()

        const result = focusIn(all, Focus.Next | Focus.WrapAround)

        if (result === FocusResult.Success) {
          const activeOption = options.value.find(
            option => option.element.value === document.activeElement,
          )
          if (activeOption)
            api.change(activeOption.propsRef.value.value)
        }
      }
      break
    case ' ':
    {
      event.preventDefault()
      event.stopPropagation()

      const activeOption = options.value.find(
        option => option.element.value === document.activeElement,
      )
      if (activeOption)
        api.change(activeOption.propsRef.value.value)
    }
  }
}
const form = computed(() => radioGroupRef.value?.closest('form'))
onMounted(() => {
  watch(form, (form) => {
    if (!form)
      return
    if (props.defaultValue === undefined)
      return
    function handleReset() {
      api.change(props.defaultValue)
    }
    form.addEventListener('reset', handleReset)
    return () => form.removeEventListener('reset', handleReset)
  }, {
    immediate: true,
  })
})

const hasInput = computed(() => {
  if (props.name === undefined || props.name === null)
    return false
  if (value.value === undefined || value.value === null)
    return false
  return true
})
</script>

<script lang="ts">
function defaultComparator<T>(a: T, b: T) {
  return a === b
}
</script>

<template>
  <component
    :is="as"
    ref="radioGroupRef"
    role="radiogroup"
    :labelledby="labelledby"
    @keydown="handleKeyDown"
  >
    <template v-if="hasInput">
      <input
        type="hidden"
        :name="name"
        hidden
        readonly
        :value="value"
      >
    </template>

    <slot />
  </component>
</template>
