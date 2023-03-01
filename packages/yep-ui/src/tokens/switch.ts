import type { ComputedRef, InjectionKey, Ref } from 'vue'
export interface SwitchGroupContext {
  // State
  switchRef: Ref<HTMLButtonElement | null>
  state: null | ComputedRef<boolean | undefined>
  toggle: null | (() => void)
}

export const switchGroupContextInjectionKey: InjectionKey<SwitchGroupContext> = Symbol('switch')
