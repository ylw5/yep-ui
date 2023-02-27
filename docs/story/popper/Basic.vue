<template>
  <div class="flex gap-3">
    <Popper.Root>
      <Popper.Trigger class="btn btn-primary">
        捶我
      </Popper.Trigger>
      <Popper.Panel class="popper-panel">
        Hi, I'm a popper!
      </Popper.Panel>
    </Popper.Root>
    <Popper.Root trigger="hover">
      <Popper.Trigger class="btn btn-primary">
        贴贴
      </Popper.Trigger>
      <Popper.Panel class="popper-panel">
        Hi, I'm a popper!
      </Popper.Panel>
    </Popper.Root>
  </div>
</template>
