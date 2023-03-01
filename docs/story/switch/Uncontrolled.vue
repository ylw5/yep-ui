<template>
  <div>
    <Switch.Root
      v-slot="{ checked }"
      :default-checked="true"
    >
      <!-- ... -->
      <button
        :class="checked ? 'bg-blue-600' : 'bg-gray-200'"
        class="relative inline-flex h-6 w-11 items-center rounded-full"
      >
        <span class="sr-only">Enable notifications</span>
        <span
          :class="checked ? 'translate-x-6' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition"
        />
      </button>
    </Switch.Root>
  </div>
</template>
