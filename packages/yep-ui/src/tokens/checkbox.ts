import type { InjectionKey, Ref } from 'vue'
interface indicatorData {
  id?: string
  domRef: Ref<HTMLElement | null>
  disabled?: boolean
}
export interface CheckboxGroupContext {
  // State
  values: Ref<string[]>
  selectCount: Ref<number>
  max?: number
  min?: number
  // Methods
  select(state: boolean, value: string): void
}

export interface CheckboxContext {
  // State
  value: Ref<string | null>
  disabled: Ref<boolean>
  checkboxState: Ref<boolean>
  indicator: Ref<indicatorData | null>

  // Methods
  select: (value: boolean) => void
}

export const checkboxInjectionKey: InjectionKey<CheckboxContext> = Symbol('checkbox')
export const checkboxGroupInjectionKey: InjectionKey<CheckboxGroupContext> = Symbol('checkboxGroup')
