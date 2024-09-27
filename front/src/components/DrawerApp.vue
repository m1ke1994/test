<script>
import DriwerHead from './DriwerHead.vue'
import CartItem from './CartItem.vue'
export default {
    props:{
        closeDrawerFunc:Function,
        added:Array,
        totalSum:Number,
        fetchAdded:Function,
        
    },
    components:{
        DriwerHead,
        CartItem,
    },
      data(){
        return{

        }
      },
      methods:{
        goBasket(){
            this.$router.push({name:'basket'});
            this.closeDrawerFunc();
        }
      },
      
}
</script>
 

<template>
    <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
        <div class="bg-white w-96 h-full fixed right-0 z-20 top-0 p-8 overflow-y-auto">
            <DriwerHead :closeDrawerFunc="closeDrawerFunc" />
            <div class="flex flex-col gap-1 flex-1">
                <CartItem :added="added" :fetchAdded="fetchAdded" />
                
                
            </div>
            
           
        <div class="flex flex-col gap-4 my-8">
            <div class="flex gap-2">
            <span>Итого:</span>
            <div class="flex-1 border-b border-dashed"></div>
            <b class="text-xl">{{ totalSum }} руб</b>
        </div>
        </div>
        <button :disabled="totalSum === 0" @click="goBasket"
        class="bg-lime-600 w-full rounded-xl py-3 hover:bg-lime-900 transition text-white disabled:bg-slate-500 cursor-pointer">Оформить заявку</button>
    </div>
</template>


<style scoped>
</style>