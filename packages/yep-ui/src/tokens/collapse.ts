import type { InjectionKey, Ref } from 'vue'
export enum CollapseStates {
  Open,
  Closed,
}
export interface CollapseContext {
  // State
  collapseState: Ref<CollapseStates>
  panel: Ref<HTMLElement | null>
  panelId: Ref<string | null>
  trigger: Ref<HTMLElement | null>
  triggerId: Ref<string | null>

  // State mutators
  toggleCollapse: () => void
  closeCollapse: () => void

  // Expose functions
  // focusableElement is the element that will be focused after the collapse close
  close: (focusableElement: HTMLElement | Ref<HTMLElement | null>) => void
}

export const CollapseContextInjectionKey: InjectionKey<CollapseContext> = Symbol('CollapseContext')
