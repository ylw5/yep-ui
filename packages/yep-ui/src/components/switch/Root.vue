<script setup lang="ts">
import { computed, inject, onMounted, ref, watch } from 'vue'
import { useControllable } from '../../composables'
import { switchGroupContextInjectionKey } from '../../tokens'
const props = defineProps({
  as: {
    type: [Object, String],
    default: 'button',
  },
  modelValue: {
    type: Boolean,
    default: undefined,
  },
  value: {
    type: String,
  },
  defaultChecked: {
    type: Boolean,
  },
  name: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])
const api = inject(switchGroupContextInjectionKey, null)

const [checked, theireOnChange] = useControllable(
  computed(() => props.modelValue),
  (value: boolean) => emit('update:modelValue', value),
  computed(() => props.defaultChecked),
)

function toggle() {
  theireOnChange(!checked.value)
}

const internalSwitchRef = ref<HTMLButtonElement | null>(null)
const switchRef = api === null ? internalSwitchRef : api.switchRef

function handleClick(event: MouseEvent) {
  event.preventDefault()
  toggle()
}

function handleKeyUp(event: KeyboardEvent) {
  if (event.key === ' ' || event.key === 'Enter') {
    event.preventDefault()
    toggle()
  }
}

// This is needed so that we can "cancel" the click event when we use the `Enter` key on a button.
function handleKeyPress(event: KeyboardEvent) {
  event.preventDefault()
}

const form = computed(() => switchRef.value?.closest('form'))
onMounted(() => {
  watch(form, (form) => {
    if (!form)
      return
    if (props.defaultChecked === undefined)
      return

    function handleformReset() {
      theireOnChange(props.defaultChecked)
    }

    form?.addEventListener('reset', handleformReset)
    return () => {
      form?.removeEventListener('reset', handleformReset)
    }
  }, {
    immediate: true,
  })
})

onMounted(() => {
  // if (!api)
  //   return
  if (api) {
    api.state = checked
    api.toggle = toggle
  }
})
</script>

<template>
  <component
    :is="as"
    ref="switchRef"
    role="switch"
    tabindex="0"
    :type="$attrs.type"
    :data-state="checked ? 'checked' : undefined"
    :aria-checked="checked"
    @click="handleClick"
    @keyup="handleKeyUp"
    @keypress="handleKeyPress"
  >
    <input
      :name="name"
      :value="checked ? value || 'on' : undefined"
      :checked="checked"
      type="hidden"
      readonly
      hidden
    >
    <slot :checked="checked" />
  </component>
</template>
