<template>
  <div class="flex flex-col">
    <div class="text-base">{{ props.topic }} - {{ tempoPassado(props.time) }}</div>
    <div class="text-xl font-bold">{{ props.about }}</div>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { tempoPassado } from '@/utils/utils'

const props = defineProps({
  topic: String,
  time: String,
  about: String
})
</script>
