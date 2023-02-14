<script setup lang="ts">
import { ref } from 'vue'
import Select from '..'

const people = [
  { name: 'Durward Reynolds' },
  { name: 'Kenton Towne' },
  { name: 'Therese Wunsch' },
  { name: 'Benedict Kessler' },
  { name: 'Katelyn Rohan' },
]
const selectedPerson = ref(people[0])
</script>

<template>
  <Select.Root
    v-slot="{ open }"
    v-model="selectedPerson"
    class="w-100 relative"
  >
    <Select.Tigger
      class="
        border-solid border-gray-300 rounded-md
        py-2 px-4 w-full
        text-left text-base
        focus:border-blue
        bg-white
        transition
      "
      as="button"
    >
      <span>{{ selectedPerson?.name }}</span>
      <i
        class="i-carbon:chevron-down inline-block h-6 transition float-right"
        :class="{ 'rotate-180': open.value }"
      />
    </Select.Tigger>
    <Select.Options
      class="
        absolute left-0 right-0
      shadow bg-white p-0
      "
    >
      <Select.Option
        v-for="person in people"
        v-slot="{ selected, active }"
        :key="person.name"
        :value="person"
        class="
          list-none cursor-pointer
          p-2
        yep-active:bg-gray-100 yep-selected:text-blue"
      >
        <i
          class="w-4 inline-block mr-2"
          :class="{ 'i-carbon:checkmark': selected }"
        />
        <span
          :class="{ 'font-semibold': selected }"
        >
          {{ person.name }}
        </span>
        <span v-if="active" class="float-right">😀</span>
      </Select.Option>
    </Select.Options>
  </Select.Root>
</template>
