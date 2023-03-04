<script setup lang="ts">
import { inject } from 'vue'
import { useId } from '../../composables'
import { SelectContextInjectionKey } from '../../tokens'
const props = defineProps({
  as: { type: [Object, String], default: 'label' },
  id: { type: String, default: () => `yep-ui-select-label-${useId()}` },
})

const selectContext = inject(SelectContextInjectionKey, null)
if (!selectContext)
  throw new Error('selectLabel must be used inside select')

function handleClick() {
  selectContext?.triggerRef.value?.focus()
}
</script>

<template>
  <component
    :is="as"
    :id="id"
    :ref="selectContext.labelRef"
    @click="handleClick"
  >
    <slot />
  </component>
</template>
