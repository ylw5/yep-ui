<script setup lang="ts">
import { Checkbox, Dialog } from '@yep-ui/components'
import { ref } from 'vue'
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}
const v = ref(false)
</script>

<template>
  <button @click="toggleTheme">
    theme
  </button>
  <button @click="v = !v">
    open
  </button>
  <!-- {{ v }} -->
  <div class="flex">
    <button>test</button>
  </div>
  <div class="flex justify-center flex-col items-center">
    <Dialog.Root modal static>
      <Dialog.Trigger>
        trigger
      </Dialog.Trigger>
      <Dialog.Panel class="border-0 rounded-sm">
        ddd
        <input type="text">
        <div class="flex mt-2 justify-end">
          <Dialog.Close class="btn btn-info">
            cancle
          </Dialog.Close>
        </div>
      </Dialog.Panel>
    </Dialog.Root>
  </div>
</template>

<style>
.dark body {
  background: #000;
  color: aliceblue;
}

label:has(input:disabled){
  cursor: not-allowed;
  opacity: .5;
}

body {
  height: 120vh;
}
</style>
