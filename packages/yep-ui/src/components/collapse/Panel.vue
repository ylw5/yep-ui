<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted } from 'vue'
import { useId } from '../../composables'
import { CollapseContextInjectionKey, CollapseStates } from '../../tokens'
const props = defineProps({
  as: { type: [String, Object], default: 'div' },
  static: { type: Boolean, default: false },
  id: { type: String, default: () => `yep-collapse-panel-${useId()}` },
})
const collapseContext = inject(CollapseContextInjectionKey, null)
if (!collapseContext)
  throw new Error('CollapsePanel must be used inside CollapseRoot')
onMounted(() => {
  collapseContext.panelId.value = props.id
})
onUnmounted(() => {
  collapseContext.panelId.value = null
})

const visible = computed(() => {
  if (props.static)
    return true
  return collapseContext.collapseState.value === CollapseStates.Open
})
</script>

<template>
  <component
    :is="as"
    v-show="visible"
  >
    <slot
      :close="collapseContext.close"
      :open="collapseContext.collapseState.value === CollapseStates.Open"
    />
  </component>
</template>
