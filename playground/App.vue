<script setup lang="ts">
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}
const checkedfruits = ref(['apple', 'banana'])
const fruits = ['apple', 'banana', 'orange']
</script>

<template>
  <button @click="toggleTheme">
    theme
  </button>

  <Checkbox.Group v-model="checkedfruits" :min="1" :max="2" class="flex gap-2">
    <Checkbox.Root
      v-for="fruit in fruits"
      :key="fruit"
      class="checkbox"
      :value="fruit"
    />
  </Checkbox.Group>
  <p>selected: {{ checkedfruits }}</p>
</template>

<style>
.dark body {
  background: #000;
  color: aliceblue;
}

label:has(input:disabled){
  cursor: not-allowed;
  opacity: .5;
}

body {
  height: 120vh;
}
</style>
