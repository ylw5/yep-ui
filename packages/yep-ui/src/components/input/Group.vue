<script setup lang="ts">
import { computed, provide, ref, shallowRef } from 'vue'
import { inputGroupInjectionKey } from '../../tokens'
import type { InputGroupContext } from '../../tokens'

const input = shallowRef<InputGroupContext['input']['value']>(null)
const inputGroupContext: InputGroupContext = {
  input,
  clear: () => {
    inputGroupContext.input.value
    && (inputGroupContext.input.value.text.value = '')
  },
}
provide(inputGroupInjectionKey, inputGroupContext)
const focus = ref(false)
const state = computed(() => {
  return focus.value ? 'focus' : undefined
})
</script>

<template>
  <div
    :data-state="state"
    @focusin="focus = true"
    @focusout="focus = false"
  >
    <slot :text="inputGroupContext.input.value?.text?.value || ''" />
  </div>
</template>
