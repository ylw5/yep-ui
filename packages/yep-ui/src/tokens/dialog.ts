import type { InjectionKey, Ref } from 'vue'
export enum DialogStates {
  Open,
  Closed,
}
export interface DialogContext {
  dialogState: Ref<DialogStates>
  // titleId: Ref<String | null>
  panelRef: Ref<HTMLDivElement | null>
  triggerRef: Ref<HTMLElement | null>
  close: () => void
  open: () => void
}

export const dialogInjectionKey: InjectionKey<DialogContext> = Symbol('dialog')
