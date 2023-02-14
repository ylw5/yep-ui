<script setup lang="ts">
import { ref } from 'vue'
// import { ElButton, ElInput } from 'element-plus'
import myPopover from './src/components/popper/story/Baisc.vue'
import * as myPopover2 from './src/components/popper'
import { Popper } from './dist/yep-ui.mjs'
</script>

<template>
  <Popper.Root>
    <Popper.Trigger>
      Trigger
    </Popper.Trigger>
    <Popper.Panel class="popper-panel">
      <div>Content</div>
    </Popper.Panel>
  </Popper.Root>
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
