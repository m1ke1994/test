
const apiClient = axios.create({
  baseURL:'http://smart-nara.ru/api', // Замените на ваш API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;