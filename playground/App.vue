<script setup lang="ts">
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}
const text = ref('hello')
</script>

<template>
  <button @click="toggleTheme">
    theme
  </button>
  <Input.Root v-model="text" class="input " />
  <Input.Group
    class="inputgroup "
  >
    <Input.Root maxlength="5" class="" />
    5
  </Input.Group>
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
