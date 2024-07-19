<template>
  <div
    class="fixed top-0 right-0 h-full bg-white w-1/5 flex flex-row justify-center"
    id="oqueEstaAcontecendo"
  >
    <div class="rounded-lg bg-gray-200 mt-10 p-4 flex flex-col gap-4 h-fit">
      <span class="text-2xl font-bold">O que está acontecendo?</span>
      <HappeningTopic v-for="item in data" v-bind:key="item.topic" v-bind="item" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { data } from '../utils/data'
import HappeningTopic from './HappeningTopic.vue'
</script>
