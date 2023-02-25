import type { InjectionKey, Ref } from 'vue'
export interface DialogContext {
  dialogState: Ref<boolean>
  panelRef: Ref<HTMLDialogElement | null>
  close: () => void
  open: () => void
}

export const dialogInjectionKey: InjectionKey<DialogContext> = Symbol('dialog')
