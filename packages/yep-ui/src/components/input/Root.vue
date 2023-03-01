<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue'
import type { InputContext } from '../../tokens'
import { inputGroupInjectionKey } from '../../tokens'
const props = defineProps({
  modelValue: {
    type: String,
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  formatter: {
    type: Function,
    default: (value: string) => value,
  },
  parser: {
    type: Function,
    default: (value: string) => value,
  },
})
const emits = defineEmits(['update:modelValue'])
const input = ref<HTMLInputElement | null>(null)
const text = ref(ParseAndFormatText(props.modelValue || ''))
const inputData: InputContext = {
  text,
  domRef: input,
}

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement
  const formattedText = ParseAndFormatText(target.value)
  // make input value and text.value sync
  if (formattedText === text.value)
    target.value = formattedText

  else text.value = formattedText
}

function ParseAndFormatText(text: string) {
  const parsedText = props.parser(text)
  const formattedText = props.formatter(parsedText)

  return formattedText
}

watch(text, (value) => {
  emits('update:modelValue', value)
})

const inputGroupContext = inject(inputGroupInjectionKey, null)

onMounted(() => {
  inputGroupContext
  && (inputGroupContext.input.value = inputData)
})
</script>

<template>
  <input
    ref="input"
    :type="type"
    :value="text"
    @input="handleInput"
  >
</template>
