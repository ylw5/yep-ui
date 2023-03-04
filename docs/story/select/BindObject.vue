<script setup lang="ts">
import { ref } from 'vue'
const dishes = [
  { id: 1, name: '梅菜扣肉', unavailable: false },
  { id: 2, name: '宫保鸡丁', unavailable: false },
  { id: 3, name: '回锅肉', unavailable: false },
  { id: 4, name: '披萨', unavailable: false },
  { id: 5, name: '牛排', unavailable: false },
  { id: 6, name: '答辩', unavailable: true },
  { id: 7, name: '答辩', unavailable: true },

]
const selectedDish = ref(dishes[0])
</script>

<template>
  <Select.Root
    v-model="selectedDish"
    class="relative"
    by="id"
  >
    <Select.Trigger
      class="input text-left cursor-pointer"
    >
      {{ selectedDish.name }}
    </Select.Trigger>

    <Select.Options
      as="div"
      class="select-options"
    >
      <Select.Option
        v-for="dish in dishes"
        v-slot="{ selected }"
        :key="dish.id"
        :value="dish"
        :disabled="dish.unavailable"
        as="div"
        class="select-option flex items-center justify-between"
      >
        <span>{{ dish.name }}</span>
        <span
          v-if="selected"
          class="i-carbon:checkmark-outline"
        />
      </Select.Option>
    </Select.Options>
  </Select.Root>
</template>
