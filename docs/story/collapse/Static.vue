<template>
  <div>
    <div class="mx-auto w-full max-w-md rounded-2xl bg-white p-2">
      <Collapse.Root v-slot="{ open }">
        <Collapse.Trigger
          class="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          <span>What is your refund policy?</span>
          <div
            :class="open ? 'rotate-180 transform' : ''"
            class="h-4 w-4 transition text-purple-500  i-carbon:arrow-up"
          />
        </Collapse.Trigger>
        <Collapse.Panel
          static
          class="px-4 pt-4 pb-2 text-sm text-gray-500"
        >
          If you're unhappy with your purchase for any reason, email us within
          90 days and we'll refund you in full, no questions asked.
        </Collapse.Panel>
      </Collapse.Root>
    </div>
  </div>
</template>
