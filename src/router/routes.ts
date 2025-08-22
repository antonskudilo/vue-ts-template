import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/auth',
    component: () => import('@components/layouts/auth/AuthLayout.vue'),
    meta: { guest: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@views/login/LoginView.vue'),
        meta: {
          title: 'Login',
        },
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@views/register/RegisterView.vue'),
        meta: {
          title: 'Register',
        },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@components/layouts/main/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@views/home/HomeView.vue'),
        meta: {
          title: 'Home',
        },
      },
    ],
  },
];