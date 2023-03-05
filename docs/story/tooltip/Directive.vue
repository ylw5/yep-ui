<template>
  <div class="h-full flex items-center justify-center gap-7">
    <button v-tooltip="{ text: 'I am top tolltip', position: 'top' }">
      top
    </button>
    <button v-tooltip="{ text: 'I am bottom tolltip', position: 'bottom' }">
      bottom
    </button>
    <button v-tooltip="{ text: 'I am left tolltip', position: 'left' }">
      left
    </button>
    <button v-tooltip="{ text: 'I am right tolltip', position: 'right' }">
      right
    </button>
  </div>
</template>
