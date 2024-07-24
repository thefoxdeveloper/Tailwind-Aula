<template>
  <div>
    <pre>{{ users }}</pre>
    <img v-for="user in users" :src="user.profileImage" alt="" srcset="" />
  </div>
</template>
<script setup lang="js">
import axios from 'axios'
import { onMounted, ref } from 'vue'

const users = ref([])

function getUsers() {
  axios.get('http://127.0.0.1:8000/users/').then((response) => {
    console.log(response.data.data)

    users.value = response.data
  })
}

function getBase64Image(binaryData) {
  if (!binaryData) return ''
  return `data:image/jpeg;base64,${binaryData}`
}
onMounted(() => {
  getUsers()
})
</script>
