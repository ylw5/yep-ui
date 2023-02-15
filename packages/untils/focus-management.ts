// Credit:
//  - https://stackoverflow.com/a/30753870
const focusableSelector = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
]
  .map(selector => `${selector}:not([tabindex='-1'])`,
  )
  .join(',')

export function isInFocusableElement(
  element: HTMLElement,
) {
  let parent: HTMLElement | null = element
  while (parent !== null) {
    if (parent.matches(focusableSelector))
      return true
    parent = parent.parentElement
  }
  return false
}
