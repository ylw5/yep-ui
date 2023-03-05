<script setup lang="ts">
import { ref } from 'vue'
const enabled = ref(true)
</script>

<template>
  <form action="/notification-settings" method="post">
    <Switch.Root v-model="enabled" class="toggle" name="notifications">
      <!-- ... -->
    </Switch.Root>
  </form>
</template>
