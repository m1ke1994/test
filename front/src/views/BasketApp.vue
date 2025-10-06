<script>
import { submitOrder } from "../services/mockApi.js";

export default {
  props: {
    added: Array,
    fetchAdded: Function,
    totalSum: Number,
    goHome: Function,
    clearAdded: Function,
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      middleName: "",
      telephone: "",
      email: "",
      adress: "",
      description: "",
      success: false,
      error: false,
      orderNumber: null,
    };
  },
  computed: {
    hasItems() {
      return this.added.length > 0;
    },
  },
  methods: {
    async createOrder() {
      if (!this.hasItems) {
        this.error = true;
        return;
      }

      try {
        const order = await submitOrder({
          firstName: this.firstName,
          lastName: this.lastName,
          middleName: this.middleName,
          telephone: this.telephone,
          email: this.email,
          description: this.description,
          adress: this.adress,
          price: this.totalSum,
          products: this.added,
        });

        this.resetForm();
        this.orderNumber = order.orderNumber;
        this.success = true;
        this.error = false;
        this.clearAdded();

        setTimeout(() => {
          this.goHome();
        }, 5000);
      } catch (err) {
        console.error("Не удалось оформить заказ:", err);
        this.success = false;
        this.error = true;
        this.orderNumber = null;
      }
    },
    handleInput() {
      if (this.error) {
        this.error = false;
      }
    },
    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.middleName = "";
      this.telephone = "";
      this.email = "";
      this.description = "";
      this.adress = "";
    },
  },
};
</script>

<template>
  <div class="p-6 md:p-10">
    <div class="flex items-center gap-4">
      <button
        type="button"
        @click="goHome"
        class="opacity-50 hover:opacity-100 transition hover:-translate-x-1"
        aria-label="Вернуться в каталог"
      >
        <svg class="rotate-180" width="30" height="30" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 7H14.7143" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M8.71436 1L14.7144 7L8.71436 13" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>

      <div class="flex items-center gap-4">
        <h2 v-if="!success" class="text-3xl font-bold max-sm:text-lg">Оформление заказа</h2>
        <h2 v-else class="text-3xl font-bold max-sm:text-lg">Заказ оформлен</h2>
        <router-link to="/privacy-policy" class="hover:underline w-8">
          <img src="/public/contract-file.png" alt="Политика конфиденциальности" />
        </router-link>
      </div>
    </div>

    <p v-if="error" class="mt-6 text-center text-red-500 text-xl">
      Проверьте данные формы и попробуйте ещё раз.
    </p>

    <div v-if="success" class="mt-10 bg-lime-50 border border-lime-200 rounded-xl p-8 text-center text-lime-700">
      <p class="text-2xl font-semibold">Спасибо! Заказ №{{ orderNumber }} оформлен.</p>
      <p class="mt-4 text-lg">Мы свяжемся с вами в ближайшее время для подтверждения деталей.</p>
    </div>

    <div v-else class="mt-10">
      <form @submit.prevent="createOrder" class="space-y-8">
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <label class="flex flex-col gap-2 text-sm">
              <span>Имя</span>
              <input
                v-model="firstName"
                @input="handleInput"
                type="text"
                maxlength="20"
                placeholder="Иван"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm">
              <span>Фамилия</span>
              <input
                v-model="lastName"
                @input="handleInput"
                type="text"
                maxlength="20"
                placeholder="Петров"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm">
              <span>Отчество</span>
              <input
                v-model="middleName"
                @input="handleInput"
                type="text"
                maxlength="20"
                placeholder="Иванович"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm">
              <span>Телефон</span>
              <input
                v-model="telephone"
                @input="handleInput"
                type="tel"
                maxlength="15"
                placeholder="+7 999 000-00-00"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500"
              />
            </label>
          </div>

          <div class="space-y-4">
            <label class="flex flex-col gap-2 text-sm">
              <span>Email</span>
              <input
                v-model="email"
                @input="handleInput"
                type="email"
                maxlength="30"
                placeholder="email@example.com"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm">
              <span>Адрес доставки</span>
              <input
                v-model="adress"
                @input="handleInput"
                type="text"
                maxlength="150"
                placeholder="Город, улица, дом"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm">
              <span>Комментарий к заказу</span>
              <textarea
                v-model="description"
                @input="handleInput"
                maxlength="250"
                placeholder="Пожелания по доставке"
                class="border border-black/30 rounded-md py-2 px-3 outline-none focus:border-lime-500 h-28 resize-none"
              ></textarea>
            </label>
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="text-xl">
            <span class="text-gray-500">Итого:</span>
            <b class="ml-2">{{ totalSum }} ₽</b>
          </div>

          <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            <button
              type="submit"
              :disabled="totalSum === 0"
              class="w-full md:w-auto bg-lime-600 px-5 py-3 rounded-xl text-white font-semibold hover:bg-lime-700 transition disabled:bg-slate-400 disabled:cursor-not-allowed"
            >
              Оформить заказ
            </button>
            <button
              type="button"
              @click="goHome"
              class="w-full md:w-auto border border-lime-600 px-5 py-3 rounded-xl text-lime-700 font-semibold hover:bg-lime-50 transition"
            >
              Продолжить покупки
            </button>
          </div>
        </div>
      </form>

      <div class="mt-10 space-y-4">
        <h3 class="text-2xl font-semibold">Товары в корзине</h3>
        <div v-if="hasItems" class="space-y-4">
          <div
            v-for="item in added"
            :key="item._id"
            class="flex items-center justify-between border border-gray-200 rounded-xl p-4"
          >
            <div class="flex items-center gap-4">
              <img :src="item.imageUrl || `/repair_photo/${item.image}`" alt="товар" class="w-16 h-16 rounded-md object-cover" />
              <div>
                <p class="font-medium">{{ item.title }} {{ item.model }}</p>
                <p class="text-sm text-gray-500">{{ item.price }} ₽</p>
              </div>
            </div>
            <button
              type="button"
              class="text-red-500 hover:text-red-600 transition"
              @click="fetchAdded(item._id)"
            >
              Удалить
            </button>
          </div>
        </div>
        <p v-else class="text-gray-500">Корзина пуста.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>


