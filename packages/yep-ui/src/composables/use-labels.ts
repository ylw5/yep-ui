import type { InjectionKey } from 'vue'
import { computed, inject, provide, ref } from 'vue'
const LabelContext = Symbol('LabelContext') as InjectionKey<{
  register: (value: string) => () => void
  name: string
}>

export function useLabelContext() {
  const context = inject(LabelContext, null)
  if (context === null) {
    const err = new Error('<Label /> component is not inside a parent')
    if (Error.captureStackTrace)
      Error.captureStackTrace(err, useLabelContext)
    throw err
  }

  return context
}

export function useLabels(name = 'Label') {
  const labelIds = ref<String[]>([])

  function register(value: String) {
    labelIds.value.push(value)

    return () => {
      const idx = labelIds.value.indexOf(value)
      if (idx === -1)
        return
      labelIds.value.splice(idx, 1)
    }
  }

  provide(LabelContext, { register, name })

  return computed(() => (labelIds.value.length ? labelIds.value.join(' ') : undefined))
}
