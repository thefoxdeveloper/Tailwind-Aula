<template>
  <div class="bg-[#f2f2f2] h-screen w-screen flex justify-center items-center">
    <div class="w-2/3 rounded-3xl flex flex-row">
      <div class="bg-white w-2/5 rounded-l-xl flex flex-col justify-center">
        <div class="px-6 py-6 flex flex-col">
          <h1 class="text-2xl font-semibold text-black">Registrar-se no Growtwitter</h1>

          <form @submit.prevent="handleSubmit" class="flex flex-col mt-2">
            <label for="name" class="text-sm font-semibold text-gray-500">Nome</label>
            <input
              type="text"
              id="name"
              v-model="form.name"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <label for="surname" class="text-sm font-semibold text-gray-500">Sobrenome</label>
            <input
              type="text"
              id="surname"
              v-model="form.surname"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <label for="username" class="text-sm font-semibold text-gray-500">Username</label>
            <input
              type="text"
              id="username"
              v-model="form.username"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <label for="email" class="text-sm font-semibold text-gray-500">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <label for="password" class="text-sm font-semibold text-gray-500">Senha</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <label for="confirmPassword" class="text-sm font-semibold text-gray-500"
              >Confirmar senha</label
            >
            <input
              type="password"
              id="confirmPassword"
              v-model="form.confirmPassword"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <label for="avatar" class="text-sm font-semibold text-gray-500">Avatar</label>
            <input
              type="file"
              id="avatar"
              @change="handleAvatarChange"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <button
              class="bg-sky-500 text-white font-semibold p-1 rounded-md my-2"
              :disabled="isLoading"
            >
              Registrar
            </button>

            <RouterLink to="/" class="text-sm font-semibold text-sky-500 text-center"
              >Já possui uma conta? Entrar</RouterLink
            >
          </form>
        </div>
      </div>

      <div class="bg-sky-500 w-3/5 rounded-r-xl flex flex-col justify-center items-center">
        <div class="px-6 py-12 flex flex-col text-right">
          <h1 class="text-3xl font-semibold text-white">Growtwitter</h1>
          <p class="text-xs text-white my-2">Trabalho final do bloco intermediário</p>
          <p class="text-white text-md font-semibold">
            O Growtwitter é a plataforma definitiva para todos os apaixonados por redes sociais que
            buscam uma experiência familiar e poderosa, semelhante ao Twitter, mas com um toque
            único. Seja parte desta comunidade que valoriza a liberdade de expressão, a conexão com
            pessoas de todo o mundo e a disseminação de ideias.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const form = ref({
  name: '',
  surname: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: null
})

const isLoading = ref(false)
const showSuccessMessage = ref(false)
const errorMessage = ref('')

const handleAvatarChange = (event: any) => {
  form.value.avatar = event.target.files[0]
}

const handleSubmit = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('surname', form.value.surname)
  formData.append('username', form.value.username)
  formData.append('email', form.value.email)
  formData.append('password', form.value.password)
  formData.append('confirmPassword', form.value.confirmPassword)
  if (form.value.avatar) {
    formData.append('avatar', form.value.avatar)
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    if (response.status === 201) {
      showSuccessMessage.value = true
      toast.success('Usuário registrado com sucesso.', {
        timeout: 2000
      })
    } else {
      errorMessage.value = 'Erro ao registrar usuário.'
      toast.error('Erro ao registrar usuário', {
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

onMounted(() => {})
</script>

<style scoped>
/* ... */
</style>
