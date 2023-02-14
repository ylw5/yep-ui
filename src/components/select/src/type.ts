import type { ComputedRef, Ref } from 'vue'
export enum ValueMode {
  Single,
  Multi,
}
export interface SelectOptionData {
  textValue: string
  disabled: boolean
  value: unknown
  domRef: Ref<HTMLElement | null>
}
export interface StateDefinition {
  // State
  mode: ComputedRef<ValueMode>
  isOptionsOpen: Ref<boolean>
  disabled: ComputedRef<boolean>
  value: ComputedRef<unknown>
  triggerRef: Ref<HTMLElement | null>
  optionsRef: Ref<HTMLElement | null>
  options: Ref<{ id: number; dataRef: ComputedRef<SelectOptionData> }[]>
  activeOptionIndex: Ref<number | null>
  searchQuery: Ref<string>

  // State mutators
  registerOption: (index: number, dataRef: ComputedRef<SelectOptionData>) => void
  unregisterOption: (index: number) => void
  closeOptions: () => void
  openOptions: () => void
  selectOption: (id: number) => void
}
