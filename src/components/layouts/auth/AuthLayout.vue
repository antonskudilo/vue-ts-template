<template>
  <main class='auth-page'>
    <router-view/>
  </main>
</template>

<script setup lang='ts'>
defineOptions({
  name: 'AuthLayout'
})
</script>

<style>
@import "@/styles/layouts/auth/auth.less";
</style>