<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useDialogContext } from '../composables/use-dialog-context'
const api = useDialogContext('panel')
</script>

<template>
  <dialog :ref="api.panelRef">
    <slot />
  </dialog>
</template>
