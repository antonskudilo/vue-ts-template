import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import useAuth from '@/composables/useAuth';
import { env } from '@/config/env';

const { authenticated } = useAuth();

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = authenticated.value;

  if (to.meta?.requiresAuth && !isAuthenticated) {
    // If the route requires authentication and the user is not authorized, redirect to the login page
    next({ name: 'login' });
  } else if (to.meta?.guest && isAuthenticated) {
    // If the route is intended for guests and the user is authorized, we redirect to the main page
    next({ name: 'home' });
  } else {
    const nearestWithTitle = to.matched
      .slice()
      .reverse()
      .find(r => r.meta && r.meta.title?.trim())

    const appName = env.VITE_APP_NAME || 'App';

    document.title = nearestWithTitle
      ? `${nearestWithTitle.meta.title} | ${appName}`
      : appName;

    next();
  }
});

export default router;
