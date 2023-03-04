import type { Ref } from 'vue'
import { ref, watchEffect } from 'vue'

function resolveType(type: unknown, as: string | object) {
  if (type)
    return type

  const tag = as ?? 'button'
  if (typeof tag === 'string' && tag.toLowerCase() === 'button')
    return 'button'

  return undefined
}

export function useResolveButtonType(
  data: Ref<{ as: string | object; type?: unknown }>,
  refElement: Ref<HTMLElement | null>,
) {
  const type = ref(resolveType(data.value.type, data.value.as))

  watchEffect(() => {
    if (type.value)
      return
    if (!refElement.value)
      return

    if (refElement.value instanceof HTMLButtonElement && !refElement.value?.hasAttribute('type'))
      type.value = 'button'
  })

  return type
}
