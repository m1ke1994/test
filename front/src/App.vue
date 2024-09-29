<script>
import { RouterView } from "vue-router";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";
import HeaderApp from "./components/HeaderApp.vue";
import CardApp from "./components/CardApp.vue";
import DrawerApp from "./components/DrawerApp.vue";
import FuterApp from "./components/FuterApp.vue";
import PolicyApp from "./views/PolicyApp.vue";

export default {
  components: {
    RouterView,
    HeaderApp,
    CardApp,
    DrawerApp,
    FuterApp,
    PolicyApp,
  },
  data() {
    return {
      smartfones: [],
      category: "",
      model: "",
      favorites: [],
      added: [],
      openDrawer: false,
      totalSum: 0,
    };
  },
  methods: {
    goBasket(){
            this.$router.push({name:'basket'});
            
        },

    goHome() {
       this.$router.push('/');
     },
     goFavorite() {
       this.$router.push('/favorite');
     },
    






    async loadSmartfones() {
      let response = await axios.get(`/all`, {
        params: {
          category: this.category,
          model: this.model,
        },
      });
      this.smartfones = response.data.map((smartfone) => ({
        ...smartfone,
        isFavorite: false,
        isAdded: false,
      }));
      this.syncSmartfonesWithAdded();
      this.syncSmartfonesWithFavorites();
    },
    
    fetchFavorites(id) {
      for (let i = 0; i < this.smartfones.length; i++) {
        if (this.smartfones[i]._id === id) {
          this.smartfones[i].isFavorite = !this.smartfones[i].isFavorite;
          if (this.smartfones[i].isFavorite == true) {
            this.favorites.push(this.smartfones[i]);
          } else {
            this.favorites = this.favorites.filter(item => item._id !== id);
          }
          break;
        }
      }
      this.saveFavoritesToLocalStorage();
    },
    fetchAdded(id) {
      for (let i = 0; i < this.smartfones.length; i++) {
        if (this.smartfones[i]._id === id) {
          this.smartfones[i].isAdded = !this.smartfones[i].isAdded;
          if (this.smartfones[i].isAdded == true) {
            this.added.push(this.smartfones[i]);
            this.totalSum += this.smartfones[i].price;
          } else {
            const index = this.added.findIndex(smartfone => smartfone._id === id);
            if (index !== -1) {
              this.totalSum -= this.added[index].price;
              this.added.splice(index, 1);
            }
          }
          break;
        }
      }
      this.saveAddedToLocalStorage();
    },
    saveAddedToLocalStorage() {
      localStorage.setItem('added', JSON.stringify(this.added));
      localStorage.setItem('totalSum', JSON.stringify(this.totalSum));
    },
    saveFavoritesToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    },
    loadAddedFromLocalStorage() {
      const added = localStorage.getItem('added');
      const totalSum = localStorage.getItem('totalSum');
      if (added && totalSum) {
        this.added = JSON.parse(added);
        this.totalSum = JSON.parse(totalSum);
        this.syncSmartfonesWithAdded();
      }
    },
    loadFavoritesFromLocalStorage() {
      const favorites = localStorage.getItem('favorites');
      if (favorites) {
        this.favorites = JSON.parse(favorites);
        this.syncSmartfonesWithFavorites();
      }
    },
    syncSmartfonesWithAdded() {
      this.added.forEach(item => {
        const smartfone = this.smartfones.find(s => s._id === item._id);
        if (smartfone) {
          smartfone.isAdded = true;
        }
      });
    },
    syncSmartfonesWithFavorites() {
      this.favorites.forEach(item => {
        const smartfone = this.smartfones.find(s => s._id === item._id);
        if (smartfone) {
          smartfone.isFavorite = true;
        }
      });
    },
    openDrawerFunc() {
      this.openDrawer = !this.openDrawer;
    },
    closeDrawerFunc() {
      this.openDrawer = !this.openDrawer;
    },

    clearAdded() {
      for (let i = 0; i < this.added.length; i++){
        this.added[i].isAdded=false;
      }
      this.totalSum=0
      this.added = [];
      this.saveAddedToLocalStorage();
    },
  },


 





  mounted() {
    this.loadSmartfones();
    this.loadAddedFromLocalStorage();
    this.loadFavoritesFromLocalStorage();
  },

 













  computed: {
    isBasketPage() {
      return this.$route.path === '/basket';
    },
    isFavoritePage() {
      return this.$route.path === '/favorite';
    },
  },
  
};
</script>





<template>
  <DrawerApp v-if="this.openDrawer" :closeDrawerFunc="closeDrawerFunc" :added="added" :fetchAdded="fetchAdded" :totalSum="totalSum"   />
  <div class="w-11/12 m-auto bg-white rounded-xl shadow-xl mt-10  md:w-5/6 lg:w-11/12">
    <HeaderApp :favorites="favorites" :added="added" :openDrawerFunc="openDrawerFunc" :totalSum="totalSum" :goFavorite="goFavorite" />
   <div class="p-10" >
     
    <div class="flex flex-col  items-center" v-if="!isBasketPage && !isFavoritePage"  >
      <div><h2 class="text-3xl font-bold  ">Все услуги</h2></div> 
      <div class="flex justify-center gap-4 flex-wrap py-4">
        <div class="items-center ">
      <select class=" py-2 px-3 border rounded-md outline-none" v-model="category">
        <option class="sm:text-xs" value="">Выбирете из списка</option>
        <option class="sm:text-xs" value="Samsung">Samsung</option>
        <option class="sm:text-xs" value="Iphone">Apple</option>
        <option class="sm:text-xs" value="Xiaomi">Xiaomi</option>
        <option class="sm:text-xs" value="POCO">POCO</option>
        <option class="sm:text-xs" value="Honor">Honor</option>
        <option class="sm:text-xs" value="Tecno">Tecno</option>
        <option class="sm:text-xs" value="Huawei">Huawei</option>
        <option class="sm:text-xs" value="Realme">Realme</option>
      </select>
    </div>
    <div class="relative">
          <img class="absolute left-5 top-3 " src="/search.svg" alt="search">
          <input class=" border rounded-md py-2 pl-10 pr-4 outline-none focus:border-gray-400 pl-12 " type="text" placeholder="Введите модель..."  v-model="model">
      </div>
      <div>
        <button  @click="loadSmartfones" class="bg-lime-600 border px-8 py-2 rounded-md hover:bg-lime-700 transition text-white">Найти</button>
        
      </div>
      </div>
   
     
    </div>
    
    
    <router-view :clearAdded="clearAdded" :goFavorite="goFavorite" :goHome="goHome" :smartfones="smartfones" :fetchFavorites="fetchFavorites" :fetchAdded="fetchAdded"  :closeDrawerFunc="closeDrawerFunc" :added="added"  :totalSum="totalSum" :openDrawer="openDrawer" :favorites="favorites" />
    
  </div>
  
  <div class="text-center p-10 mb-10" v-if="$route.path === '/'">
  <button @click="goBasket" class="bg-lime-600 border px-8 py-2 rounded-md hover:bg-lime-700 transition text-white text-lg">Другой аппарат</button>
</div>
  </div>
 <FuterApp></FuterApp>
</template>

<style scoped>

</style>