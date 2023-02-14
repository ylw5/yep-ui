import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'
import type { GroupStateDefinition } from '../type'
const GroupContext = Symbol('GroupContext') as InjectionKey<GroupStateDefinition>

export function provideGroupContext(context: GroupStateDefinition) {
  provide(GroupContext, context)
}
export function useGroupContext(component: string) {
  const context = inject(GroupContext)
  // if (!context) {
  //   const err = new Error(`<${component} /> is missing a parent <Checkbox.Group /> component.`)
  //   throw err
  // }
  return context
}
