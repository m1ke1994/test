<script>
export default {
  props:{
    smartfones:Array,
    fetchFavorites: Function,
    fetchAdded:Function,
  },

  data(){
    return{

    }
  },
 
};

</script>

<template>
  <div class="grid gap-5 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3   ">
    <div class="my-4 relative bg-white border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition" v-for="(smartfone) in smartfones" :key="smartfone._id">
          
          <img @click="fetchFavorites(smartfone._id)"  :src="!smartfone.isFavorite ? '/unliked.svg' : '/heart_active.png'"  alt="Like 1" class="absolute top-8 left-8 hover:scale-125 w-6" >
          <img :src="`/repair_photo/${smartfone.image}`" alt="photo" class="mx-auto w-52 ">
          <p class="mt-2 text-center font-semibold h-14 text-lg
          ">{{smartfone.title}} на {{smartfone.model}}</p>
          <div class="flex justify-between mt-5">
            <div class="flex flex-col">
              <span class="text-slate-400 text-left">Цена:</span>
              <b class="text-left">{{ smartfone.price }} руб</b>
            </div>
            <img @click="fetchAdded(smartfone._id)" :src="!smartfone.isAdded ? '/plus.svg' : '/cheked.svg'" alt="plus" class="hover:scale-125">
          </div>
        </div>
  </div>
    
 
</template>

<style>
</style>