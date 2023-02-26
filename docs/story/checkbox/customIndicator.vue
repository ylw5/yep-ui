<template>
  <div class="flex gap-2">
    <Checkbox.Root class="checkbox">
      <Checkbox.Indicator class="indicator indicator-red" />
      bg
    </Checkbox.Root>
    <Checkbox.Root class="checkbox">
      <Checkbox.Indicator class="indicator">
        <i class="i-bx-check-double" />
      </Checkbox.Indicator>
      icon
    </Checkbox.Root>
    <Checkbox.Root class="checkbox">
      <Checkbox.Indicator class="indicator rounded-full" />
      circle
    </Checkbox.Root>
    <Checkbox.Root class="checkbox">
      <Checkbox.Indicator class="indicator rounded-full data-checked:bg-transparent">
        😀
      </Checkbox.Indicator>
      emoji
    </Checkbox.Root>
  </div>
</template>
