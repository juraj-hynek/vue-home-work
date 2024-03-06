import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import AppRouteIndexPage from '../views/AppRouteIndexPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/',
    component: AppRouteIndexPage,
    children: [
      {
        path: '',
        redirect: '/home',
      },
      {
        path: '/detail',
        component: ()=> import('../views/PageDetail.vue')
      },
      {
        path: 'home',
        // component: () => import('../views/PageHome.vue'),
        component: () => import('../views/PageUserDashboard.vue'),
      },
      {
        path: 'radio',
        component: () => import('../views/PageRadio.vue'),
      },
      {
        path: 'library',
        component: () => import('../views/PageLibrary.vue'),
      },
      {
        path: 'search',
        component: () => import('../views/PageRadio.vue'),
      },
    ],
  },
];

const router = createRouter({
  // Use: createWebHistory(process.env.BASE_URL) in your app
  history: createWebHistory(),
  routes,
});

export default router;