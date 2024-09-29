import { createRouter, createWebHistory } from 'vue-router'
import CardList from './views/CardList.vue'
import BasketApp from './views/BasketApp.vue'
import FavoriteApp from './views/FavoriteApp.vue'
import PolicyApp from './views/PolicyApp.vue'



export default createRouter({
    // История переходов сохраняется
    history: createWebHistory(),


    // Роуты и компоненты
    routes: [
        {
            path: '/',
            name:'home',
            component:CardList,

        },
        { 
            path: '/basket',
            name:'basket',
            component:BasketApp,

         },
         
         { 
            path: '/favorite',
            name:'favorite',
            component:FavoriteApp,

         },
         {
            path: '/privacy-policy',
            name: 'PrivacyPolicy',
            component: PolicyApp
          }
      
    ]
})