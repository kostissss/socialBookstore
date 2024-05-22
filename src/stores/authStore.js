import { defineStore } from 'pinia';
import apiService from '../services/apiService';
import { useRouter } from 'vue-router';





export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      // Call your login API
      const response = await  apiService.login(credentials);
      this.token = response.data.token;
      localStorage.setItem('token', this.token);
      this.user = response.data.user; // Optional, if your API returns user data
    },
    logout(router) {
      this.token = null;
      localStorage.removeItem('token');
      this.user = null;
      
    },
  },
});
