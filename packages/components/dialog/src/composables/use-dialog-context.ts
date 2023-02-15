import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'
import type { StateDefinition } from '../type'

const DialogContext = Symbol('DialogContext') as InjectionKey<StateDefinition>

export function provideDialogContext(context: StateDefinition) {
  provide(DialogContext, context)
}

export function useDialogContext(component: string) {
  const context = inject(DialogContext)
  if (!context) {
    const err = new Error(`<${component} /> is missing a parent <Dialog.Root /> component.`)
    throw err
  }
  return context
}
