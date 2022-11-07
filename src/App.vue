<script>
import NavBar from './components/NavBar.vue'
import { RouterView } from 'vue-router';

export default {
  components: {
    NavBar,
    RouterView
  }
}
</script>

<template>
  <NavBar />
  <RouterView class="w-full max-w-screen-lg m-auto flex flex-col" />
</template>

<style scoped>

</style>
