import {createRouter, createWebHistory} from 'vue-router'
import MqttPlugin from '../views/MqttPlugin.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:  [
        {
            path: "/mqtt",
            name: "Mqtt",
            component: MqttPlugin
        }
    ],
})

export default router
