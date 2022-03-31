<template>
    <Repl :store="store" :clear-console="false" />
</template>

<script setup lang="ts">
import { onMounted, watchEffect, ref, markRaw, watch } from 'vue'
import { Repl, ReplStore, type File } from '@vue/repl'
import '@vue/repl/style.css'
import type { VueFrontPlugin } from '@/vueFactory/PluginRender.vue';
import axios from "axios";

const pluginsFile = ref<File[]>([])
const plugins = ref<Record<string, string>[]>([])
onMounted(() => loadplugins())


const loadplugins = (async () => {
    const res = await axios.get('https://api.poc.test/plugins/list', { params: { directory: 'plugins' } })
    for (const plugin of res.data) {
        const newFile: File = {
            filename: plugin.name,
            code: plugin.content,
            hidden: false,
            compiled: {
                js: plugin.content,
                ssr: plugin.content,
                css: plugin.content
            }
        }
        pluginsFile.value.push(newFile)
        plugins.value.push(plugin)
    }
})

const store = new ReplStore({
    showOutput: false
})


watch(pluginsFile.value, (newValue) => {
    for (const pluginFile of newValue) {
        store.addFile(pluginFile)
        }
})


watchEffect(() => history.replaceState({}, '', store.serialize()))
</script>