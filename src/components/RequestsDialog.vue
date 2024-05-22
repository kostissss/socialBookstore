<template>
    <TransitionRoot as="template" :show="open">
      <Dialog class="relative z-10 " @close="open = false">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
  
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative  transform  border-amber-800  border-4 mt-4 mb-4  shadow-amber-800 rounded-2xl   bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                
                <div class=" flex justify-center self-center text-lg mt-4 mb-4">REQUESTS</div>

                <div v-if="offers.length==0" class="text-center  my-4 "> There are no requests for this Book!</div>
    <ul role="list" class="divide-y divide-amber-100  bg-white shadow-sm ring-1 ring-amber-900/5 sm:rounded-xl ml-2 mr-2">
      <li v-for="offer in offers" :key="offer.id" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-amber-50 sm:px-6"v-bind:class="{ 'bg-green-200 rounded-xl hover:bg-green-200 ': offer.status=='approved' }"  @click="showDialog=true ,selectedoffer=offer">
       <Request :request="offer"  />
      </li>
    </ul>
    
    <RequestPreviewDialog :request="selectedoffer" :open="showDialog"  ref="childRef" @response= "(msg) => showDialog = msg" />
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-col ">
          
                 <button type="button" class="mt-3 inline-flex w-full flex-auto justify-center align-middle rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto " @click="close()" ref="cancelButtonRef">Cancel</button>
                 
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
  import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

  import { ChevronRightIcon ,UserIcon} from '@heroicons/vue/20/solid'
  import Offer from '../components/Offer.vue';
  import OfferDialog from '../components/OfferDialog.vue';
  import RequestPreviewDialog from '../components/RequestPreviewDialog.vue';
  import Request from '../components/Request.vue';

  import { useAuthStore } from '@/stores';
  import apiService from '@/services/apiService';
  import { onMounted } from 'vue';
  const authStore = useAuthStore();
  const showDialog = ref(false);

  const childRef = ref(null);
  const selectedoffer= ref(null);

 

  

  async function getOffers(){
    const response = await apiService.getRequestsByOfferId(props.offer.id);
    offers.value = response.data;
    console.log(response);
  }
  onMounted(() => {
    getOffers();
  });
  
  const offers = ref([ ]);
  const emit = defineEmits(['response'])

  
  function close() {
    emit("response",false)
    
  }
  function openDialog() {
    open.value = true
  }

  async function requestBook(){
    try {
      const response = await apiService.requestBook({offerId: props.offer.id});
      console.log(response);
      alert("Book Requested Successfully");
      emit("response",false)
    } catch (error) {
      console.error(error);
    }
  }

  const props = defineProps({
  offer: {
    type: null,
    required: false
  },
    open: {
        type: Boolean,
        required: true,
        default: false
    }
});

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    getOffers(); 
  }
});

  
  
  </script>