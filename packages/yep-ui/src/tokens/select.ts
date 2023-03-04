import type { ComputedRef, InjectionKey, Ref } from 'vue'
import type { Focus } from '../utils/use-active-index'
export enum SelectboxStates {
  Open,
  Closed,
}

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

export interface SelectContext {
  // State
  selectboxState: Ref<SelectboxStates>
  disabled: ComputedRef<boolean>
  value: ComputedRef<unknown>

  mode: ComputedRef<ValueMode>
  compare: (a: unknown, b: unknown) => boolean

  labelRef: Ref<HTMLElement | null>
  triggerRef: Ref<HTMLElement | null>
  optionsRef: Ref<HTMLElement | null>

  options: Ref<{ id: string; dataRef: ComputedRef<SelectOptionData> }[]>
  activeOptionIndex: Ref<number | null>
  searchQuery: Ref<string>

  // State mutators
  closeSelectbox: () => void
  openSelectbox: () => void
  goToOption: (focus: Focus, id?: string) => void
  registerOption: (id: string, dataRef: ComputedRef<SelectOptionData>) => void
  unregisterOption: (id: string) => void
  select: (value: unknown) => void
  search: (value: string) => void
}

export const SelectContextInjectionKey: InjectionKey<SelectContext> = Symbol('SelectContext')
