<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useOutsideClick } from '../../../../hooks/use-outside-click'
import { isInFocusableElement } from '../../../../untils/focus-management'
const props = withDefaults(defineProps<{
  modelValue: boolean
  modal?: boolean
}>(), {
  modelValue: false,
  modal: false,
})
const emit = defineEmits<{
  (e: 'beforeClose'): void
  (e: 'update:modelValue', value: boolean): void
}>()
const dialog = ref<HTMLDialogElement | null>(null)

function closeDialog() {
  emit('update:modelValue', false)
  // TODO:give user control of close
  emit('beforeClose')
  dialog.value?.close()
}

function showDialog() {
  emit('update:modelValue', true)
  props.modal ? dialog.value?.showModal() : dialog.value?.show()
}

onMounted(() => {
  watch(
    () => props.modelValue,
    (open) => {
      if (dialog.value?.open === open)
        return

      if (!open)
        closeDialog()
      else
        showDialog()
    }, {
      immediate: true,
    },
  )
})
// FIXME: nested dialog will cause error: all close
useOutsideClick(
  [dialog],
  (event, target) => {
    if (isInFocusableElement(target))
      return

    closeDialog()
  },
  computed(() => props.modelValue),
)

function handleKeydown(event: KeyboardEvent) {
  event.preventDefault()
  event.stopPropagation()

  if (event.key === 'Escape')
    closeDialog()
}
</script>

<template>
  <dialog
    ref="dialog"
    @keydown="handleKeydown"
  >
    <slot />
  </dialog>
</template>
