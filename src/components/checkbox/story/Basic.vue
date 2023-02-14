<script setup lang="ts">
import { ref } from 'vue'
import Indicator from '../src/components/Indicator.vue'
import Root from '../src/components/Root.vue'
const checked1 = ref(true)
</script>

<template>
  <Root
    v-slot="{ checked, disabled }"
    v-model="checked1"
    value="aaaa"
    class="
      inline-flex items-center
      cursor-pointer
      yep-disabled:opacity-50 yep-disabled:cursor-not-allowed
    "
  >
    <Indicator
      class="w-4 h-4
        flex items-center justify-center
        text-white
        border-gray-200
        transition"
      :class="[
        checked ? 'bg-blue-5' : 'bg-white border-solid border-2',
      ]
      "
    >
      <span
        class="
          i-carbon:checkmark
          font-semibold
        "
      />
    </Indicator>
    <span
      class="ml-1"
      :class="[
        { 'text-gray-400': disabled },
        { 'text-blue': checked },
      ]"
    >
      Checkbox
    </span>
  </Root>
</template>
