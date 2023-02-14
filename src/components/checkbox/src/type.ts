import type { Ref } from 'vue'
interface indicatorData {
  id: string
  domRef: Ref<HTMLElement | null>
  disabled?: boolean
}
export interface GroupStateDefinition {
  // State
  values: Ref<string[]>
  /*
    TODO:set the range of the number of selected items
    min:number
    max:number
  */
  // Methods
  select(state: boolean, value: string): void
}
export interface StateDefinition {
  // State
  value?: string
  disabled: boolean
  checkboxState: Ref<boolean>
  indicator: Ref<indicatorData | null>

  // Methods
  select: (value: boolean) => void
}
