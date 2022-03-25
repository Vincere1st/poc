<template>
  <div>
    <p>
      <router-link to="/homevue">Go to homeVue</router-link>
      <router-link to="/mqtt">Go to mqtt</router-link>
      <router-link to="/playvue">Go to playvue</router-link>
    </p>
    <router-view />
  </div>
</template>
<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>
