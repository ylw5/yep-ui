<script setup lang="ts">
const value = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch.Root v-model="value" class="toggle" />
    {{ value }}
  </div>
</template>
