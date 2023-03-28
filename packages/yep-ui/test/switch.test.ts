import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { shallowMount } from '@vue/test-utils'
import { Switch } from '../src/components/switch'

describe('Test Switch', () => {
  it('switch model value', async () => {
    expect(Switch.Root).toBeTruthy()
    const modelValue = ref(false)
    const wrapper = shallowMount(Switch.Root, {
      props: {
        'modelValue': modelValue.value,
        'onUpdate:modelValue': (value: boolean) => {
          modelValue.value = value
        },
      },
    })
    await wrapper.trigger('click')
    expect(modelValue.value).toBe(true)
  })
})
