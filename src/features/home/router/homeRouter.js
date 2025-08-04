import { LAYOUT, ROUTE_NAMES } from '@utils/constants';
import HomePage from '../HomePage.vue';

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    component: HomePage,
    meta: {
      layout: LAYOUT.FULLSCREEN,
      title: `Home`,
    },
  },
];

export default routes;
