<template>
  <MenuDireita />
  <MenuEsquerda :currentUser="currentUser" :refreshTweets="refreshTweets" />

  <div class="flex flex-row justify-center">
    <div class="w-3/5 flex flex-col border-black/5 border-[1px]">
      <div class="p-6 text-3xl font-bold border-b-[1px] border-black/5 flex flex-col">
        <div class="flex flex-row items-center gap-6">
          <RouterLink to="/"><ArrowLeft /></RouterLink>
          <div class="flex flex-col mb-2">
            <div>{{ profileUser.name + ' ' + profileUser.surname }}</div>
            <div class="text-gray-400 text-xs">{{ profileUser.posts.length }} posts</div>
          </div>
        </div>

        <div
          class="pattern-isometric pattern-green-600 pattern-bg-white pattern-size-8 pattern-opacity-20 h-44"
        ></div>

        <div class="p-3 flex flex-row justify-between">
          <div class="flex flex-row gap-2">
            <img
              :src="profileUser.avatar_url"
              alt=""
              class="w-[100px] h-[100px] rounded-full border-white border-4 -mt-14 z-10"
            />

            <div class="flex flex-col">
              <span class="font-bold">{{ profileUser.name + ' ' + profileUser.surname }}</span>
              <span class="text-lg font-semibold text-gray-400">@{{ profileUser.username }}</span>
              <span class="text-lg font-semibold text-gray-400 flex-row flex items-center"
                ><Calendar class="w-4 h-4" />{{ geraMensagem(profileUser.created_at) }}</span
              >
            </div>
          </div>
          <div v-if="currentUser.username === profileUser.username">
            <button
              class="overflow-hidden w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group"
              @click="showModalEditar = true"
            >
              Editar
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom"
              ></span>
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom"
              ></span>
              <span
                class="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom"
              ></span>
              <span
                class="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10 text-center justify-center flex"
                >Perfil</span
              >
            </button>
          </div>
        </div>
      </div>
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

  <div
    v-if="showModalEditar"
    class="fixed top-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-10 h-screen w-screen"
  >
    <div class="bg-white p-6 rounded-lg w-1/3">
      <div class="flex justify-between items-center">
        <h2 class="text-xl font-bold">Editar Conta</h2>
        <button @click="showModalEditar = false" class="text-gray-500 hover:text-gray-800">
          &times;
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="flex flex-col mt-2">
        <label for="name" class="text-sm font-semibold text-gray-500">Nome</label>
        <input
          type="text"
          id="name"
          v-model="currentUser.name"
          class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />

        <label for="surname" class="text-sm font-semibold text-gray-500">Sobrenome</label>
        <input
          type="text"
          id="surname"
          v-model="currentUser.surname"
          class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />

        <label for="username" class="text-sm font-semibold text-gray-500">Username</label>
        <input
          type="text"
          id="username"
          v-model="currentUser.username"
          class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />

        <label for="email" class="text-sm font-semibold text-gray-500">Email</label>
        <input
          type="email"
          id="email"
          v-model="currentUser.email"
          class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
        />

        <label for="avatar" class="text-sm font-semibold text-gray-500">Avatar</label>
        <div class="flex justify-between items-center">
          <input
            type="file"
            id="avatar"
            @change="handleAvatarChange"
            class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent w-1/2"
          />
          <img
            :src="currentUser.avatar_url"
            alt=""
            srcset=""
            class="w-[170px] h-[170px] rounded-full"
          />
        </div>

        <button
          class="bg-sky-500 text-white font-semibold p-1 rounded-md my-2"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Editando...' : 'Editar' }}
        </button>
      </form>
    </div>
  </div>
  <div v-if="isLoading" class="flex justify-center items-center min-h-screen z-40">
    <div
      class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
    >
      <div
        class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TweetComponent from '@/components/TweetComponent.vue'
import type { Tweet, User } from '@/types/types'
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import MenuEsquerda from '@/components/MenuEsquerda.vue'
import MenuDireita from '@/components/MenuDireita.vue'
import { useRoute } from 'vue-router'
import { ArrowBigLeft, ArrowLeft, Calendar } from 'lucide-vue-next'
import { geraMensagem } from '@/utils/utils'
const route = useRoute()

import { useToast } from 'vue-toastification'

const toast = useToast()
const showSuccessMessage = ref(false)

const showModalEditar = ref(false)
const form = ref({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: null
})
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
const profileUser = ref<User>({
  id: 0,
  name: '',
  username: '',
  email: '',
  avatar_url: '',
  created_at: '',
  surname: '',
  posts: []
})
const handleAvatarChange = (event: any) => {
  form.value.avatar = event.target.files[0]
}

const handleSubmit = async () => {
  isLoading.value = true

  const formData = new FormData()
  formData.append('name', currentUser.value.name)
  formData.append('surname', currentUser.value.surname)
  formData.append('username', currentUser.value.username)
  formData.append('email', currentUser.value.email)

  if (form.value.avatar) {
    formData.append('avatar', form.value.avatar)
  }

  console.log(formData)

  try {
    isLoading.value = true
    const response = await axios.post(
      'http://127.0.0.1:8000/api/users/' + Number(currentUser.value.id) + '?_method=PATCH',
      formData,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )

    if (response.status === 200) {
      Promise.all([
        buscarUsuarioLogado().then((response) => {
          sessionStorage.setItem('userId', response.id)

          currentUser.value = response
        }),
        buscarUsuarioPerfil().then((response) => {
          profileUser.value = response
        }),

        buscarTweets().then((response) => {
          tweets.value = response.filter((tweet: Tweet) => tweet.userId == Number(route.params.id))
        })
      ]).then(() => {
        showModalEditar.value = false
        toast.success('Usuário alterado com sucesso.', {
          timeout: 2000
        })
      })
    } else {
      toast.error('Erro ao alterar usuário', {
        timeout: 2000
      })
    }
  } catch (error: any) {
    toast.error(error.response.data.message, {
      timeout: 2000
    })
  } finally {
    isLoading.value = false
  }
}
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
const buscarUsuarioPerfil = async () => {
  return axios
    .get('http://127.0.0.1:8000/api/users/' + route.params.id, {
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
    tweets.value = response.filter((tweet: Tweet) => tweet.userId == Number(route.params.id))
  })
}

onMounted(() => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token')

  if (!token) {
    window.location.href = '/login'
  }
  buscarUsuarioLogado().then((response) => {
    sessionStorage.setItem('userId', response.id)

    currentUser.value = response
  })
  buscarUsuarioPerfil().then((response) => {
    profileUser.value = response
  })

  buscarTweets().then((response) => {
    tweets.value = response.filter((tweet: Tweet) => tweet.userId == Number(route.params.id))
  })
})
</script>
