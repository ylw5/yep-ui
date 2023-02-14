import type { ComputedRef, Ref } from 'vue'
import type { Instance } from '@popperjs/core'
export enum PopoverPlacement {
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',
}
export enum PopoverState {
  Hide,
  Show,
}
export enum TriggerType {
  Click = 'click',
  Hover = 'hover',
  Manual = 'manual',
}

export interface StateDefinition {
  popoverState: ComputedRef<PopoverState>
  popoverInstance: Ref<Instance | null>
  triggerRef: Ref<HTMLElement | null>
  panelRef: Ref<HTMLElement | null>
  anchorRef: Ref<HTMLElement | null>
  triggerType: Ref<TriggerType>

  show(): void
  hide(): void
}
