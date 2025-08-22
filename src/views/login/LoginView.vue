<template>
  <div class='app-card app-card--auth'>
    <div class='app-card__header'>
      Sign in
    </div>

    <div class='app-card__body'>
      <form class='app-card__form' @submit.prevent='submit(form)'>
        <div class='app-card__form-group'>
          <label for='email'>Email</label>
          <input
            id='email'
            v-model='form.email'
            type='email'
            autocomplete="email"
            required
          >
        </div>

        <div class='app-card__form-group'>
          <label for='password'>Password</label>
          <input
            id='password'
            v-model='form.password'
            type='password'
            autocomplete="current-password"
            required
          >
        </div>

        <button type='submit' class='button'>Login</button>
        <div v-show='error.message' class='text-error'>{{ error.message }}</div>
      </form>
    </div>

    <div class="app-card__footer">
      Don't have an account yet?
      <router-link :to="{ name: 'register' }" class='link'>Sign up</router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
import useAuth from '@/composables/useAuth.js';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

defineOptions({
  name: 'LoginView'
})

const router = useRouter();
const { login } = useAuth();

const form = reactive({
  email: '',
  password: ''
});

const error = reactive({
  message: ''
});

const submit = async (credentials) => {
  error.message = '';

  try {
    await login(credentials);
  } catch (e) {
    error.message = e;

    return;
  }

  void router.push({ name: 'home' });
};
</script>

<style scoped>

</style>
