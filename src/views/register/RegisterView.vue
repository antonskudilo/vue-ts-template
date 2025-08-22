<template>
  <div class='app-card app-card--auth'>
    <div class='app-card__header'>
      Sign up
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
            autocomplete='new-password'
            required
          >
        </div>

        <div class='app-card__form-group'>
          <label for='password_confirmation'>Confirm password</label>
          <input
            id='password_confirmation'
            v-model='form.password_confirmation'
            type='password'
            autocomplete='new-password'
            required
          >
        </div>

        <button type='submit' class='button'>Register</button>
        <div v-show='error.message' class='text-error'>{{ error.message }}</div>
      </form>
    </div>

    <div class='app-card__footer'>
      Already have an account?
      <router-link :to="{ name: 'login' }" class='link'>Sign in</router-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
import useAuth from '@/composables/useAuth.js';
import { reactive } from 'vue';

defineOptions({
  name: 'RegisterView'
})

const { register } = useAuth();

const form = reactive({
  email: '',
  password: '',
  password_confirmation: ''
});

const error = reactive({
  message: ''
});

const submit = async (form) => {
  error.message = '';

  try {
    await register(form);
  } catch (e) {
    error.message = e;
  }
};
</script>

<style scoped>

</style>
