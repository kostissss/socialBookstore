<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10" @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden border-amber-800  border-4  shadow-amber-800 rounded-2xl my-2  bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="sm:flex sm:flex-col">
                  
                  <div class="mt-3 mb-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    
                    <DialogTitle as="h3" class="text-base text-center font-semibold leading-6 text-gray-900">{{request.title}}</DialogTitle>

                    
                    <div class="mt-2">
                      
                      <p>{{ request.summary }}</p>
                    </div>
                    <UserCircleIcon class="h-10 w-10 text-center bg-amber-800 rounded-full m-2 mx-auto" />
                    <h1 class="text-center border-b-2 text-2xl font-semibold text-c">User Info</h1>
                    <p class="text-center">username: {{ request.user.username }}</p>
                    <p class="text-center">Full Name: {{ request.user.fullName }} </p>
                    <p class="text-center">Address: {{ request.user.address }} </p>
                    <p class="text-center">Phone Number: {{ request.user.phoneNumber }} </p>
                    
                    <hr class="border-t mt-3 border-gray-300" />
                  </div>
                </div>
                <div class="mt-5 sm:mt-4 sm:flex  ">
                 
                  <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm float-start ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="close()" ref="cancelButtonRef">Cancel</button>
                  <button type="button"  class="inline-flex w-full  rounded-md bg-amber-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 sm:ml-auto sm:w-auto" @click="approveRequest()">Select user</button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </template>
  
  <script setup>
  import { ref,watch } from 'vue'
  import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
  import { ExclamationTriangleIcon,UserCircleIcon } from '@heroicons/vue/24/outline'
  import apiService from '@/services/apiService';
  import { useToast } from "vue-toastification";
const toast = useToast();
  const emit = defineEmits(['response'])

 

  
  function close() {
    emit("response",false)
    
  }
  function openDialog() {
    open.value = true
  }

  async function approveRequest(){
    try {
      const response = await apiService.approveRequest(props.request.id);
      console.log(response);
      toast.success("Request approved successfully");
      emit("response",false)
    } catch (error) {
      toast.error("Request approval failed");
      console.error(error);
    }
  }

  const props = defineProps({
  request: {
    type: null,
    required: false
  },
    open: {
        type: Boolean,
        required: false
    }
});

  
  
  </script>