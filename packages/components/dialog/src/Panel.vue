<script setup lang="ts">
import { inject } from 'vue'
import { dialogInjectionKey } from '@yep-ui/tokens'
const api = inject(dialogInjectionKey, null)
if (!api)
  throw new Error('dialogPanel without Root')
</script>

<template>
  <dialog :ref="api.panelRef">
    <slot />
  </dialog>
</template>
