<script setup lang="ts">
import { ref } from 'vue'

const plans = ['startup', 'business', 'enterprise']
const plan = ref(plans[0])
</script>

<template>
  <form action="/billing" method="post">
    <RadioGroup.Root v-model="plan" name="plan">
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <RadioGroup.Option v-for="plan in plans" :key="plan" class="data-checked:bg-blue" :value="plan">
        {{ plan }}
      </RadioGroup.Option>
    </RadioGroup.Root>
    <button type="submit">
      Submit
    </button>
  </form>
</template>
