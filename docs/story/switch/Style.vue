<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(true)
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch.Root
      v-slot="{ checked }"
      v-model="enabled"
    >
      <div
        class="w-7 h-7"
        :class="checked ? 'i-carbon-sun' : 'i-carbon-moon'"
      />
    </Switch.Root>

    <Switch.Root
      v-model="enabled"
      class=" bg-blue w-7 h-7 rounded-full data-checked:(animate-bounce-alt)"
    />
  </div>
</template>
