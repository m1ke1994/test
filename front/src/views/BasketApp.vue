
<script>
import axios from "axios";

export default {
  props: {
     added: Array,
     fetchAdded: Function,
     totalSum: Number,
     goHome:Function,
     clearAdded:Function,
   },
  data() {
    return {
      firstName: '',
      lastName: '',
      middleName: '',
      telephone: '',
      email: '',
      adress:'',
      description:'',
      success:false,
      error:false,
      
    };
  },
  
  methods: {
   



 async createOrder(){
  try{
    await axios.post('/order',{
      firstName:this.firstName,
      lastName:this.lastName,
      middleName:this.middleName,
      telephone:this.telephone,
      email:this.email,
      description:this.description,
      adress:this.adress,
      price:this.totalSum,
      products:this.added
    });
       
      this.firstName='',
      this.lastName='',
      this.middleName='',
      this.telephone='',
      this.email='',
      this.description='',
      this.adress='',
      this.success=true,
      this.error=false
      this.clearAdded();
      // Перенаправление на главную страницу через 5 секунды
        setTimeout(() => {
          this.goHome();
        }, 5000);
  } catch (err) {
    this.success = false;
    this.error = true;
    }

},


},
}
</script>

<template>
  <div class="p-10  ">
    <div class="flex gap-2 items-center">
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
        <div class="flex gap-4 items-cente">
          <h2 class="text-3xl font-bold max-sm:text-lg" v-if="!success">Оформление заказа</h2>
          <router-link to="/privacy-policy" class="hover:underline me-4 md:me-6 w-8"><img src="/public/contract-file.png"></img></router-link>
          <h2 class="text-3xl font-bold max-sm:text-lg" v-if="success">Перейти на главную</h2>
        </div>
        
      </div>
      <div class="text-red-500 text-3xl max-sm:text-lg" v-if="error">Заполните все поля, попробуйте ещё раз</div>
      <div class="text-lime-600 text-4xl  text-center mt-10 max-sm:text-lg" v-if="success">Заказ успешно оформлен. Скоро с вами свяжется наш менеджер.</div>
<!-- создание инпуов -->
<div v-if="!success">
  <form @submit.prevent="createOrder">
<div class="flex justify-around max-md:flex-col gap-2">
  <div class="w-3/5 max-md:w-full text-sm">
              <div class="flex flex-col my-2 ">
                <label for="firstName">Введите Имя:</label>
                <input
                  v-model="firstName"
                  @input="allFields"
                  
                  id="firstName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="text"
                  maxlength="20"
                  placeholder="Имя"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="lastName">Введите Фамилию:</label>
                <input
                  v-model="lastName"
                  @input="allFields"
                  id="lastName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="text"
                  maxlength="15"
                  placeholder="Фамилия"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="middleName">Введите Отчество:</label>
                <input
                  v-model="middleName"
                  @input="allFields"
                  id="middleName"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="text"
                  maxlength="15"
                  placeholder="Отчество"
                />
              </div>
              <div class="flex flex-col my-2">
                <label for="phone">Введите Телефон:</label>
                <input
                  v-model="telephone"
                  @input="allFields"
                  id="phone"
                  class=" no-arrows border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="number"
                  maxlength="15"
                  placeholder="89059770507"
                />
              </div>
              
            </div>

            
  <div class="w-3/5 max-md:w-full text-sm">
    <div class="flex flex-col my-2 ">
                <label for="email">Email:</label>
                <input
                  v-model="email"
                  @input="allFields"
                  id="email"
                  class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                  type="email"
                  maxlength="30"
                  placeholder="Email"
                />
              </div>
              <div class="flex flex-col my-2">
                  <label for="area">Адрес:</label>
                  <input
                    v-model="adress"
                    id="adress"
                    class="border border-black w-full rounded-md py-2 pr-4 outline-none pl-2"
                    type="text"
                    maxlength="150"
                    placeholder="Московская"
                  />
                </div>
                
                <div class="flex flex-col max-md:w-auto">
  <label for="street"> Модель устройства и описание проблемы:</label>
  <textarea
    v-model="description"
    @input="allFields"
    id="description"
    class="border border-black rounded-md py-2 pr-4 outline-none pl-2 input_description h-28"
    maxlength="250"
    placeholder="Описание проблемы"
  ></textarea>
</div>
                
                
                <!-- создание кнопки -->
              <div class="flex items-center flex-wrap gap-4 mt-6">
               
                <div class="flex gap-4 items-center">
                  <span class="text-xl max-sm:text-lg">Итого:</span>
                  <b class="text-xl my-3 max-sm:text-lg">{{ totalSum }} руб</b>
                </div>



                <div class="flex  gap-4 ">
                  <button type="submit"
                  :disabled="totalSum===0"
                  class=" w-3/5 bg-lime-600 w-auto px-3 rounded-xl py-3 hover:bg-lime-900 transition text-white disabled:bg-slate-500 cursor-pointer "
                >
                  Перейти к оплате заказа
                </button>


                <button type="submit"
                  :disabled="totalSum>0"
                  class=" w-3/5 bg-lime-600 w-auto px-3 rounded-xl py-3 hover:bg-lime-900 transition text-white disabled:bg-slate-500 cursor-pointer "
                >
                  Создать заявку на диагностику
                </button>
                </div>
              </div>
              
          </div>

</div>
</form>
</div>



    
  






</div>

</template>

<style scoped> 
.p-10 {
  width: 80%;
}
/* Базовые стили */
.p-10 {
  padding: 10px; /* Устанавливаем отступы по 10px */
  width: 50%; /* Пример ширины для больших экранов */
  margin: 0 auto; /* Центрируем блок */
}

/* Медиа-запрос для экранов шириной до 640px */
@media (max-width: 2048px) {
  .p-10 {
    width: 100%; /* Делаем блок на всю ширину */
    padding: 0; /* Убираем отступы, если нужно */
  }
}

.no-arrows::-webkit-outer-spin-button,
.no-arrows::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-arrows {
-moz-appearance: textfield;
}

</style>
