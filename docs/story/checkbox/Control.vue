<script setup lang="ts">
const checked = ref(false)
</script>

<template>
  <div class="flex">
    <button class="btn btn-primary mr-8" @click="checked = !checked">
      toggle
    </button>
    <Checkbox.Root v-model="checked" class="checkbox" value="checkbox" />
  </div>
</template>
