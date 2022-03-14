<template>
  <div>
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const message = inject('plugin')

</script>
