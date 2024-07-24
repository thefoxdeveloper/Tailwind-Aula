<template>
  <MenuDireita />
  <MenuEsquerda :currentUser="currentUser" :refreshTweets="refreshTweets" />
  <div class="flex flex-row justify-center">
    <div class="w-3/5 flex flex-col border-black/5 border-[1px]">
      <div class="p-6 text-3xl font-bold border-b-[1px] border-black/5">Página inicial</div>
      <div class="p-5 flex flex-col gap-4">
        <div v-for="item in data" v-bind:key="item.topic">
          <div class="flex flex-col">
            <div class="text-base">{{ item.topic }} - {{ tempoPassado(item.time) }}</div>
            <div class="text-xl font-bold">{{ item.about }}</div>
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Tweet, User } from '@/types/types'
import axios from 'axios'
import { onMounted, ref } from 'vue'
import MenuEsquerda from '@/components/MenuEsquerda.vue'
import MenuDireita from '@/components/MenuDireita.vue'
import { data } from '../utils/data'
import { tempoPassado } from '@/utils/utils'
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

const refreshTweets = () => {}
onMounted(() => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
  }
  buscarUsuarioLogado().then((response) => {
    sessionStorage.setItem('userId', response.id)

    currentUser.value = response
  })
})
</script>
