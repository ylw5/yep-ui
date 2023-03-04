<script setup lang="ts">
import { inject } from 'vue'
import { DialogStates, dialogInjectionKey } from '../../tokens'
const api = inject(dialogInjectionKey, null)
if (!api)
  throw new Error('dialogPanel without Root')
</script>

<template>
  <div
    v-if="api.dialogState.value === DialogStates.Open"
    :ref="api.panelRef"
    role="dialog"
    tabindex="-1"
  >
    <slot />
  </div>
</template>
