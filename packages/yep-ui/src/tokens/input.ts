import type { InjectionKey, Ref } from 'vue'
export interface InputContext {
  text: Ref<string>
  domRef: Ref<HTMLInputElement | null>
}
export interface InputGroupContext {
  input: Ref<InputContext | null>
  // methods
  clear: () => void
}

export const inputGroupInjectionKey: InjectionKey<InputGroupContext> = Symbol('inputGroup')
