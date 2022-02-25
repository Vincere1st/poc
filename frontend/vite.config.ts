import {fileURLToPath, URL} from "url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
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
