import type { InjectionKey, Ref } from 'vue'
export interface Option {
  id: string
  element: Ref<HTMLElement | null>
  propsRef: Ref<{ value: unknown;diabled: boolean }>
}
export interface RadioGroupContext {
  // State
  options: Ref<Option[]>
  value: Ref<unknown>
  disabled: Ref<boolean>
  firstOption: Ref<Option | undefined>
  containsCheckedOption: Ref<boolean>

  compare(a: unknown, b: unknown): boolean

  // State mutators
  change(nextValue: unknown): boolean
  registerOption(option: Option): void
  unregisterOption(id: Option['id']): void
}

export const RadioGroupContextInjectionKey: InjectionKey<RadioGroupContext> = Symbol('radioGroup')
