<template>
  <div class="mx-auto w-full max-w-md space-y-4 rounded-2xl bg-white p-2">
    <Collapse.Root v-slot="{ open }">
      <Collapse.Trigger
        class="flex w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
      >
        <span>What is your refund policy?</span>
        <div
          :class="open ? 'rotate-180 transform' : ''"
          class="h-4 w-4 transition text-blue-500  i-carbon:arrow-up"
        />
      </Collapse.Trigger>
      <Collapse.Panel class="px-4 pt-4 pb-2 text-sm text-gray-500">
        If you're unhappy with your purchase for any reason, email us within
        90 days and we'll refund you in full, no questions asked.
      </Collapse.Panel>
    </Collapse.Root>

    <Collapse.Root>
      <Collapse.Trigger
        class="flex w-full group justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
      >
        <span>What is your refund policy?</span>
        <div
          class="h-4 w-4 transition text-blue-500  i-carbon:arrow-up group-data-open:(rotate-180 transform)"
        />
      </Collapse.Trigger>
      <Collapse.Panel class="px-4 pt-4 pb-2 text-sm text-gray-500">
        If you're unhappy with your purchase for any reason, email us within
        90 days and we'll refund you in full, no questions asked.
      </Collapse.Panel>
    </Collapse.Root>
  </div>
</template>
