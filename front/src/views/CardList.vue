<script>
import CardApp from "../components/CardApp.vue"
export default{
    props:{
        smartfones:Array,
        fetchFavorites:Function,
        fetchAdded:Function,
    },
    components:{
        CardApp,
    },
}
</script>

<template>
    <CardApp :smartfones="smartfones" :fetchFavorites="fetchFavorites" :fetchAdded="fetchAdded"/>
</template>

<style scoped>
</style>