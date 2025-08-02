import { createApp } from 'vue';
import router from '@/router/router';
import store from '@/shared/store/store';

import App from './App.vue';
import '@shared/assets/tailwind.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.mount('#app');
