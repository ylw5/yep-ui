<script setup lang="ts">
import { ref } from 'vue'
const value = ref(true)
</script>

<template>
  <Switch.Group class="flex items-center">
    <Switch.Label class="mr-2 data-checked:text-primary">
      open
    </Switch.Label>
    <Switch.Root v-model="value" class="toggle" />
    <Switch.Label class="ml-2 text-primary data-checked:text-initial">
      close
    </Switch.Label>
  </Switch.Group>
</template>
