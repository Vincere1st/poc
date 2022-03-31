import HomeVue from '@/views/Home.vue'
import playVue from '@/components/play.vue'
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
            component: playVue
        }
    ],
})

export default router
