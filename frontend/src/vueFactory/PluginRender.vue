<template>
  <component :is="dynamicComponent"/>
</template>
<script setup lang="ts">
import { loadModule, Options } from "vue3-sfc-loader";
import {defineAsyncComponent, computed, ref, onMounted, ComponentOptions} from 'vue'
import * as Vue from 'vue'
import axios from "axios";
const dynamicComponent = ref<ComponentOptions<any> | null>(null)

onMounted(() => render())

const render = async () => {
  const component: ComponentOptions<any> = await loadModule('http://api.poc.test/plugins/list', options)
  dynamicComponent.value = component
}

const options: Options= {
  moduleCache: {
    vue: Vue
  },
  getFile: async (url) => {
    if (typeof url === 'string') {
      const res = await axios.get(url)

      return {
        getContentData: () => res.data[0]
      }
    }
  },
  addStyle(textContent: string, scopeId?: string) {
    textContent = '\n' + textContent.trim()
    const style = Object.assign(document.createElement('style'), {textContent})
    style.type = 'text/css'
    style.dataset.componentRender = 'true'
    if (scopeId) {
      style.dataset.componentRenderScope = scopeId
    }

    const existingStyles = document.getElementsByTagName('style')

    let toRemove = []
    for (let i = 0; i < existingStyles.length; i++) {
      const existingStyle = existingStyles.item(i)
      if (existingStyle && existingStyle.dataset.componentRender) {
        toRemove.push(existingStyle)
      }
    }
    for (const existingStyle of toRemove) {
      document.head.removeChild(existingStyle)
    }
    document.head.insertBefore(style, existingStyles[-1] || null)
  },
  log: (type: 'log' | 'error', ...data: unknown[]) => {
    console.log({type, data})
  }
}

</script>
<style lang="scss">
</style>