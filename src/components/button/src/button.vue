<script setup lang="ts">
import { computed } from 'vue'
// import { ElButton } from 'element-plus'
import { buttonProps } from './button'

const props = defineProps(buttonProps)

const isDisabled = computed(() => props.disabled || props.loading)
const isRound = computed(() => props.shape === 'round' ? 'rounded-full' : '')
const nativeType = computed(() => props.nativeType || 'button')
const btnshape = computed(() => props.shape === 'circle' ? 'rounded-1/2' : 'rounded-full')
const classObject = computed(() => {
  return {
    'rounded-full': props.shape === 'round',
    'rounded-1/2': props.shape === 'circle',
  }
})
</script>

<template>
  {{ nativeType }}
  <button
    :type="nativeType"
    :disabled="isDisabled"

    :class="[

      btnshape,

    ]"
    class="border-solid border-red"
  >
    <template v-if="loading">
      loading
    </template>
    <span><slot /></span>
  </button>
  <!-- <ElButton>fdsf</ElButton> -->
</template>
