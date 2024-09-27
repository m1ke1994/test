<script>
export default {
  props:{
    products:Array,
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
  <div class="grid grid-cols-4 gap-5">
    <div class="my-4 relative bg-white border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition" v-for="(product) in products" :key="product._id">
          
          <img @click="fetchFavorites(product._id)"  :src="!product.isFavorite ? '/unliked.svg' : '/liked.svg'"  alt="Like 1" class="absolute top-8 left-8" >
          <img :src="`/repair_photo/${product.image}`" alt="photo" class="mx-auto w-52">
          <p class="mt-2 text-center font-semibold text-lg">{{product.title}} на {{product.model}}</p>
          <div class="flex justify-between mt-5">
            <div class="flex flex-col">
              <span class="text-slate-400 text-left">Цена:</span>
              <b class="text-left">{{ product.price }} руб</b>
            </div>
            <img @click="fetchAdded(product._id)" :src="!product.isAdded ? '/plus.svg' : '/cheked.svg'" alt="plus">
          </div>
          <div>
            
          </div>
        </div>
  </div>
    
 
</template>

<style>
</style>