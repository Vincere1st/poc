import path from 'path'

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            '@': `${path.resolve(__dirname, 'src')}`,
            'vue3-sfc-loader': 'vue3-sfc-loader/dist/vue3-sfc-loader.esm.js',
            mqtt: 'mqtt/dist/mqtt.js'
            // issue https://github.com/mqttjs/MQTT.js/issues/1269#issuecomment-984864265
        },
    },
    server: {
        port: 8080,
        hmr: {
            port: 443
        }
    }
});
