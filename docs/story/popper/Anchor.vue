<template>
  <div class="flex justify-center gap-3">
    <Popper.Root>
      <Popper.Anchor class="inline-block mr-2">
        <input type="text" class="border-1 border-solid border-border rounded-md pl-3" placeholder="Poppor Anchor">
      </Popper.Anchor>
      <Popper.Trigger class="btn btn-info h-6">
        Save
      </Popper.Trigger>
      <Popper.Panel class="popper-panel">
        <Popper.PanelArrow class="panel-arrow" />
        Hi, I'm here!
      </Popper.Panel>
    </Popper.Root>
  </div>
</template>
