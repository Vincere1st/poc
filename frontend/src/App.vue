<template>
  <div>
      <div>
    <p>
      <router-link to="/">Go to home</router-link>
      <router-link to="/homevue">Go to homeVue</router-link>
      <router-link to="/mqtt">Go to mqtt</router-link>
    </p>
    <router-view />
  </div>
    <!-- <HomeVue /> -->
    <router-view/>
  </div>
</template>
<script setup lang="ts">
import HomeVue from './views/Home.vue'
import { RouterView, RouterLink } from 'vue-router';
</script>
