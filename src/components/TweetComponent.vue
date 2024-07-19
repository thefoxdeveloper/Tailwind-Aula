<template>
  <div class="flex flex-col w-full border-b-[1px]">
    <div class="flex flex-row items-start">
      <div class="p-3 flex flex-row justify-center items-center">
        <img
          :src="props.user.avatar_url ? props.user.avatar_url : avatar"
          class="rounded-full"
          alt=""
          srcset=""
          style="height: 80px; width: 80px"
        />
      </div>
      <div class="p-2 flex flex-col w-4/5">
        <div class="flex flex-row gap-1">
          <span class="font-bold">{{ props.user.name }}</span>
          <span>@{{ props.user.username }}</span>
          <span>·</span>
          <span>{{ tempoPassado(props.created_at) }}</span>
        </div>
        <div>
          <p class="text-lg font-base">
            {{ props.content }}
          </p>
        </div>
        <div class="flex flex-row gap-2 items-center mt-2">
          <MessageCircle class="w-4 h-4" />
          <span class="text-sm">0</span>
          <Heart :class="liked ? 'w-4 h-4 text-red-500' : 'w-4 h-4'" @click="toggleLike" />
          <span class="text-sm">{{ likesCount }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { Heart, MessageCircle } from 'lucide-vue-next'
import type { Tweet } from '@/types/types'
import avatar from '../assets/avatarDef.jpg'
import { tempoPassado } from '@/utils/utils'
import { ref, onMounted } from 'vue'

const props = defineProps<Tweet>()
const liked = ref(false)
const likesCount = ref(props.likes.length)

const toggleLike = async () => {
  try {
    liked.value = !liked.value
    if (liked.value) {
      likesCount.value++
    } else {
      likesCount.value--
    }
    const response = await axios.post(
      `http://127.0.0.1:8000/api/likes`,
      {
        postId: props.id,
        userId: props.user.id
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      }
    )
  } catch (error) {
    console.error('Error liking the post:', error)
  }
}

onMounted(() => {
  liked.value = props.likes.some((like: any) => like.userId == sessionStorage.getItem('userId'))
})
</script>
