<template>
  <div class="fixed top-0 left-0 h-full bg-white w-1/5 flex flex-col justify-between">
    <div class="flex flex-col p-10">
      <div class="">
        <img :src="logo" alt="" class="w-[100px]" />
      </div>

      <div class="flex flex-col mt-4">
        <span class="text-xl font-semibold flex flex-row items-center gap-2">
          <House class="w-6 h-6" /> Página inicial
        </span>
        <span class="text-xl font-semibold flex flex-row items-center gap-2">
          <Hash class="w-6 h-6" /> Explorar
        </span>
        <span class="text-xl font-semibold flex flex-row items-center gap-2">
          <UserIcon class="w-6 h-6" /> Perfil
        </span>
      </div>
      <button
        @click="showModal = true"
        class="bg-sky-500 text-white font-semibold p-1 rounded-md my-2"
      >
        Tweetar
      </button>
    </div>
    <div class="p-10 flex flex-col">
      <div class="flex flex-row gap-2">
        <img :src="currentUser.avatar_url" alt="" class="w-[60px] h-[60px] rounded-full" />

        <div class="flex flex-col">
          <span class="font-bold">{{ currentUser.name + ' ' + currentUser.surname }}</span>
          <span class="text-sm font-bold text-gray-400">@{{ currentUser.username }}</span>

          <div class="text-sm font-bold text-gray-400 cursor-pointer" @click="logout">Sair</div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 h-screen w-screen"
    >
      <div class="bg-white p-6 rounded-lg w-1/3">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold">Novo Tweet</h2>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-800">
            &times;
          </button>
        </div>
        <textarea
          v-model="tweetContent"
          class="w-full p-2 border rounded mt-4"
          rows="4"
          placeholder="O que está acontecendo?"
        ></textarea>
        <div class="flex justify-end mt-4">
          <button @click="postTweet" class="bg-sky-500 text-white font-semibold p-2 rounded-md">
            Tweetar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import logo from '../assets/logo_growtweet.svg'
import { Hash, House, User as UserIcon } from 'lucide-vue-next'
import axios from 'axios'
import type { User } from '@/types/types'

const props = defineProps<{ currentUser: User; refreshTweets: () => void }>()
const showModal = ref(false)
const tweetContent = ref('')

const postTweet = () => {
  if (!tweetContent.value) {
    alert('Por favor, escreva algo para publicar')
    return
  }
  axios
    .post(
      'http://127.0.0.1:8000/api/posts',
      {
        content: tweetContent.value,
        userId: props.currentUser.id
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    .then(() => {
      showModal.value = false
      props.refreshTweets()
    })
}

const logout = () => {
  sessionStorage.removeItem('token')
  localStorage.removeItem('token')
  sessionStorage.removeItem('userId')
  window.location.href = '/'
}
</script>
