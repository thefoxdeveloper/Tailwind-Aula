<template>
  <MenuDireita />
  <MenuEsquerda :currentUser="currentUser" :refreshTweets="refreshTweets" />

  <div class="flex flex-row justify-center">
    <div class="w-3/5 flex flex-col border-black/5 border-[1px]">
      <div class="p-6 text-3xl font-bold border-b-[1px] border-black/5">Página inicial</div>
      <div class="h-full" v-if="!isLoading">
        <TweetComponent v-for="tweet in tweets" v-bind:key="tweet.id" v-bind="tweet" />
      </div>
      <div v-else class="flex justify-center items-center min-h-96">
        <div
          class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
        >
          <div
            class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TweetComponent from '@/components/TweetComponent.vue'
import type { Tweet, User } from '@/types/types'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import MenuEsquerda from '@/components/MenuEsquerda.vue'
import MenuDireita from '@/components/MenuDireita.vue'

const currentUser = ref<User>({
  id: 0,
  name: '',
  username: '',
  email: '',
  avatar_url: '',
  created_at: '',
  surname: '',
  posts: []
})
const tweets = ref<Tweet[]>([])
const isLoading = ref(false)

const buscarTweets = async () => {
  isLoading.value = true
  return axios
    .get('http://127.0.0.1:8000/api/posts', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(({ data: response }) => {
      return response.data
    })
    .finally(() => {
      isLoading.value = false
    })
}

const buscarUsuarioLogado = async () => {
  return axios
    .get('http://127.0.0.1:8000/api/users', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(({ data: response }) => {
      return response.data
    })
}

const refreshTweets = () => {
  buscarTweets().then((response) => {
    tweets.value = response
  })
}

onMounted(() => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
  }
  Promise.all([
    buscarUsuarioLogado().then((response) => {
      sessionStorage.setItem('userId', response.id)

      currentUser.value = response
    }),

    buscarTweets().then((response) => {
      tweets.value = response
    })
  ])
})
</script>
