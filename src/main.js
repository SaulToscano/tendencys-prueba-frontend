import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import { createRouter, createWebHistory } from 'vue-router';

//Import css
import './style.css';
import 'element-plus/dist/index.css';

//Routes
import Home from './views/Home.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
  ]
});

createApp(App).use(ElementPlus).use(router).mount('#app');
