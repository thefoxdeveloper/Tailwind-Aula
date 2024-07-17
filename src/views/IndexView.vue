<template>
  <div class="bg-[#f2f2f2] h-screen w-screen flex flex-row justify-center items-center">
    <div class="h-screen bg-white w-1/5"></div>
    <Separador class="w-[1px] h-screen bg-black/15" />
    <div class="h-screen bg-white w-3/5">
      <div class="flex p-6 text-3xl font-bold border-b-2">Página inicial</div>
      <div class="flex flex-col">
        <TweetComponent />
      </div>
    </div>
    <Separador class="w-[1px] h-screen bg-black/15" />
    <div class="h-screen bg-white w-1/5 flex flex-row justify-center" id="oqueEstaAcontecendo">
      <div class="w-11/12 h-fit rounded-lg bg-gray-200 mt-10 p-4 flex flex-col gap-4">
        <span class="text-2xl font-bold">O que está acontecendo?</span>
        <HappeningTopic
          v-for="item in data"
          v-bind:key="item.topic"
          :topic="item.topic"
          :time="item.time"
          :about="item.about"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HappeningTopic from '@/components/HappeningTopic.vue'
import TweetComponent from '@/components/TweetComponent.vue'
import { onMounted } from 'vue'

const data = [
  {
    topic: 'Esporte',
    time: '45',
    about: 'Assunto sobre Esporte'
  },
  {
    topic: 'Cinema',
    time: '41',
    about: 'Assunto sobre Cinema'
  },
  {
    topic: 'Carros',
    time: '41',
    about: 'Assunto sobre Carros'
  },
  {
    topic: 'Musica',
    time: '12',
    about: 'Assunto sobre Musica'
  },
  {
    topic: 'Futebol',
    time: '41',
    about: 'Assunto sobre Futebol'
  }
]

onMounted(() => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
  }
})
</script>
