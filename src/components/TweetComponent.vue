<template>
  <div class="flex flex-col">
    <div class="flex flex-row items-start">
      <div class="p-3 flex flex-row justify-center items-center">
        <img
          :src="user.avatar_url ? user.avatar_url : avatar"
          class="rounded-full"
          alt=""
          srcset=""
          style="height: 80px; width: 80px"
        />
      </div>
      <div class="w-10/12 p-2">
        <div class="flex flex-row gap-1">
          <span class="font-bold">{{ user.name }}</span>
          <span>@{{ user.username }}</span>
          <span>·</span>
          <span>{{ props.created_at }}</span>
        </div>
        <div>
          <p class="text-lg font-base">
            {{ props.content }}
          </p>
        </div>
        <div class="flex flex-row gap-1 items-center mt-2">
          <!-- <MessageCircle class="w-4 h-4" />
          <span>{{ coments.count }}</span>
          <Heart :class="liked ? 'w-4 h-4 text-red-500' : 'w-4 h-4'" @click="like" />
          <span>{{ likes }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { Heart, MessageCircle } from 'lucide-vue-next'
import avatar from '../assets/avatarDef.jpg'
const props = defineProps<{ id: number; userId: number; content: string; created_at: string }>()

const liked = ref(false)

const like = () => {
  axios
    .post(
      `http://127.0.0.1:8000/api/likes`,
      {
        postId: tweet.value.id,
        userId: user.value.id
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
    .then((response) => {
      console.log('dei a curtida', response.data)
    })
    .then(() => {})
}

const buscarDadosUser = async () => {
  return axios
    .get(`http://127.0.0.1:8000/api/users/${props.userId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      }
    })
    .then(({ data: response }) => {
      return response.data
    })
}
onMounted(() => {
  buscarDadosUser().then((data) => {
    user.value = data
  })
})
</script>
