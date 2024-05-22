// src/services/apiService.js
import { useRouter } from 'vue-router';
import {useAuthStore} from '@/stores/authStore';

import axios from 'axios';
//const router = useRouter();
// Create an axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
    // Add other headers here if needed
  },
});

const excludePaths = ['/users/login', '/users/register'];

// Add a request interceptor
apiClient.interceptors.request.use(
  config => {
    if (!excludePaths.includes(config.url)) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      const authStore = useAuthStore();
      authStore.logout();
      
    }
    return Promise.reject(error);
  }
);

// Example API call
export default apiClient;
