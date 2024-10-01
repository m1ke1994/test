
const apiClient = axios.create({
  baseURL:'http://147.45.143.61:3005', // Замените на ваш API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;