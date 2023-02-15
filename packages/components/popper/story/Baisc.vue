<script setup lang="ts">
import { ref } from 'vue'
import Anchor from '../src/components/Anchor.vue'
import Close from '../src/components/Close.vue'
import Panel from '../src/components/Panel.vue'
import Root from '../src/components/Root.vue'
import Trigger from '../src/components/Trigger.vue'
import PanelArrow from '../src/components/PanelArrow.vue'
</script>

<template>
  <Root
    trigger="click"
    placement="bottom"
  >
    <Trigger class="btn">
      <span>trigger</span>
    </Trigger>
    <Panel class="popper-panel bg-red text-white px-1 py-1 text-sm rounded-md">
      <div class="transition duration-200">
        <Close as="div" class="text-black">
          <span class="i-carbon:close block float-right cursor-pointer" />
        </Close>
        tooltip
      </div>

      <PanelArrow class="h-1 w-1" />
    </Panel>
  </Root>
</template>
