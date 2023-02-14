<script setup lang="ts">
import { ref } from 'vue'
import Indicator from '../src/components/Indicator.vue'
import Root from '../src/components/Root.vue'
import Group from '../src/components/Group.vue'
const checkList = ref(['igang', 'ikun', 'itai'])
</script>

<template>
  {{ checkList }}
  <Group v-model="checkList">
    <Root
      v-slot="{ checked, disabled }"
      value="igang"
      class="
        inline-flex items-center
        cursor-pointer
        yep-disabled:opacity-50 yep-disabled:cursor-not-allowed
      "
    >
      <Indicator
        class="w-4 h-4
        flex items-center justify-center
        text-white
        border-gray-200
        transition"
        :class="[
          checked ? 'bg-blue-5' : 'bg-white border-solid border-2',
        ]
        "
      >
        <span
          class="
          i-carbon:checkmark
          font-semibold
        "
        />
      </Indicator>
      <span
        class="ml-1"
        :class="[
          { 'text-gray-400': disabled },
          { 'text-blue': checked },
        ]"
      >
        igang
      </span>
    </Root>
    <Root
      v-slot="{ checked, disabled }"
      value="ikun"
      class="
        inline-flex items-center
        cursor-pointer
        yep-disabled:opacity-50 yep-disabled:cursor-not-allowed
      "
    >
      <Indicator
        class="w-4 h-4
        flex items-center justify-center
        text-white
        border-gray-200
        transition"
        :class="[
          checked ? 'bg-blue-5' : 'bg-white border-solid border-2',
        ]
        "
      >
        <span
          class="
          i-carbon:checkmark
          font-semibold
        "
        />
      </Indicator>
      <span
        class="ml-1"
        :class="[
          { 'text-gray-400': disabled },
          { 'text-blue': checked },
        ]"
      >
        ikun
      </span>
    </Root>
    <Root
      v-slot="{ checked, disabled }"
      value="itai"
      class="
        inline-flex items-center
        cursor-pointer
        yep-disabled:opacity-50 yep-disabled:cursor-not-allowed
      "
    >
      <Indicator
        class="w-4 h-4
        flex items-center justify-center
        text-white
        border-gray-200
        transition"
        :class="[
          checked ? 'bg-blue-5' : 'bg-white border-solid border-2',
        ]
        "
      >
        <span
          class="
          i-carbon:checkmark
          font-semibold
        "
        />
      </Indicator>
      <span
        class="ml-1"
        :class="[
          { 'text-gray-400': disabled },
          { 'text-blue': checked },
        ]"
      >
        itai
      </span>
    </Root>
  </Group>
</template>
