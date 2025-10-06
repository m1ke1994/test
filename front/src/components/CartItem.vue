<script>
export default {
  props: {
    added: Array,
    fetchAdded: Function,
  },
  methods: {
    imageSrc(item) {
      return item.imageUrl || `/repair_photo/${item.image}`;
    },
  },
};
</script>

<template>
  <div
    class="justify-between items-center flex border border-slate-100 p-2 rounded-xl mt-4"
    v-for="item in added"
    :key="item._id"
  >
    <img :src="imageSrc(item)" alt="товар в корзине" class="w-16 h-16">
    <div class="flex flex-col justify-between w-2/3">
      <p class="text-sm">{{ item.title }} {{ item.model }}</p>
      <div class="flex justify-between mt-2">
        <b>{{ item.price }} ₽</b>
        <img
          class="opacity-60 hover:opacity-100 transition cursor-pointer"
          src="/public/close.svg"
          alt="Удалить из корзины"
          @click="fetchAdded(item._id)"
        >
      </div>
    </div>
  </div>
</template>

<style>
</style>
