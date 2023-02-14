import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'
import type { StateDefinition } from '../type'
const PopoverContext = Symbol('PopoverContext') as InjectionKey<StateDefinition>

export function providePopperContext(context: StateDefinition) {
  provide(PopoverContext, context)
}

export function usePopperContext(component: string) {
  const context = inject(PopoverContext)
  if (!context)
    throw new Error('usePopoverContext must be used within a PopoverProvider')

  return context
}
