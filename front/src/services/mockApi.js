import { SMARTFONES } from '../mocks/smartfones.js';

const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

const withImageUrl = (item) => ({
  ...item,
  imageUrl: item.image.startsWith('http')
    ? item.image
    : `/repair_photo/${item.image}`,
});

export async function fetchSmartfones({ category = '', model = '' } = {}) {
  await delay();

  const normalizedCategory = category.trim().toLowerCase();
  const normalizedModel = model.trim().toLowerCase();

  return SMARTFONES
    .filter((item) => {
      const matchCategory =
        !normalizedCategory || item.category.toLowerCase() === normalizedCategory;
      const matchModel =
        !normalizedModel ||
        `${item.title} ${item.model}`.toLowerCase().includes(normalizedModel);
      return matchCategory && matchModel;
    })
    .map((item) => ({
      ...withImageUrl(item),
      isFavorite: false,
      isAdded: false,
    }));
}

export async function submitOrder(payload) {
  await delay(400);

  const orderNumber = Math.floor(100000 + Math.random() * 900000);
  const createdAt = new Date().toISOString();
  const order = {
    ...payload,
    orderNumber,
    createdAt,
  };

  if (typeof window !== 'undefined' && window?.localStorage) {
    const raw = window.localStorage.getItem('orders');
    const orders = raw ? JSON.parse(raw) : [];
    orders.push({
      orderNumber,
      createdAt,
      total: payload.price,
      products: payload.products.map((product) => product._id),
    });
    window.localStorage.setItem('orders', JSON.stringify(orders));
  }

  return order;
}

