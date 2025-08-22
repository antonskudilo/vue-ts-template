import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import '@/styles/global.less'
import '@fontsource/roboto';
import useAuth from '@/composables/useAuth';
import { setUnauthorizedHandler } from '@api/axios';

const { resetUser, attempt } = useAuth();
const app = createApp(App);

setUnauthorizedHandler(() => {
  resetUser();
  void router.push({ name: 'login' });
});

attempt().then(() => {
  app.use(router);
  app.use(createPinia());
  app.mount('#app');
});
