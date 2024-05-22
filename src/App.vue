<script setup >
import { RouterLink, RouterView,useRouter } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MainHeader from './components/MainHeader.vue'
import MainFooter from './components/MainFooter.vue'
import { useAuthStore } from '@/stores/authStore';
import {watch} from 'vue';

const router = useRouter();
const authStore = useAuthStore();
watch(() => authStore.isLoggedIn, (isLoggedIn) => {
  if (!isLoggedIn) {
    authStore.logout();
    //router.push('/login');
  }
});




const excludedPaths = ['/login','/signup'];
</script>

<template>
  <div class="flex flex-col h-screen justify-between">
    <MainHeader v-if=" !excludedPaths.includes($route.path)" :currentPage="$route.path" class="sticky top-0"/>
  

  <RouterView />
    
  <MainFooter class="sticky bottom-0"/>
</div>
</template>

