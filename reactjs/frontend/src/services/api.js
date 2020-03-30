import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3636'
});

export default api;