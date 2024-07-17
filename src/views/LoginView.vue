<template>
  <div class="bg-[#f2f2f2] h-screen w-screen flex justify-center items-center">
    <div class="w-2/3 h-2/5 rounded-3xl flex flex-row">
      <div class="bg-sky-500 w-3/5 rounded-l-xl flex flex-col justify-center items-center">
        <div class="px-6 py-12 flex flex-col">
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
      <div class="bg-white w-2/5 rounded-r-xl flex flex-col justify-center">
        <div class="px-6 py-12 flex flex-col">
          <h1 class="text-2xl font-semibold text-black">Entrar no Growtwitter</h1>
          <form @submit.prevent="handleSubmit" class="flex flex-col mt-2">
            <label for="username" class="text-sm font-semibold text-gray-500">Email</label>
            <input
              type="text"
              id="username"
              placeholder=""
              v-model="form.email"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
            <label for="password" class="text-sm font-semibold text-gray-500">Password</label>
            <input
              type="password"
              id="password"
              placeholder=""
              v-model="form.password"
              class="p-2 rounded-md my-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />

            <button
              class="bg-sky-500 text-white font-semibold p-1 rounded-md my-2"
              :disabled="isLoading"
            >
              <span v-if="isLoading">Entrando...</span>
              <span v-else>Entrar</span>
            </button>

            <RouterLink to="/register" class="text-sm font-semibold text-sky-500 text-center"
              >Criar conta</RouterLink
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()
const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const handleSubmit = async () => {
  if (!form.value.email || !form.value.password) {
    toast.error('Por favor, preencha todos os campos.', {
      timeout: 2000
    })
    return
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', form.value)

    if (response.status === 200) {
      toast.success('Usuário logado com sucesso.', {
        timeout: 2000
      })
      console.log(response.data.data)

      sessionStorage.setItem('token', response.data.data.token)
      localStorage.setItem('token', response.data.data.token)

      window.location.href = '/'
    }
  } catch (error: any) {
    if (error.response) {
      toast.error(error.response.data.msg, {
        timeout: 2000
      })
    } else {
      toast.error('Ocorreu um erro inesperado. Tente novamente mais tarde.', {
        timeout: 2000
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>
