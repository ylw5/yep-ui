<script setup lang="ts">
// import { Dialog } from 'yep-ui'
function toggleTheme() {
  document.documentElement.classList.toggle('dark')
}
const v = ref(true)
// console.log(Checkbox.Root)
</script>

<template>
  <button @click="toggleTheme">
    theme
  </button>
  <div>
    <Dialog.Root modal>
      <Dialog.Trigger>
        trigger
      </Dialog.Trigger>
      <Dialog.Panel class="border-0 rounded-sm">
        ddd
        <input type="text">
        <div class="flex mt-2 justify-end">
          <Dialog.Close class="btn">
            cancle
          </Dialog.Close>
        </div>
      </Dialog.Panel>
    </Dialog.Root>
  </div>
  <Checkbox.Root class="checkbox" value="1" />
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
