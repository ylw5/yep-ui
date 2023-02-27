import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { StateDefinition } from '../type'
export const SelectboxContext = Symbol('SelectboxContext') as InjectionKey<StateDefinition>

export function provideSelectContext(context: StateDefinition) {
  provide(SelectboxContext, context)
}

export function useSelectContext(component: string) {
  const context = inject<StateDefinition>(SelectboxContext)

  if (!context)
    throw new Error(`${component} is missing a parent <Select.Root /> component.`)
  return context
}
