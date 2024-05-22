<script setup>
import { PlusIcon,BookOpenIcon } from '@heroicons/vue/20/solid'
import apiService from '@/services/apiService';

import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
const toast = useToast();
const router = useRouter();

const username = ref('')
const password = ref('')
const fullName = ref('')

async function signUp() {
    
      try {
        const response = await apiService.register({username: username.value, password:password.value,fullName:fullName.value});
        toast.success("Sign up successful");
        
        
        //router.push('/offers');
        
      } catch (error) {
        toast.error("Sign up failed");



        console.error(error);
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
  <h2 class="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign up</h2>
</div>
        <form class="space-y-6" @submit.prevent="signUp" >
          <div class="relative -space-y-px rounded-md shadow-sm">
            <div class="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" ></div>

            <div class="">
              <label for="fullName" class="sr-only">Full Name</label>
              <input id="fullName" name="fullName" v-model="fullName"  autocomplete="current-password" required="true" class="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" placeholder="Full Name" />
            </div>
            <div>
              <label for="username" class="sr-only">Username </label>
              <input id="username" v-model="username" name="username"  required="true" class="relative block w-full  border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"  placeholder="Username " />
            </div>
            <div>
              <label for="password" class="sr-only">Password</label>
              <input id="password" name="password" v-model="password" type="password" autocomplete="current-password" required="true" class="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" placeholder="Password" />
            </div>
          </div>
  
          
  
          <div>
            <button  class="flex w-full justify-center rounded-md bg-amber-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600" >Sign up</button>
          </div>
        </form>
  
        <p class="text-center text-sm leading-6 text-gray-500" >
          Already a user?
          {{ ' ' }}
          <a href="/login" class="font-semibold text-amber-600 hover:text-amber-500">Sign in </a>
        </p>
      </div>
    </div>
  </template>
  