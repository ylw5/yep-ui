<script setup lang="ts">
import { ref } from 'vue'
const plan = ref('startup')
</script>

<template>
  <RadioGroup.Root v-model="plan" class="flex gap-3 mb-3">
    <RadioGroup.Option value="startup" />
    <RadioGroup.Option value="business" class="group flex gap-2">
      <div class="radio" />
      我自由喽
    </RadioGroup.Option>
    <RadioGroup.Option value="enterprise" />
  </RadioGroup.Root>
  select: {{ plan }}
</template>
