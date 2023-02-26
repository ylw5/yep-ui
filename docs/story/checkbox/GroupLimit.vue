<script lang="ts" setup>
const checkedCities = ref(['Shanghai', 'Beijing'])
const cities = ['Shanghai', 'Beijing', 'Guangzhou', 'Shenzhen']
</script>

<template>
  <Checkbox.Group v-model="checkedCities" class="flex gap-2" :min="1" :max="2">
    <Checkbox.Root
      v-for="city in cities"
      :key="city"
      class="checkbox"
      :value="city"
    />
  </Checkbox.Group>
</template>
