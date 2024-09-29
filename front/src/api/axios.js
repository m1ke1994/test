const apiClient = axios.create({
    baseURL: 'http://94.241.141.209/api',
    headers: {
        'Content-Type': 'application/json',
    },
});