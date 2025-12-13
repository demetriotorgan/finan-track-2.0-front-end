import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-finan-track2-0.vercel.app',
});

export default api;