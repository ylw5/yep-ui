import type { DirectiveBinding } from 'vue'
interface ToolTipOtion {
  text: string
  position: 'top' | 'bottom' | 'left' | 'right'
}
// binding.value is ToolTipOtion
export function TooltipDirection(el: HTMLLIElement, binding: DirectiveBinding) {
  el.setAttribute('data-tooltip-text', binding.value.text)
  el.classList.add('with-tooltip')
  const position = binding.value.position || 'top'
  el.setAttribute('data-tooltip-position', position)
}
