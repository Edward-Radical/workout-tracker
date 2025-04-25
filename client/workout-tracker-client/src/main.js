
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';

// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/main.scss';

createApp(App).use(router).mount('#app')
