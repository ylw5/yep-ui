<script setup lang="ts">
import { computed, onMounted, provide, ref, watch } from 'vue'
import type { DialogContext } from '../../tokens'
import { dialogInjectionKey } from '../../tokens'
import { isInFocusableElement } from '../../utils'
import { useOutsideClick } from '../../composables'
const props = withDefaults(defineProps<{
  modelValue?: boolean
  modal?: boolean
  static?: boolean
}>(), {
  modelValue: false,
  modal: false,
  static: false,
})
const emit = defineEmits<{
  (e: 'beforeClose'): void
  (e: 'beforeOpen'): void
  (e: 'update:modelValue', value: boolean): void
}>()
// const dialog = ref<HTMLDialogElement | null>(null)

const dialogState = ref<boolean>(false)
const panelRef = ref<HTMLDialogElement | null>(null)

const api: DialogContext = {
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

provide(dialogInjectionKey, api)

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
  computed(() => {
    if (props.static)
      return false
    else return api.dialogState.value
  }),
)
</script>

<template>
  <div
    :data-state="api.dialogState.value ? 'open' : 'close'"
  >
    <slot :close="api.close" :open="api.open" />
  </div>
</template>
