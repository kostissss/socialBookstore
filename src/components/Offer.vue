<template>


  <div class="flex min-w-0 gap-x-4">
    <BookOpenIcon class="h-12 w-12 flex-none rounded-full bg-amber-50 text-amber-800" aria-hidden="true" />
    <div class="min-w-0 flex-auto">
      <p class="text-sm font-semibold leading-6 text-amber-900">
        <a :href="offer.href">
          <span class="absolute inset-x-0 -top-px bottom-0" />
          {{ offer.title }}
        </a>
      </p>
      <p class="mt-1 flex text-xs leading-5 text-amber-500">
        <a :href="`mailto:${offer.email}`" class="relative truncate hover:underline">{{ offer.email }}</a>
      </p>
    </div>
  </div>
  <div class="flex shrink-0 items-center gap-x-4">
    <div class="hidden sm:flex sm:flex-col sm:items-end">
      <p class="text-sm leading-6 text-amber-900">{{ offer.author }}</p>
      <p v-if="offer.lastSeen" class="mt-1 text-xs leading-5 text-amber-500">
        Last seen <time :datetime="offer.lastSeenDateTime">{{ offer.lastSeen }}</time>
      </p>
      <div v-else class="mt-1 flex items-center gap-x-1.5">
        <div class="flex-none rounded-full bg-amber-800 p-1">

        </div>
        <p class="text-xs leading-5 text-amber-500">{{ offer.category }}</p>
      </div>
    </div>
    <ChevronRightIcon class="h-5 w-5 flex-none text-amber-400" aria-hidden="true" />

  </div>




</template>

<script setup>
import { ChevronRightIcon, BookOpenIcon, BookmarkSlashIcon } from '@heroicons/vue/20/solid'





const props = defineProps({
  offer: {
    type: null,
    required: false
  }
});


</script>