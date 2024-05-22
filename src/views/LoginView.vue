<script setup>
import { PlusIcon,BookOpenIcon } from '@heroicons/vue/20/solid'
import apiService from '@/services/apiService';
import { useAuthStore } from '@/stores/authStore';

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const username = ref('')
const password = ref('')



async function logIn() {
    
      try {
        const response =await authStore.login({username: username.value, password:password.value});
        toast.success("Login successful");
        
        
        router.push('/offers');
        
      } catch (error) {

        console.error(error);
        toast.error("Login failed");
      }
    

    

    
};



</script>
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
    <div class="flex  flex-1 items-center overflow-hidden  justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div class="w-full max-w-sm space-y-10">
        <div class="flex flex-col items-center ">
  <BookOpenIcon class="h-10 w-10 mb-2 text-amber-800" aria-hidden="true" />
  
  <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
</div>
        <form class="space-y-6" @submit.prevent="logIn" >
          <div class="relative -space-y-px rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" ></div>
            <div>
              <label for="username" class="sr-only">Username </label>
              <input id="username" v-model="username" name="username"  required="true" class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"  placeholder="Username " />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" v-model="password" type="password" autocomplete="current-password" required="true" class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" placeholder="Password" />
            </div>
          </div>
  
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-amber-800 focus:ring-amber-600" />
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
            </div>
  
            <div class="text-sm leading-6">
              <a href="#" class="font-semibold text-amber-600 hover:text-amber-500">Forgot password? </a>
            </div>
          </div>
  
          <div>
            <button  class="flex w-full justify-center rounded-md bg-amber-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" >Sign in</button>
          </div>
        </form>
  
        <p class="text-center text-sm leading-6 text-gray-500" >
          Not a member?
          {{ ' ' }}
          <a href="/signup" class="font-semibold text-amber-600 hover:text-amber-500">Sign up for free</a>
        </p>
      </div>
    </div>
  </template>
  