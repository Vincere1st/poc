<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>
  <input v-model="username"/>
  <input v-model="password"/>
  <button @click="login()"> Login</button>
  <button @click="getUsers()">Show users</button>
  {{ message }}
  <ul v-for="user in users" :key="user._id">
    <li>
      {{ user.username }}, {{ user.email }}
    </li>
  </ul>
  <RouterView/>
</template>
<script setup lang="ts">
import {RouterLink, RouterView} from 'vue-router'
import {ref, onMounted} from 'vue'
import axios from 'axios'
import createAuthRefreshInterceptor from 'axios-auth-refresh'
import mqtt from 'mqtt'
// voir fichier vite.config.ts pour le mqtt il y a un alias pour éviter une erreur console

const username = ref<string | null>(null)
const password = ref<string | null>(null)
const users = ref()
const message = ref(null)

// const connection = {
//   host: 'mqtt.poc.test',
//   port: 16384,
// }
//
// const subscription = {
//   topic: 'zigbee2mqtt/+',
//   qos: 2
// }

// const createConnection = () => {
//   const { host, port } = connection
//   const connectUrl = `ws://${host}:${port}`
//   try {
//     this.client = mqtt.connect(connectUrl)
//   } catch (error) {
//     console.log('mqtt.connect error', error)
//   }
// }
//
// onMounted(() => {
//   createConnection()
// })

const login = async () => {
  const res = await axios.post('http://api.poc.test/auth/login', {
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
const refreshAuthLogic = failedRequest => axios.post('http://api.poc.test/auth/token/refresh').then(tokenRefreshResponse => {
  localStorage.setItem('token', tokenRefreshResponse.data.token);
  failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
  return Promise.resolve();
});

const getUsers = async () => {
  const res = await axios.get('http://api.poc.test/users', {headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}})
  users.value = res.data
}
createAuthRefreshInterceptor(axios, refreshAuthLogic)

const eventSource = new EventSource('http://api.poc.test/zigbee2mqtt/zigbee')
eventSource.onmessage = ({ data }) => {
  message.value = data
  console.log('NEW Message', data)
}
// const client: mqtt.Client = mqtt.connect('mqtt://mqtt.poc.test:16384')
// client.subscribe('zigbee2mqtt/+')
// client.on('connect', (topic, message, packet) => {
//   console.log('Received Message: ' + message.toString() + '\nOn topic: ' + topic)
// })


</script>
<style>

</style>
