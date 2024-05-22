<template >

<div class=" flex justify-center self-center text-lg mt-4 mb-4">AVAILABLE OFFERS {{ authStore.isLoggedIn }}</div>
    <ul role="list" class="divide-y divide-amber-100  bg-white shadow-sm ring-1 ring-amber-900/5 sm:rounded-xl ml-2 mr-2 overflow-scroll">
      <li v-for="offer in offers" :key="offer.id" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-amber-50 sm:px-6" @click="showDialog=true ,selectedoffer=offer">
       <Offer :offer="offer"  />
      </li>
    </ul>
    <OfferDialog :offer="selectedoffer" :open="showDialog"  ref="childRef" @response= "(msg) => showDialog = msg" />
    
  </template>
  
  <script setup>
  import { ChevronRightIcon } from '@heroicons/vue/20/solid'
  import Offer from '../components/Offer.vue';
  import OfferDialog from '../components/OfferDialog.vue';
  import {ref} from 'vue';
  import { useAuthStore } from '@/stores';
  import apiService from '@/services/apiService';
  import { onMounted } from 'vue';
  const authStore = useAuthStore();
  const showDialog = ref(false);

  const childRef = ref(null);
  const selectedoffer= ref(null);

  function openDialog() {
    if (childRef.value && childRef.value.childMethod) {
    childRef.value.openDialog();
  }
  }

  async function getOffers(){
    const response = await apiService.getOffers();
    offers.value = response.data;
    console.log(response);
  }
  onMounted(() => {
    getOffers();
  });
  
  const offers = ref([ ]);
  </script>