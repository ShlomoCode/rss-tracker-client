import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomePage.vue'
import LoginView from '@/views/LoginPage.vue'
import NotFoundView from '@/views/NotFound.vue'
import VerifyView from '@/views/VerifyPage.vue'
import SubscriptionsView from '@/views/SubscriptionsPage.vue'
import ArticleView from '@/views/ArticlePage.vue'
import FeedView from '@/views/FeedPage.vue'
import TagView from '@/views/TagPage.vue'
import ForgotPasswordView from '@/views/ForgotPasswordPage.vue'

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
        requiresVerification: false,
        viewName: 'דף הבית',
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView,
      meta: {
        requiresLogin: false,
        requiresVerification: false,
        viewName: 'כניסה למערכת',
      },
      props: (route) => ({
        register: String(route.query.register) === '1',
        nextRoute: route.query.next
      })
    },
    {
      path: '/reset-password',
      name: 'ForgotPasswordPage',
      component: ForgotPasswordView,
      meta: {
        requiresLogin: false,
        requiresVerification: false,
        viewName: 'איפוס סיסמה',
      },
      props: (route) => ({
        token: route.query.code,
        email: route.query.email
      })
    },
    {
      path: '/verify',
      name: 'VerifyPage',
      component: VerifyView,
      meta: {
        requiresLogin: true,
        requiresVerification: false,
        viewName: 'אימות חשבון',
      },
      props: (route) => ({
        code: route.query.code,
        nextRoute: route.query.next
      }),
    },
    {
      path: '/subscriptions',
      name: 'SubscriptionsPage',
      component: SubscriptionsView,
      meta: {
        requiresLogin: true,
        requiresVerification: true,
        viewName: 'ניהול המנויים',
      }
    },
    {
      path: '',
      children: [
        {
          path: 'articles/:articleId',
          name: 'ArticlePage',
          component: ArticleView,
          props: (route) => ({
            articleId: route.params.articleId,
          }),
          meta: {
            viewName: 'מאמר'
          }
        },
        {
          path: 'feeds/:feedId',
          name: 'FeedPage',
          component: FeedView,
          props: (route) => ({
            feedId: route.params.feedId
          }),
          meta: {
            viewName: 'פיד'
          }
        },
        {
          path: 'tags/:tagName',
          name: 'TagPage',
          component: TagView,
          props: (route) => ({
            tagName: route.params.tagName,
          }),
          meta: {
            viewName: 'תגית'
          }
        }
      ],
      meta: {
        requiresLogin: true,
        requiresVerification: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        requiresLogin: false,
        requiresVerification: false,
        viewName: 'הדף לא נמצא',
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
  } else if (to.meta.requiresVerification && !userStore.isVerified) {
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
  } else if (to.name === 'LoginPage' && userStore.isLoggedIn) {
    if (to.query.next) {
      return {
        path: to.query.next
      }
    } else {
      return {
        name: 'HomePage',
      }
    }
  } else if (to.name === 'VerifyPage' && userStore.isVerified) {
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
