<script setup lang="ts">
import type { Component } from 'vue'
import { computed, provide, ref } from 'vue'
import { createPopper } from '@popperjs/core'
import type { StrictModifiers } from '@popperjs/core'
import { PopperState, TriggerType, popperInjectionKey } from '../../tokens/popper'
import type { popperContext } from '../../tokens/popper'

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
  trigger: 'click',
})
const emit = defineEmits(['update:modelValue'])

const triggerRef = ref<popperContext['triggerRef']['value']>(null)
const panelRef = ref<popperContext['panelRef']['value']>(null)
const anchorRef = ref<popperContext['anchorRef']['value']>(null)
const popperState = ref<popperContext['popperState']['value']>(PopperState.Hide)
const finalAnchorRef = computed<popperContext['anchorRef']['value']>(() => {
  return anchorRef.value ?? triggerRef.value
})

const triggerType = computed<popperContext['triggerType']['value']>(() => {
  if (!props.trigger)
    return TriggerType.Manual
  return props.trigger === 'hover' ? TriggerType.Hover : TriggerType.Click
})

const popperInstance = computed<popperContext['popperInstance']['value']>(() => {
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
const api: popperContext = {
  // State
  popperState: computed(() => {
    if (props.modelValue !== null)
      return props.modelValue ? PopperState.Show : PopperState.Hide
    return popperState.value
  }),
  popperInstance,
  triggerRef,
  panelRef,
  anchorRef,
  triggerType,
  // Methods
  show() {
    popperState.value = PopperState.Show
    if (props.modelValue)
      emit('update:modelValue', true)

    if (!panelRef.value)
      return

    // make the panel visible
    panelRef.value.setAttribute('data-show', '')
    // enable the event listeners
    this.popperInstance.value?.setOptions(options => ({
      ...options,
      modifiers: [
        ...(options.modifiers || []),
        { name: 'eventListeners', enabled: true },
      ],
    }))
    // update the position
    this.popperInstance.value?.update()
  },
  hide() {
    popperState.value = PopperState.Hide
    if (props.modelValue)
      emit('update:modelValue', false)

    if (!panelRef.value)
      return

    // Hide the panel
    panelRef.value.removeAttribute('data-show')
    // enable the event listeners
    this.popperInstance.value?.setOptions(options => ({
      ...options,
      modifiers: [
        ...(options.modifiers || []),
        { name: 'eventListeners', enabled: false },
      ],
    }))
    this.popperInstance.value?.update()
  },

}
provide(popperInjectionKey, api)
</script>

<template>
  <div>
    <slot
      :open="api.popperState.value === PopperState.Show"
    />
  </div>
</template>
