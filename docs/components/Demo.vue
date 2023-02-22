<script setup lang="ts">
import { ref } from 'vue'
const showCode = ref(false)
</script>

<template>
  <div>
    <slot />
    <div class="border-solid border-1 border-border rounded-lg">
      <div class="vp-raw flex items-center py-4 px-3">
        <slot name="demo" />
      </div>
      <div
        class="p-1 flex items-center justify-end text-gray-300 dark:text-gray-600 hover:text-primary"
        :class="{ '!text-primary': showCode }"
      >
        <div
          class="i-bx-code cursor-pointer"
          @click="showCode = !showCode"
        />
      </div>
    </div>

    <div v-show="showCode">
      <slot name="code" />
    </div>
  </div>
</template>
