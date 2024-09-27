<script>
export default {
  props: {
     added: Array,
     fetchAdded: Function,
     totalSum: Number,
     goFavorite:Function,
     goHome:Function,
     favorites:Array,
     fetchFavorites:Function,
   }, 
   methods: {
   
   } ,
   }
</script>

<template>
    <div class="p-10">
      <div class="flex items-center gap-8">
        <div>
          <svg
            @click="goHome"
            class="opacity-50 cursor-pointer rotate-180 hover:opacity-100 transition hover:-translate-x-1"
            width="30"
            height="30"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H14.7143"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.71436 1L14.7144 7L8.71436 13"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <h2 class="text-3xl font-bold">Избранное</h2>
      </div>
      
      <div class="p-10  p-8 mt-4 rounded-xl">
        
  
        <div class="mt-2 grid grid-cols-2 gap-4 max-sm:grid-cols-1 gap-3">
          <div
            class="bg-zinc-50 border p-5 flex justify-between items-center rounded-xl mt-2 border border-lime-800"
            v-for="favorite in favorites"
            :key="favorite._id"
          >
            <img
              :src="`/repair_photo/${favorite.image}`"
              alt="photo"
              class="w-32 border border-black rounded-xl p-4 max-sm:hidden"
            />
            <div class="flex flex-col justify-between w-2/3">
              <p class="text-lg max-sm:text-sm">{{ favorite.title }} {{ favorite.model }}</p>
              <div class="flex justify-between mt-2">
                <b>{{ favorite.price }} руб</b>
                <img
                  class="opacity-60 hover:opacity-100 transition cursor-pointer w-8 max-sm:w-1/6"
                  src="/public/close.svg"
                  alt="close"
                  @click="fetchFavorites(favorite._id)"
                />
                
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
</template>

    <style scoped>

    </style>