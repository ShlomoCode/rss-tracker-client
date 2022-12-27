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
import UnreadView from '@/views/UnreadPage.vue'
import TagsView from '@/views/TagsPage.vue'
import SettingsView from '@/views/SettingsPage.vue'

import { useUserStore } from '@/stores/user'
import { useSnacksStore } from '@/stores/snacks'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0, behavior: 'smooth' }),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomeView,
      meta: {
        viewName: 'דף הבית',
        requiresLogin: false,
        requiresVerification: false,
      }
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginView,
      meta: {
        viewName: 'כניסה למערכת',
        requiresLogin: false,
        requiresVerification: false,
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
        viewName: 'איפוס סיסמה',
        requiresLogin: false,
        requiresVerification: false,
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
        viewName: 'אימות חשבון',
        requiresLogin: true,
        requiresVerification: false,
      },
      props: (route) => ({
        code: route.query.code,
        nextRoute: route.query.next
      }),
    },
    {
      path: '/settings',
      name: 'SettingsPage',
      component: SettingsView,
      meta: {
        viewName: 'הגדרות',
        requiresLogin: true,
        requiresVerification: true,
      },
    },
    {
      path: '/subscriptions',
      name: 'SubscriptionsPage',
      component: SubscriptionsView,
      meta: {
        viewName: 'ניהול המנויים',
        requiresLogin: true,
        requiresVerification: true,
      }
    },
    {
      path: '/unread',
      name: 'UnreadPage',
      component: UnreadView,
      meta: {
        viewName: 'לא נקראו',
        requiresLogin: true,
        requiresVerification: true,
      }
    },
    {
      path: '/articles/:articleId',
      name: 'ArticlePage',
      component: ArticleView,
      props: (route) => ({
        articleId: route.params.articleId,
      }),
      meta: {
        viewName: 'מאמר',
        requiresLogin: true,
        requiresVerification: true
      }
    },
    {
      path: '/feeds/:feedId',
      name: 'FeedPage',
      component: FeedView,
      props: (route) => ({
        feedId: route.params.feedId
      }),
      meta: {
        viewName: 'פיד',
        requiresLogin: true,
        requiresVerification: true
      }
    },
    {
      path: '/tags',
      name: 'TagsPage',
      component: TagsView,
      meta: {
        viewName: 'תגיות',
        requiresLogin: true,
        requiresVerification: true
      }
    },
    {
      path: '/tags/:tagName',
      name: 'TagPage',
      component: TagView,
      props: (route) => ({
        tagName: route.params.tagName,
      }),
      meta: {
        viewName: 'תגית',
        dynamicViewName: true,
        requiresLogin: true,
        requiresVerification: true,
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFoundView,
      meta: {
        viewName: 'הדף לא נמצא',
        requiresLogin: false,
        requiresVerification: false,
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
      timeout: 2800
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
      timeout: 2800
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

router.afterEach(to => {
  document.title = to.meta.viewName ? `Rss Tracker - ${to.meta.viewName}` : 'Rss Tracker';
});

export default router
