<template>
  <ul v-if="dynamicComponent">
    <li v-for="component in dynamicComponent">
      <component :is="component"/>
    </li>
  </ul>
</template>
<script setup lang="ts">
export interface VueFrontPlugin {
  name: string
  content: string
}

import { loadModule, type Options } from "vue3-sfc-loader";
import { defineAsyncComponent, type ComponentOptions, ref, markRaw } from 'vue'
import * as Vue from 'vue'
import axios from "axios";

const dynamicComponent = ref<ComponentOptions<VueFrontPlugin>>([])
const components = ref(null)
const plugins = ref<VueFrontPlugin[]>([])


const options: Options = {
  moduleCache: { vue: Vue },
  getFile: async (name: string) => {
    for (const plugin of plugins.value) {
      if (plugin.name === name) {
        return plugin.content
      }
    }
  },
  addStyle: () => {
  },
}

const render = async () => {
  const res = await axios.get('http://api.poc.test/plugins/list', { params: { directory: 'plugins' } })
  plugins.value = res.data

  for (const plugin of plugins.value) {
    const component = defineAsyncComponent(async () => await loadModule(plugin.name, options))
    dynamicComponent.value.push(markRaw(component))
  }
}

render()

</script>
<style lang="scss">
</style>