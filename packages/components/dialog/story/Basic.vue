<script setup lang="ts">
import { ref } from 'vue'
import Root from '../src/components/Root.vue'
const modalOpen1 = ref(true)
const modalOpen2 = ref(false)
// function close() {
//   modalOpen.value = false
// }
function fn() {
  console.log('after close')
}
</script>

<template>
  {{ modalOpen1 }}
  <button @click="modalOpen1 = false">
    close
  </button>
  <button @click="modalOpen1 = true">
    open
  </button>
  <Root
    v-model="modalOpen1"
    modal
    @beforeClose="fn"
  >
    <h1>header</h1>
    <input type="text">
    <input autofocus type="text">
    <button @click="modalOpen2 = true">
      open 2
    </button>
    <Root v-model="modalOpen2" modal @beforeClose="fn">
      <h1>second</h1>
      <input type="text">
    </Root>
  </Root>
</template>
