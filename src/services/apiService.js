import apiClient from './apiClient';

export default {
  async getMessage() {
    return apiClient.get('/path/to/endpoint');
  },
  async login(credentials) {
    const response=await apiClient.post('/users/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response
  },
  async register(userData) {
    return apiClient.post('/users/register', userData);
  },

  async getCurrentUserInfo() {
    return apiClient.get('/users/profile');
  },
  async updateUserInfo(userData) {
    return await apiClient.post('/users/profile', userData);
  },


  async getOffers() {
    return apiClient.get('/bookoffers/');
  },
  async getMyOffers() {
    return apiClient.get('/bookoffers/usersOffers');
  },

  async createOffer(offerData) {
    console.log(offerData);
    return apiClient.post('/bookoffers/create', offerData);

  },


  async requestBook(offerId) {
    return apiClient.post('/bookRequests/create', offerId);
  },

  async approveRequest(requestId) {
    return apiClient.post(`/bookRequests/approve/${requestId}`);
  },


  async getRequestsByOfferId(offerId) {
    return apiClient.get(`/bookRequests/offer/${offerId}`);
  }
  // Add more methods as needed
};