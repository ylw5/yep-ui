<template>
  <div class="flex gap-3">
    <Popper.Root placement="top">
      <Popper.Trigger class="btn btn-primary">
        click
      </Popper.Trigger>
      <Popper.Panel class="popper-panel">
        <Popper.PanelArrow class="panel-arrow" />
        Hi, I'm on top!
      </Popper.Panel>
    </Popper.Root>

    <Popper.Root placement="right">
      <Popper.Trigger class="btn btn-primary">
        click
      </Popper.Trigger>
      <Popper.Panel class="popper-panel">
        <Popper.PanelArrow class="panel-arrow" />
        Hi, I'm on right!
      </Popper.Panel>
    </Popper.Root>
  </div>
</template>
