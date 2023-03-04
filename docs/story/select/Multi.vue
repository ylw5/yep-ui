<script setup lang="ts">
import { ref } from 'vue'
const people = [
  { name: 'Wade Cooper' },
  { name: 'Jackson Wang' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },

]
const selectedPeople = ref([people[0]])
</script>

<template>
  <Select.Root v-model="selectedPeople" class="relative" multiple>
    <Select.Trigger
      class="input text-left cursor-pointer "
    >
      <span
        v-for="person in selectedPeople"
        :key="person.name"
        class="tag h-6 m-1"
      >
        {{ person.name }}
        <span
          class="i-carbon:close hover:bg-primary"
          @click="selectedPeople = selectedPeople.filter(p => p.name !== person.name)"
        />
      </span>
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
