<script setup lang="ts">
import { ref } from 'vue'

// import { PopperRoot } from './dist/yep-ui.js'
import myPopover from './src/components/popper/story/Baisc.vue'
import { PopperRoot } from './src'
</script>

<template>
  <PopperRoot trigger="click" />
  <!-- <Popper.Root>
    <Popper.Trigger>
      Trigger
    </Popper.Trigger>
    <Popper.Panel class="popper-panel">
      <div>Content</div>
    </Popper.Panel>
  </Popper.Root> -->
</template>

<style>
*, :after, :before {
    box-sizing: border-box;
}
body {
  box-sizing: border-box;
  /* background-color: gray; */
}
</style>
