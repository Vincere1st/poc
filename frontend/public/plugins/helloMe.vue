<template>
   <p>HelloMe</p>
   <button @click="clicked">Click me</button>
   {{ click }}
</template>
<script setup>
import { ref } from 'vue';

const click = ref(0)
const clicked = () => {
   click.value += 1
}

</script>