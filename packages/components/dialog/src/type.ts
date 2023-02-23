import type { Ref } from 'vue'

export interface StateDefinition {
  dialogState: Ref<boolean>
  panelRef: Ref<HTMLDialogElement | null>
  close: () => void
  open: () => void
}
