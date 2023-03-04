<script setup lang="ts">
import { provide, ref } from 'vue'
import type { CollapseContext } from '../../tokens'
import { CollapseContextInjectionKey, CollapseStates } from '../../tokens'
const props = defineProps({
  as: { type: [String, Object], default: 'div' },
  defaultOpen: { type: Boolean, default: false },
})

const collapseState = ref<CollapseContext['collapseState']['value']>(
  props.defaultOpen ? CollapseStates.Open : CollapseStates.Closed,
)
const panelRef = ref<CollapseContext['panel']['value']>(null)
const triggerRef = ref<CollapseContext['trigger']['value']>(null)

const collapseContext: CollapseContext = {
  collapseState,
  panel: panelRef,
  panelId: ref(null),
  trigger: triggerRef,
  triggerId: ref(null),
  toggleCollapse() {
    collapseState.value
      = collapseState.value === CollapseStates.Open
        ? CollapseStates.Closed
        : CollapseStates.Open
  },
  closeCollapse() {
    if (collapseState.value === CollapseStates.Open)
      collapseState.value = CollapseStates.Closed
  },
  close(focusableElement) {
    collapseContext.closeCollapse()
    const restoreElement = (() => {
      if (!focusableElement)
        return collapseContext.trigger.value
      if (focusableElement instanceof HTMLElement)
        return focusableElement
      if (focusableElement.value instanceof HTMLElement)
        return focusableElement.value
    })()

    if (restoreElement)
      restoreElement.focus()
  },
}

provide(CollapseContextInjectionKey, collapseContext)
</script>

<template>
  <component :is="as">
    <slot
      :close="collapseContext.close"
      :open="collapseState === CollapseStates.Open"
    />
  </component>
</template>
