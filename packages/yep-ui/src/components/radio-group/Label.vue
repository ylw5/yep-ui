<script setup lang="ts">
import { onMounted } from 'vue'
import { useId, useLabelContext } from '../../composables'
const props = defineProps({
  as: { type: [Object, String], default: 'label' },
  id: { type: String, default: () => `yep-label-${useId()}` },
})
const context = useLabelContext()
onMounted(() => context.register(props.id))
</script>

<template>
  <component
    :is="as"
    :id="id"
    :name="context.name"
  >
    <slot />
  </component>
</template>
