import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { Instance } from '@popperjs/core'
export enum PopperPlacement {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}
export enum PopperState {
  Hide,
  Show,
}
export enum TriggerType {
  Click = 'click',
  Hover = 'hover',
  Manual = 'manual',
}

export interface popperContext {
  popperState: ComputedRef<PopperState>
  popperInstance: Ref<Instance | null>
  triggerRef: Ref<HTMLElement | null>
  panelRef: Ref<HTMLElement | null>
  anchorRef: Ref<HTMLElement | null>
  triggerType: Ref<TriggerType>

  show(): void
  hide(): void
}

export const popperInjectionKey: InjectionKey<popperContext> = Symbol('dialog')
