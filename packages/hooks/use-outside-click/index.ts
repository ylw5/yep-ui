import type { ComputedRef, Ref } from 'vue'
type Container = Ref<HTMLElement | null>
type ContainerInput = Container[]
export function useOutsideClick(
  containers: ContainerInput,
  cb: (e: MouseEvent, target: HTMLElement) => void,
  enabled: ComputedRef<boolean>,
) {
  document.addEventListener('click', (e: MouseEvent) => {
    if (!enabled.value)
      return
    const target = e.target

    if (!target)
      return
    // FIXME: order close nest dialog
    for (const container of containers) {
      // dialog on the top-layer, so we need to check if the click is in the dialog
      if (container.value?.tagName === 'DIALOG') {
        const rect = container.value.getBoundingClientRect()
        const isInDialog
          = rect.top <= e.clientY
          && e.clientY <= rect.top + rect.height
          && rect.left <= e.clientX
          && e.clientX <= rect.left + rect.width

        if (isInDialog)
          return
      }
      else {
        if (container.value?.contains(target as Node))
          return
      }
    }

    cb(e, target as HTMLElement)
  })
}
