<script setup lang="ts">
import { ref } from 'vue'

const plan = ref('startup')
</script>

<template>
  <RadioGroup.Root v-model="plan">
    <!-- This label is for the root `RadioGroup` -->
    <RadioGroup.Label class="sr-only">
      Plan
    </RadioGroup.Label>
    <div class="rounded-md bg-white">
      <RadioGroup.Option v-slot="{ checked }" value="startup">
        <div
          :class="checked ? 'bg-indigo-50 border-indigo-200' : 'border-gray-200'"
          class="relative flex border p-4"
        >
          <div class="flex flex-col">
            <!-- This label is for the `RadioGroupOption` -->
            <RadioGroup.Label>
              <span
                :class="checked ? 'text-indigo-900' : 'text-gray-900'"
                class="block text-sm font-medium"
              >Startup</span>
            </RadioGroup.Label>
          </div>
        </div>
      </RadioGroup.Option>
    </div>
  </RadioGroup.Root>
</template>
