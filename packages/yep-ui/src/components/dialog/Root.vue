<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, inject, onMounted, provide, ref, watch } from 'vue'
import type { DialogContext } from '../../tokens'
import { DialogStates, dialogInjectionKey } from '../../tokens'
import { isInFocusableElement } from '../../utils'
import { useControllable, useOutsideClick } from '../../composables'
const props = defineProps({
  as: { type: [String, Object], default: 'div' },
  static: { type: Boolean, default: false },
  open: { type: Boolean, default: undefined },
  initialFocus: { type: Object as PropType<HTMLElement | null>, default: null },
})
const emit = defineEmits(['open', 'close'])
const ready = ref(false)
onMounted(() => ready.value = true)

// const nestedDialogCount = ref(0)

const [open, theirOnchange] = useControllable(
  computed(() => props.open),
  (value: boolean) => emit(value ? 'open' : 'close', value),
  computed(() => false),
)

const internalDialogRef = ref<HTMLDivElement | null>(null)
const ownerDocument = computed(() => internalDialogRef.value?.ownerDocument)

const dialogState = computed(() =>
  !ready.value ? DialogStates.Closed : open.value ? DialogStates.Open : DialogStates.Closed,
)
const enable = computed(() => dialogState.value === DialogStates.Open)

// const hasNestedDialog = computed(() => nestedDialogCount.value > 1)
// const hasParentDialog = computed(() => inject(dialogInjectionKey, null) !== null)
// // care dialog is on top or not if there are multiple dialogs
// const position = computed(() => (!hasParentDialog.value ? 'leaf' : 'parent'))

const dialogContext: DialogContext = {
  panelRef: ref(null),
  triggerRef: ref(null),
  dialogState,
  close() {
    theirOnchange(false)
  },
  open() {
    theirOnchange(true)
  },
}
provide(dialogInjectionKey, dialogContext)

// const outsideClickEnable = computed(() => {
//   if (!enable.value)
//     return false
//   if (hasNestedDialog.value)
//     return false
//   return true
// })

// useOutsideClick(
//   [internalDialogRef],
//   (e, target) => {
//     if (isInFocusableElement(target))
//       return
//     dialogContext.close()
//   },
//   outsideClickEnable,
// )
</script>

<template>
  <component
    :is="as"
  >
    <slot />
  </component>
</template>
