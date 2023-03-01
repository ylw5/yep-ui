<script setup lang="ts">
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}
const text = ref('235235235')
const enabled = ref(false)
const plans = [
  {
    name: 'Startup',
    ram: '12GB',
    cpus: '6 CPUs',
    disk: '160 GB SSD disk',
  },
  {
    name: 'Business',
    ram: '16GB',
    cpus: '8 CPUs',
    disk: '512 GB SSD disk',
  },
  {
    name: 'Enterprise',
    ram: '32GB',
    cpus: '12 CPUs',
    disk: '1024 GB SSD disk',
  },
]

const selected = ref(plans[0])
const plan = ref('startup')
</script>

<template>
  <button @click="toggleTheme">
    theme
  </button>
  <RadioGroup.Root v-model="plan" class="flex gap-3">
    <RadioGroup.Option value="startup" />
    <RadioGroup.Option value="business" />
    <RadioGroup.Option value="enterprise" />
  </RadioGroup.Root>
</template>

<style>
.dark body {
  background: #000;
  color: aliceblue;
}

label:has(input:disabled) {
  cursor: not-allowed;
  opacity: .5;
}

body {
  height: 120vh;
}
</style>
