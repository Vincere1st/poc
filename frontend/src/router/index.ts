import HomeVue from '@/views/Home.vue'
import PlayVue from '@/components/play.vue'
import {createRouter, createWebHistory} from 'vue-router'
import MqttPlugin from '../views/MqttPlugin.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:  [
        {
          path: '/homevue',
          name: 'Home',
          component: HomeVue
        },
        {
            path: "/mqtt",
            name: "Mqtt",
            component: MqttPlugin
        },
        {
            path: "/playvue",
            name: "Play",
            component: PlayVue
        }
    ],
})

export default router
