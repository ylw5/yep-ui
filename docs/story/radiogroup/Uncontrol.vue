<script setup lang="ts">
const plans = ['startup', 'business', 'enterprise']
</script>

<template>
  <form action="/billing" method="post">
    <RadioGroup.Root name="plan" :default-value="plans[0]">
      <RadioGroup.Label>Plan</RadioGroup.Label>
      <RadioGroup.Option
        v-for="plan in plans"
        :key="plan"
        class="data-checked:bg-red"
        :value="plan"
      >
        {{ plan }}
      </RadioGroup.Option>
    </RadioGroup.Root>
    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form>
</template>
