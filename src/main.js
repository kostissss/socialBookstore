//import './assets/main.css'
import './styles.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { useAuthStore } from '@/stores/authStore';
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";



const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
const options = {
  // You can set your default options here
};

app.use(Toast, options);
const authStore = useAuthStore();
router.beforeEach((to, from, next) => {
    if (to.path != '/login'&& to.path!='/signup' && !authStore.isLoggedIn) next({ name: 'login' })
    else next()
  })


app.mount('#app')
