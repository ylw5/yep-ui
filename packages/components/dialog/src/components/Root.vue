<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useOutsideClick } from '../../../../hooks/use-outside-click'
import { isInFocusableElement } from '../../../../untils/focus-management'
import type { StateDefinition } from '../type'
import { provideDialogContext } from '../composables/use-dialog-context'
const props = withDefaults(defineProps<{
  modelValue: boolean
  modal?: boolean
}>(), {
  modelValue: false,
  modal: false,
})
const emit = defineEmits<{
  (e: 'beforeClose'): void
  (e: 'beforeOpen'): void
  (e: 'update:modelValue', value: boolean): void
}>()
// const dialog = ref<HTMLDialogElement | null>(null)

const dialogState = ref<boolean>(false)
const panelRef = ref<HTMLDialogElement | null>(null)

const api: StateDefinition = {
  dialogState: computed(() => dialogState.value || props.modelValue),
  panelRef,
  close: () => {
    dialogState.value = false
    emit('update:modelValue', false)
    emit('beforeClose')
  },
  open: () => {
    emit('update:modelValue', true)
    emit('beforeOpen')
    dialogState.value = true
  },
}

provideDialogContext(api)

onMounted(() => {
  watch(() => api.dialogState.value, (open) => {
    open ? panelOpen() : panelClose()
  }, {
    immediate: true,
  })
})

function panelOpen() {
  props.modal ? panelRef.value?.showModal() : panelRef.value?.show()
  // document.body.style.overflow = 'hidden'
}
function panelClose() {
  panelRef.value?.close()
  // document.body.style.overflow = 'auto'
}

// FIXME: nested dialog will cause error: all close
useOutsideClick(
  [panelRef],
  (event, target) => {
    if (isInFocusableElement(target))
      return

    api.close()
  },
  computed(() => props.modelValue),
)
</script>

<template>
  <div
    :data-state="api.dialogState.value ? 'open' : undefined"
  >
    {{ dialogState }}
    <slot />
  </div>
</template>
