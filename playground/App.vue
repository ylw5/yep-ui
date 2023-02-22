<script setup lang="ts">
import { Checkbox } from '@yep-ui/components'
import { ref } from 'vue'
const v = ref(true)
const arr = ref(['a', 'b', 'c'])
</script>

<template>
  <!-- <button @click="v = !v">
    button
  </button> -->
  {{ arr }}
  <div class="flex justify-center flex-col items-center">
    <Checkbox.Group v-model="arr" :min="1" :max="2">
      <Checkbox.Root class="checkbox">
        <Checkbox.Indicatior class="indicator">
          <i class="i-ion:checkmark-round" />
        </Checkbox.Indicatior>
        a
      </Checkbox.Root>
      <Checkbox.Root class="checkbox">
        <Checkbox.Indicatior class="indicator">
          <i class="i-ion:checkmark-round" />
        </Checkbox.Indicatior>
        b
      </Checkbox.Root>
      <Checkbox.Root class="checkbox">
        <Checkbox.Indicatior class="indicator">
          <i class="i-ion:checkmark-round" />
        </Checkbox.Indicatior>
        c
      </Checkbox.Root>
      <Checkbox.Root class="checkbox">
        <Checkbox.Indicatior class="indicator">
          <i class="i-ion:checkmark-round" />
        </Checkbox.Indicatior>
        d
      </Checkbox.Root>
    </Checkbox.Group>
    <!-- <Checkbox.Root class="checkbox" value="a"> -->
    <!-- <Checkbox.Indicatior class="indicator" /> -->
    <!-- </Checkbox.Root> -->
  </div>
</template>

<style>
label:has(input){
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-items: center;
  gap: .5rem;
  margin-right: 1rem;
}

.checkbox:checked{
  --chkfg:0 0% 100%;
  --chkbg:300.89 94.378% 51.176%;
  background-repeat: no-repeat;
  /* animation: checkmark var(--animation-input,.2s) ease-in-out; */
  background-image: linear-gradient(-45deg,transparent 65%,hsl(var(--chkbg)) 65.99%),linear-gradient(45deg,transparent 75%,hsl(var(--chkbg)) 75.99%),linear-gradient(-45deg,hsl(var(--chkbg)) 40%,transparent 40.99%),linear-gradient(45deg,hsl(var(--chkbg)) 30%,hsl(var(--chkfg)) 30.99%,hsl(var(--chkfg)) 40%,transparent 40.99%),linear-gradient(-45deg,hsl(var(--chkfg)) 50%,hsl(var(--chkbg)) 50.99%);
}
</style>
