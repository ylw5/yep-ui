import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { StateDefinition } from '../type'

const CheckboxContext = Symbol('CheckboxContext') as InjectionKey<StateDefinition>
export function provideCheckboxContext(context: StateDefinition) {
  provide(CheckboxContext, context)
}
export function useCheckboxContext(component: string) {
  const context = inject(CheckboxContext)
  // if (!context) {
  //   const err = new Error(`<${component} /> is missing a parent <Checkbox.Root /> component.`)
  //   throw err
  // }
  return context
}
