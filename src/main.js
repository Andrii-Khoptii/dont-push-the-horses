import { vTooltip } from 'floating-vue';
import { createApp } from 'vue';

import router from '@/router/router';
import store from '@/shared/store/store';
import App from './App.vue';

import '@shared/assets/styles/main.css';
import 'floating-vue/dist/style.css';

const app = createApp(App);

app.use(router);
app.use(store);
app.directive('tooltip', vTooltip);

app.mount('#app');
