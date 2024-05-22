<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10 " @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden border-amber-800  border-4  shadow-amber-800 rounded-2xl my-2  bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <form @submit.prevent="createOffer" class=" mx-2 sm:mx-auto px-2 py-2 flex flex-col items-center text-center ">
      <div class="space-y-12">
        <div class="">
          <h2 class=" text-4xl  font-semibold leading-7 text-gray-900 " >Create Offer</h2>
          
  
          <div class="mt-10  gap-x-6 gap-y-8 ">
            <div class="">
              <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Book Title</label>
              <div class="mt-2">
                <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 ">
                  
                  <input v-model="title" type="text" name="title" id="title" autocomplete="title" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="janesmith" />
                </div>
              </div>
            </div>
  
            
  
           
  
            
          </div>
        
  
        
          
        </div>
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label for="author" class="block text-sm font-medium leading-6 text-gray-900">Author</label>
              <div class="mt-2">
                <input v-model="author" type="text" name="author" id="author"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
            <div class="sm:col-span-3">
              <label for="category" class="block text-sm font-medium leading-6 text-gray-900">Category</label>
              <div class="mt-2">
                <input v-model="category" type="text" name="category" id="category"  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
            <!-- <div class="sm:col-span-6">
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div class="mt-2">
                <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div> -->
  
            
  
            <div class="col-span-full">
              <label for="summary" class="block text-sm font-medium leading-6 text-gray-900">Summary</label>
              <div class="mt-2">
                <textarea  v-model="summary" type="text" name="summary" id="summary" autocomplete="summary" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6" />
              </div>
            </div>
  
           
          </div>
        </div>
  
       
      </div>
  
      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="close()">Cancel</button>
        <button type="submit" class="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">Publish</button>
      </div>
    </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
  import apiService from '@/services/apiService';
  import { useToast } from "vue-toastification";
const toast = useToast();
  const emit = defineEmits(['response'])

  const title = ref('')
  const summary = ref('')
  const author = ref('')
  const category = ref('')

  
  function close() {
    emit("response",false)
    
  }
  function openDialog() {
    open.value = true
  }

  async function createOffer(){
    try{
    const response = await apiService.createOffer({title:title.value,summary:summary.value,author:author.value,category:category.value});
    toast.success("Offer created successfully");
    close()
    }catch(error){
      toast.error("Offer creation failed" +error);

      console.log(error);
    }
    
  }

  const props = defineProps({
  
    open: {
        type: Boolean,
        required: false
    }
});

  
  
  </script>