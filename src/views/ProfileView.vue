<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <form @submit.prevent="saveProfile" class=" mx-2 sm:mx-auto px-2 py-2 flex flex-col items-center text-center border-amber-800  border-4 shadow-2xl shadow-amber-800 rounded-2xl my-2 ">
      <div class="space-y-12">
        <div class="">
          <h2 class=" text-4xl  font-semibold leading-7 text-gray-900 pb-2" >Profile</h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
  
          <div class="mt-10  gap-x-6 gap-y-8 ">
            <div class="">
              <label for="username" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 ">
                  
                  <input v-model="username" type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                </div>
              </div>
            </div>
  
            
  
           
  
            
          </div>
        
  
        
          
            <div class="sm:col-span-6">
              <label for="fullName" class="block text-sm font-medium leading-6 text-gray-900">Full Name</label>
              <div class="mt-2">
                <input v-model="fullName" id="fullName" name="fullName" type="text"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
        </div>
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
              <div class="mt-2">
                <input v-model="phone" type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Age</label>
              <div class="mt-2">
                <input v-model="age" type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
            <!-- <div class="sm:col-span-6">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->
  
            
  
            <div class="col-span-full">
              <label for="street-address" class="block text-sm font-medium leading-6 text-gray-900">Street address</label>
              <div class="mt-2">
                <input v-model="address" type="text" name="street-address" id="street-address" autocomplete="street-address" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
           
          </div>
        </div>
  
       
      </div>
  
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="saveProfile()">Cancel</button>
        <button type="submit" class="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Save</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { PhotoIcon, UserCircleIcon } from '@heroicons/vue/24/solid'
  import apiService from '../services/apiService'
  import {onBeforeMount,onMounted} from 'vue'
  import { ref } from 'vue'

    const username = ref('')
    const age = ref('')
    const address = ref('')
    const phone = ref('')
    const fullName = ref('')
    const id = ref('')

  onMounted(async () => {
    try {
      const response = await apiService.getCurrentUserInfo()
      console.log(response)
      username.value = response.data.username
      age.value=response.data.age
        address.value=response.data.address
        phone.value=response.data.phoneNumber
        fullName.value=response.data.fullName
        id.value=response.data.id


    } catch (error) {
      console.error(error)
    }
  })

  async function cancel() {
    try {
      const response = await apiService.getCurrentUserInfo()
      console.log(response)
      username.value = response.data.username
      age.value=response.data.age
        address.value=response.data.address
        phone.value=response.data.phoneNumber
        fullName.value=response.data.fullName

    } catch (error) {
      console.error(error)
    }
  }

  async function saveProfile() {
    try {
      const response = await apiService.updateUserInfo({id:id.value,username: username.value, age:age.value, address:address.value, phoneNumber:phone.value, fullName:fullName.value})
      console.log(response)
      alert('Profile updated successfully')
    } catch (error) {
      console.error(error)
    }
  }

  
  </script>