<template>
  <div class="bg-[#f2f2f2] h-screen w-screen flex flex-row justify-center items-center">
    <div class="h-screen bg-white w-1/5"></div>
    <div class="w-[1px] h-screen bg-black/15" />
    <div class="h-screen bg-white w-3/5">
      <div class="flex p-6 text-3xl font-bold border-b-2">Página inicial</div>
      <div class="flex flex-col">
        <!-- <TweetComponent
          v-for="item in tweets"
          v-bind:key="item.id"
          :id="item.id"
          :content="item.content"
          :userId="item.userId"
          :created_at="item.created_at"
        /> -->

        <pre>{{ tweets }}</pre>
      </div>
    </div>
    <div class="w-[1px] h-screen bg-black/15" />
    <div class="h-screen bg-white w-1/5 flex flex-row justify-center" id="oqueEstaAcontecendo">
      <div class="w-11/12 h-fit rounded-lg bg-gray-200 mt-10 p-4 flex flex-col gap-4">
        <span class="text-2xl font-bold">O que está acontecendo?</span>
        <HappeningTopic />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HappeningTopic from '@/components/HappeningTopic.vue'
import TweetComponent from '@/components/TweetComponent.vue'
import axios from 'axios'
import { onMounted, ref } from 'vue'

const currentUser = ref<User[]>([])

const tweets = ref<Tweet[]>([])
const users = ref<User[]>([])

const buscarTweets = async () => {
  return axios
    .get('http://127.0.0.1:8000/api/posts', {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(({ data: response }) => {
      return response.data
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

const buscarLikes = async () => {
  return axios
    .get(`http://127.0.0.1:8000/api/likes/`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(({ data: response }) => {
      return response.data
    })
}

const allRequests = async () => {
  const [likesResponse, tweetResponse, currentUserResponse] = await Promise.all([
    buscarLikes(),
    buscarTweets(),
    buscarUsuarioLogado()
  ])

  tweets.value = tweetResponse
  currentUser.value = currentUserResponse
}

onMounted(() => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
  }

  // allRequests()
  buscarTweets().then((response) => {
    tweets.value = response
  })

  buscarUsuarioLogado().then((response) => {
    currentUser.value = response
  })
})
</script>
