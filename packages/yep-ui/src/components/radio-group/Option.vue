<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, toRaw, useSlots } from 'vue'
import { useId, useLabels } from '../../composables'
import { RadioGroupContextInjectionKey } from '../../tokens'
const props = defineProps({
  as: { type: [Object, String], default: 'div' },
  value: { type: [Object, String, Number, Boolean], default: undefined },
  disabled: { type: Boolean, default: false },
  id: { type: String, default: () => `yep-radio-group-${useId()}` },
  name: { type: String },
})

enum OptionState {
  Empty = 1 << 0,
  Active = 1 << 1,
}

const api = inject(RadioGroupContextInjectionKey, null)
if (!api)
  throw new Error('RadioGroup.Option must be used within a RadioGroup')
const labelledby = useLabels('RadioGroupLabel')
const optionRef = ref<HTMLElement | null>(null)
const propsRef = computed(() => ({ value: props.value, diabled: props.disabled }))
const state = ref(OptionState.Empty)

onMounted(() => api.registerOption({ id: props.id, element: optionRef, propsRef }))
onUnmounted(() => api.unregisterOption(props.id))

const isFirstOption = computed(() => api.firstOption.value?.id === props.id)
const disabled = computed(() => api.disabled.value || props.disabled)
const checked = computed(() => api.compare(toRaw(props.value), toRaw(api.value.value)))
const tabIndex = computed(() => {
  if (disabled.value)
    return -1
  if (checked.value)
    return 0
  if (!api.containsCheckedOption.value && isFirstOption.value)
    return 0
  return -1
})

function handleClick() {
  if (disabled.value)
    return

  if (!api?.change(props.value))
    return
  state.value |= OptionState.Active
  optionRef.value?.focus()
}

function handleFocus() {
  if (disabled.value)
    return

  state.value |= OptionState.Active
}

function handleBlur() {
  if (disabled.value)
    return

  state.value &= ~OptionState.Active
}
// bind props to first element in default slot
// const slots = useSlots()
// const slot = slots.default?.({ checked: checked.value, disabled: disabled.value, active: Boolean(state.value & OptionState.Active) })
// console.log(slot)

// console.log(slot)
</script>

<template>
  <component
    :is="as"
    :id="props.id"
    ref="optionRef"
    role="radio"
    :data-state="checked ? 'checked' : undefined"
    :aria-checked="checked"
    :aria-disabled="disabled ? true : undefined"
    :aria-labelledby="labelledby"
    :tabindex="tabIndex"
    @click="handleClick "
    @focus=" handleFocus "
    @blur="handleBlur "
  >
    <input v-if="name" type="hidden" :name="name" :value="value">
    <slot
      :checked="checked"
      :disabled="disabled"
      :active="Boolean(state & OptionState.Active)"
    >
      <input type="radio" :value="value" class="radio" :checked="checked">
      <span class="align-top ml-2">{{ value }}</span>
    </slot>
  </component>
</template>
