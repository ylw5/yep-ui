<script setup lang="ts">
import { ref } from 'vue'
const checkedfruits = ref(['apple', 'banana'])
const fruits = ['apple', 'banana', 'orange']
</script>

<template>
  <Checkbox.Group v-model="checkedfruits" class="flex gap-2">
    <Checkbox.Root
      v-for="fruit in fruits"
      :key="fruit"
      class="checkbox"
      :value="fruit"
    />
  </Checkbox.Group>
  <p>selected: {{ checkedfruits }}</p>
</template>
