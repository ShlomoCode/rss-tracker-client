import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomePage.vue'
import LoginView from '@/views/LoginPage.vue'
import NotFoundView from '@/views/NotFound.vue'
import { useUserStore } from '@/stores/user'
import { useSnacksStore } from '@/stores/snacks'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomeView
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView,
      props: (route) => ({ 
        register: String(route.query.register) === '1',
        nextRoute: route.query.next
       })
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView
    }
  ],
})

router.beforeEach(to => {
    const snacksStore = useSnacksStore()
    const userStore = useUserStore()
    if (!userStore.isLoggedIn && to.meta.requiresAuth) {
      snacksStore.addSnack({
        type: 'error',
        text: 'כדי לגשת לדף זה עליך להיות מחובר לחשבון, אנא התחבר',
        timeout: 2800,
        top: true,
      });
      return { 
        name: 'LoginPage',
        query: { 
          next: to.fullPath
        }
      }
    }
}) 

export default router
