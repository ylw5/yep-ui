<script setup lang="ts">
import { ref } from 'vue'
import Select from '../../select'

const popularCities = [
  { name: 'Shanghai' },
  { name: 'Beijing' },
  { name: 'Chengdu' },
]
const otherCities = [
  { name: 'Guangzhou' },
  { name: 'Shenzhen' },
  { name: 'Hangzhou' },
]
const selectCity = ref()
</script>

<template>
  <Select.Root
    v-slot="{ open }"
    v-model="selectCity"
    class="w-100 relative"
  >
    <Select.Tigger
      class="
        border-solid rounded-md
        py-2 px-4 w-full
        text-left text-base
        focus:outline-none focus:border-blue
        bg-white
        transition
      "
      :class="open ? 'border-blue' : 'border-gray-300'"
      name="trigger"
    >
      <span v-if="selectCity">{{ selectCity?.name }}</span>
      <span v-else class="text-gray-400">Select a city</span>
      <i
        class="i-carbon:chevron-down inline-block h-6 transition float-right"
        :class="{ 'rotate-180': open }"
      />
    </Select.Tigger>
    <Select.Options
      class="
        absolute left-0 right-0
      shadow-lg
      bg-white
        p-0 my-2
        focus-visible:outline-none
      "
    >
      <div class="text-xs text-gray-400 px-3 py-1">
        Popular cities
      </div>
      <Select.Option
        v-for="city in popularCities"
        v-slot="{ selected }"
        :key="city.name"
        :value="city"
        class="
          list-none cursor-pointer
          px-3 py-2
        yep-active:bg-gray-100 yep-selected:text-blue
        "
      >
        <span
          :class="{ 'font-semibold': selected }"
        >
          {{ city.name }}
        </span>
      </Select.Option>

      <div class="w-[calc(100%-1.5rem)] m-auto my-1 h-[2px] bg-gray-100" />

      <div class="text-xs text-gray-400 px-3 py-1">
        other cities
      </div>

      <Select.Option
        v-for="otherCity in otherCities"
        :key="otherCity.name"
        v-slot="{ selected }"
        :value="otherCity"
        class="
          list-none cursor-pointer
          px-3 py-2
        yep-active:bg-gray-100 yep-selected:text-blue
        "
      >
        <span
          :class="{ 'font-semibold': selected }"
        >
          {{ otherCity.name }}
        </span>
      </Select.Option>
    </Select.Options>
  </Select.Root>
</template>
