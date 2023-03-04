<script setup lang="ts">
const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },

]
</script>

<template>
  <Select.Root :default-value="people[0]" class="relative">
    <Select.Trigger
      v-slot="{ value }"
      class="input text-left cursor-pointer"
    >
      {{ value.name }}
    </Select.Trigger>

    <Select.Options
      as="div"
      class="select-options"
    >
      <Select.Option
        v-for="person in people"
        v-slot="{ selected }"
        :key="person.name"
        :value="person"
        as="div"
        class="select-option flex items-center justify-between"
      >
        <span>{{ person.name }}</span>
        <span
          v-if="selected"
          class="i-carbon:checkmark-outline"
        />
      </Select.Option>
    </Select.Options>
  </Select.Root>
</template>
