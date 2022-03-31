<template>
  <div>
    <input v-model="username" />
    <input v-model="password" />
    <button @click="login()">Login</button>
    <button @click="getUsers()">Show users</button>
    {{ message }}
    <ul v-for="user in users" :key="user._id">
      <li>{{ user.username }}, {{ user.email }}</li>
    </ul>
    <PluginRender />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import PluginRender from '@/vueFactory/PluginRender.vue'
const username = ref<string | null>(null)
const password = ref<string | null>(null)
const users = ref()
const message = ref(null)

const login = async () => {
  const res = await axios.post('https://api.poc.test/auth/login', {
    username: username.value, password: password.value
  },
    {
      headers: {
        'Content-type': 'application/json',
      }
    })

  localStorage.setItem('token', res.data.token)
}

// Function that will be called to refresh authorization
const refreshAuthLogic = failedRequest => axios.post('https://api.poc.test/auth/token/refresh').then(tokenRefreshResponse => {
  localStorage.setItem('token', tokenRefreshResponse.data.token);
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
  return Promise.resolve();
});

const getUsers = async () => {
  const res = await axios.get('https://api.poc.test/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
  users.value = res.data
}
createAuthRefreshInterceptor(axios, refreshAuthLogic)

const eventSource = new EventSource('https://api.poc.test/zigbee2mqtt/zigbee')
eventSource.onmessage = ({ data }) => {
  message.value = data
  console.log('NEW Message', data)
}
</script>