<script>
export default {
  props:{
    favorites:Array,
    added:Array,
    openDrawerFunc:Function,
    totalSum:Number,
    favorites:Array,
    goFavorite:Function,
  },
}
</script>

<template>
    <header class="flex justify-between border-b border-slate-300 px-8 py-8 ">
        <div class="flex items-center gap-4 ">
          <router-link to="/" ><img src="/logo.png" alt="Logo" class="h-10"></router-link>
          <div>
            <h2 class="text-3xl font-bold max-sm:text-sm ">Smart <span>Nara</span></h2>
            <p class="text-xl max-sm:text-sm">Магазин ремонта техники</p>
        </div>
      </div>
      <ul class="flex gap-8 items-center">
        <li class="flex gap-2 ">
          <div class="flex gap-1">
            <img @click="openDrawerFunc"  src="/cart.svg" alt="Cart" class="w-5 cursor-pointer transition hover:scale-125 max-sm:w-7"><span class="text-xs text-lime-700 font-bold" v-if="added.length>0" >{{added.length}}</span>
          </div>
         
          <!-- <b class="text-center text-slate-600 hover:text-black text-xs :disabled" v-if="totalSum>0">{{ totalSum }} руб</b> -->
         

        </li>
        <li class="flex gap-2 max-sm:hidden">
          <div class="flex gap-1 ">
            <img @click="goFavorite" src="/heart.svg" alt="heart" class=" w-5 cursor-pointer transition hover:scale-125 " ><span class="text-xs text-red-500 font-bold" v-if="favorites.length>0" >{{favorites.length}}</span>
          </div>
          
          <b class="text-slate-600 hover:text-black "></b>
        </li>
       <!--  <li class="flex gap-2 ">
          <img src="/user.svg" alt="user" class="w-5 cursor-pointer transition hover:scale-125">
          <b class="text-slate-600 hover:text-black "></b>
        </li> -->
        </ul>
    </header>

</template>

<style scoped>
h2 span{
  color: darkgreen;
}
</style>