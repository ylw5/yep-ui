import type { Ref } from 'vue'

export enum DialogState {
  Open,
  Close,
}
export interface StateDefinition {
  dialogState: Ref<DialogState>
  panelRef: Ref<HTMLElement | null>
  close: () => void
}
