<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import { createPopper } from '@popperjs/core'
import type { StrictModifiers } from '@popperjs/core'
import { providePopperContext } from '../composables/use-popper-context'
import { PopoverState, TriggerType } from '../type'
import type { StateDefinition } from '../type'
const props = withDefaults(defineProps<{
  as?: string | Component
  trigger?: 'click' | 'hover'
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: [number, number]
  modelValue?: boolean | null
}>(), {
  as: 'div',
  modelValue: null,
  placement: 'bottom',
  offset: () => [0, 8],
})
const emit = defineEmits(['update:modelValue'])

const triggerRef = ref<StateDefinition['triggerRef']['value']>(null)
const panelRef = ref<StateDefinition['panelRef']['value']>(null)
const anchorRef = ref<StateDefinition['anchorRef']['value']>(null)
const popoverState = ref<StateDefinition['popoverState']['value']>(PopoverState.Hide)
const finalAnchorRef = computed<StateDefinition['anchorRef']['value']>(() => {
  return anchorRef.value ?? triggerRef.value
})

const triggerType = computed<StateDefinition['triggerType']['value']>(() => {
  if (!props.trigger)
    return TriggerType.Manual
  return props.trigger === 'hover' ? TriggerType.Hover : TriggerType.Click
})

const popoverInstance = computed<StateDefinition['popoverInstance']['value']>(() => {
  if (!finalAnchorRef.value || !panelRef.value)
    return null

  return createPopper<StrictModifiers>(
    finalAnchorRef.value,
    panelRef.value,
    {
      strategy: 'fixed',
      placement: props.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: props.offset,
          },
        },
        {
          name: 'arrow',
          options: {
            padding: 5,
          },
        },
      ],
    },
  )
})
const api: StateDefinition = {
  // State
  popoverState: computed(() => {
    if (props.modelValue !== null)
      return props.modelValue ? PopoverState.Show : PopoverState.Hide
    return popoverState.value
  }),
  popoverInstance,
  triggerRef,
  panelRef,
  anchorRef,
  triggerType,
  // Methods
  show() {
    popoverState.value = PopoverState.Show
    if (props.modelValue)
      emit('update:modelValue', true)

    if (!panelRef.value)
      return

    // make the panel visible
    panelRef.value.setAttribute('data-show', '')
    // enable the event listeners
    this.popoverInstance.value?.setOptions(options => ({
      ...options,
      modifiers: [
        ...(options.modifiers || []),
        { name: 'eventListeners', enabled: true },
      ],
    }))
    // update the position
    this.popoverInstance.value?.update()
  },
  hide() {
    popoverState.value = PopoverState.Hide
    if (props.modelValue)
      emit('update:modelValue', false)

    if (!panelRef.value)
      return

    // Hide the panel
    panelRef.value.removeAttribute('data-show')
    // enable the event listeners
    this.popoverInstance.value?.setOptions(options => ({
      ...options,
      modifiers: [
        ...(options.modifiers || []),
        { name: 'eventListeners', enabled: false },
      ],
    }))
    this.popoverInstance.value?.update()
  },

}
providePopperContext(api)
</script>

<template>
  <div>
    <slot
      :open="api.popoverState.value === PopoverState.Show"
    />
  </div>
</template>
