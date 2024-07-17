<template>
  <div class="flex flex-col">
    <div class="text-base">{{ props.topic }} - Há {{ props.time }} min</div>
    <div class="text-xl font-bold">{{ props.about }}</div>
    <slot />
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  topic: String,
  time: String,
  about: String
})
</script>
