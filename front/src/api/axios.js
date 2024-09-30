
const apiClient = axios.create({
  baseURL:'http://94.241.141.209/api', // Замените на ваш API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;