<script>
export default {
    props:{
        added:Array,
        fetchAdded:Function,
    }
}
</script>

<template>
    
<div class="justify-between items-center flex border border-slate-100 p-2 rounded-xl  mt-4" v-for="add in added" :key="add._id">
    <img :src="`/repair_photo/${add.image}`" alt="photo" class="w-16 h-16">
    <div class="flex flex-col justify-between w-2/3">
        <p class="text-sm">{{add.title}} {{add.model}}</p>
        <div class="flex justify-between mt-2">
            <b>{{add.price}} руб</b>
            <img class="opacity-60 hover:opacity-100 transition cursor-pointer" src="/public/close.svg" alt="close" @click="fetchAdded(add._id)" >
        </div>
    </div>
</div>
</template>



<style>
</style>