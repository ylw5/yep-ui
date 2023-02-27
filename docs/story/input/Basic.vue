<script setup lang="ts">
const text = ref('hello world')
</script>

<template>
  <div class="flex flex-col gap-2">
    <Input.Root class="input outline-0" placeholder="非受控模式" />
    <Input.Root v-model="text" class="input" />
    <p>{{ text }}</p>
  </div>
</template>
