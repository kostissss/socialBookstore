<template>


    <div class="flex min-w-0 gap-x-4" >
      <UserIcon class="h-12 w-12 flex-none rounded-full bg-amber-50 text-amber-800" aria-hidden="true" />
              <div class="min-w-0 flex-auto">
                <p class="text-sm font-semibold leading-6 text-amber-900">
                  <a :href="request.href">
                    <span class="absolute inset-x-0 -top-px bottom-0" />
                    {{ request.title }}
                  </a>
                </p>
                <p class="mt-1 flex text-xs leading-5 text-amber-500">
                  <a :href="`mailto:${request.email}`" class="relative truncate hover:underline">{{ request.user.username }}</a>
                </p>
              </div>
            </div>
            <div class="flex shrink-0 items-center gap-x-4">
              <div class="hidden sm:flex sm:flex-col sm:items-end">
                <p class="text-sm leading-6 text-amber-900">{{ request.author }}</p>
                <p v-if="request.lastSeen" class="mt-1 text-xs leading-5 text-amber-500">
                  Last seen <time :datetime="request.lastSeenDateTime">{{ request.lastSeen }}</time>
                </p>
                <div v-else class="mt-1 flex items-center gap-x-1.5">
                 
                    
                  
                  <div class="flex flex-col">
                    <p class="text-xs leading-5 text-amber-500">Status: {{ request.status }}</p>
                  <p class="text-xs leading-5 text-amber-500">Created at: {{request.requestDate|| " -"}}</p>
                </div>
                </div>
              </div>
              <ChevronRightIcon class="h-5 w-5 flex-none text-amber-400" aria-hidden="true" />
              
            </div>
    
            
            
    
    </template>
    
    <script  setup>
     import { ChevronRightIcon,BookOpenIcon,BookmarkSlashIcon,UserIcon } from '@heroicons/vue/20/solid'
    
     
     
    
     
     const props = defineProps({
      request: {
        type: null,
        required: false
      }
    });
    
    
    </script>