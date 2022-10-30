import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomePage.vue'
import LoginView from '@/views/LoginPage.vue'
import NotFoundView from '@/views/NotFound.vue'
import VerifyView from '@/views/VerifyPage.vue'
import { useUserStore } from '@/stores/user'
import { useSnacksStore } from '@/stores/snacks'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomeView,
      meta: {
        requiresLogin: false,
        requiresVerification: false
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView,
      meta: {
        requiresLogin: false,
        requiresVerification: false
      },
      props: (route) => ({
        register: String(route.query.register) === '1',
        nextRoute: route.query.next
      })
    },
    {
      path: '/verify',
      name: 'VerifyPage',
      component: VerifyView,
      meta: {
        requiresLogin: true,
        requiresVerification: false
      },
      props: (route) => ({
        code: route.query.code,
        nextRoute: route.query.next
      }),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        requiresLogin: false,
        requiresVerification: false
      }
    }
  ],
})

router.beforeEach(to => {
  if (!to.meta.requiresLogin && to.meta.requiresVerification) throw new Error('Invalid route configuration - no login required but verification required');
  const snacksStore = useSnacksStore()
  const userStore = useUserStore()
  if (to.meta.requiresLogin && !userStore.isLoggedIn) {
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
  if (to.meta.requiresVerification && !userStore.isVerified) {
    snacksStore.addSnack({
      type: 'error',
      text: 'כדי לגשת לדף זה עליך לאמת את הדוא"ל שלך, אנא אמת את הדוא"ל',
      timeout: 2800,
      top: true,
    });
    return {
      name: 'VerifyPage',
      query: {
        next: to.fullPath
      }
    }
  }
  if (to.name === 'LoginPage' && userStore.isLoggedIn) {
    if (to.query.next) {
      return {
        path: to.query.next
      }
    } else {
      return {
        name: 'HomePage',
      }
    }
  }
  if (to.name === 'VerifyPage' && userStore.isVerified) {
    if (to.query.next) {
      return {
        path: to.query.next
      }
    } else {
      return {
        name: 'HomePage',
      }
    }
  }
})

export default router
