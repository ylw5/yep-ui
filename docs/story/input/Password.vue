<script setup lang="ts">
const show = ref(false)
</script>

<template>
  <Input.Group
    class="inputgroup "
  >
    <Input.Root :type="show ? 'text' : 'password'" />
    <button class="btn btn-text" @click="show = !show">
      <span :class="show ? 'i-ph:eyeglasses-light' : 'i-ph:eyeglasses-fill'" />
    </button>
  </Input.Group>
</template>
