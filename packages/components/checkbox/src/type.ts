import type { Ref } from 'vue'
interface indicatorData {
  id?: string
  domRef: Ref<HTMLElement | null>
  disabled?: boolean
}
export interface GroupStateDefinition {
  // State
  values: Ref<string[]>
  selectCount: Ref<number>
  max?: number
  min?: number
  // Methods
  select(state: boolean, value: string): void
}

export interface StateDefinition {
  // State
  value: Ref<string | null>
  disabled: Ref<boolean>
  checkboxState: Ref<boolean>
  indicator: Ref<indicatorData | null>

  // Methods
  select: (value: boolean) => void
}
