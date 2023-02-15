<script setup lang="ts">
import { computed, ref } from 'vue'
import Select from '..'
const selectedPerson = ref()
const selectedPeople = [
  { name: 'Durward Reynolds' },
  { name: 'Kenton Towne' },
  { name: 'Therese Wunsch' },
  { name: 'Benedict Kessler' },
  { name: 'Katelyn Rohan' },
]

const query = ref('')
const filteredPeople = computed(() => {
  if (!query.value)
    return selectedPeople
  return selectedPeople.filter(person =>
    person.name.toLowerCase().includes(query.value.toLowerCase()),
  )
})
</script>

<template>
  <Select.Root
    v-slot="{ open }"
    v-model="selectedPerson"
    class="w-100 relative"
  >
    <Select.Tigger
      placeholder="Select a person"
      class="
        cursor-auto
        py-2 px-4 w-full
        text-left text-base
        border-solid border-gray-300 rounded-md
        focus:outline-none focus:border-blue
        bg-white
        transition
      "
      input
      :display-value="(person) => person.name"
      @input="query = $event.target.value"
    />
    <Select.Options
      class="
        absolute left-0 right-0
      shadow bg-white p-0
        focus-visible:outline-none
      "
    >
      <Select.Option
        v-for="person in filteredPeople"
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
