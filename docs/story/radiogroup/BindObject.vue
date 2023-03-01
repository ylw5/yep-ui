<script setup lang="ts">
import { ref } from 'vue'
const peoples = [
  { id: 1, name: 'Rookie' },
  { id: 2, name: 'Doinb' },
  { id: 3, name: 'Scout' },
]
const person = ref(peoples[1])
</script>

<template>
  <div />
  <RadioGroup.Root v-model="person" class="flex">
    <RadioGroup.Option
      v-for="person in peoples"
      :key="person.id"
      class="relative p-2 outline-0 group"
      :value="person"
    >
      {{ person.name }}
      <div class="absolute hidden left-1/2 -translate-x-1/2 group-data-checked:block">
        <span>{{ person.name === 'Doinb' ? '🤩' : '😒' }}</span>
      </div>
    </RadioGroup.Option>
  </RadioGroup.Root>
</template>
