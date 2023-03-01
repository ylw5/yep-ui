export function attemptSubmit(element: HTMLElement) {
  const form = (element as any)?.form ?? element.closest('form')
  if (!form)
    return

  for (const element of form.elements) {
    if (
      (element.tagName === 'INPUT' && element.type === 'submit')
      || (element.tagName === 'BUTTON' && element.type === 'submit')
      || (element.nodeName === 'INPUT' && element.type === 'image')
    ) {
      // If you press `enter` in a normal input[type='text'] field, then the form will submit by
      // searching for the a submit element and "click" it. We could also use the
      // `form.requestSubmit()` function, but this has a downside where an `event.preventDefault()`
      // inside a `click` listener on the submit button won't stop the form from submitting.
      element.click()
      return
    }
  }
}
