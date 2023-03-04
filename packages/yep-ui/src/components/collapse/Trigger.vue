<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, useAttrs } from 'vue'
import { useId, useResolveButtonType } from '../../composables'
import { CollapseContextInjectionKey, CollapseStates } from '../../tokens'
const props = defineProps({
  as: { type: [String, Object], default: 'button' },
  diabled: { type: Boolean, default: false },
  id: { type: String, default: () => `yep-collapse-trigger-${useId()}` },
})
const collapseContext = inject(CollapseContextInjectionKey, null)
if (!collapseContext)
  throw new Error('CollapseTrigger must be used inside CollapseRoot')

const internalTriggerRef = ref<HTMLElement | null>(null)
onMounted(() => {
  collapseContext.trigger.value = internalTriggerRef.value
  collapseContext.triggerId.value = props.id
})
onUnmounted(() => {
  collapseContext.triggerId.value = null
})

const type = useResolveButtonType(
  computed(() => ({ as: props.as, attrs: useAttrs().type })),
  internalTriggerRef,
)

function hanleClick() {
  if (props.diabled)
    return
  collapseContext?.toggleCollapse()
}
function handleKeyDown(event: KeyboardEvent) {
  if (props.diabled)
    return
  if (event.key === 'Enter' || event.key === ' ') {
    collapseContext?.toggleCollapse()
    event.preventDefault()
    event.stopPropagation()
  }
}
</script>

<template>
  <component
    :is="as"
    ref="internalTriggerRef"
    :disabled="diabled"
    :type="type"
    :aria-expanded="props.diabled ? undefined : collapseContext.collapseState.value === CollapseStates.Open"
    :aria-controls="collapseContext.panel.value ? collapseContext.panelId.value : undefined"
    :data-state="collapseContext.collapseState.value === CollapseStates.Open ? 'open' : 'closed'"
    @click="hanleClick"
    @keydown="handleKeyDown"
  >
    <slot :open="collapseContext.collapseState.value === CollapseStates.Open" />
  </component>
</template>
